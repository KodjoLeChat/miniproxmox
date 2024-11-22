// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const errorApiPrint = (error) => {
    console.error('Erreur API:', error);
}

const api = {
    getVMs: async () => {
        try {
            const response = await axios.get(`${API_URL}/vms/`);
            console.log('proxmox response list vm');
            console.log(response);
            return response.data.vms || [];
        } catch (error) {
            errorApiPrint(error);
            return [];
        }
    },
    createVM: async (vmData) => {
        try {
            const response = await axios.post(`${API_URL}/vms/`, vmData);
            return response.data;
        } catch (error) {
            errorApiPrint(error);
            throw error;
        }
    },
    deleteVM: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/vms/${id}`);
            return response.data;
        } catch (error) {
            errorApiPrint(error);
            throw error;
        }
    },

    startVM: async (name) => {
        try {
            const response = await axios.post(`${API_URL}/vms/${name}/start`);
            return response.data;
        } catch (error) {
            errorApiPrint(error);
            throw error;
        }
    },
    stopVM: async (name) => {
        try {
            const response = await axios.post(`${API_URL}/vms/${name}/stop`);
            return response.data;
        } catch (error) {
            errorApiPrint(error);
            throw error;
        }
    }
};

export default api;
