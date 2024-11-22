import React, { useState, useEffect } from 'react';
import { Row, Col, message, notification } from 'antd';
import VMList from '../components/VMList';
import VMCreate from '../components/VMCreate';
import VMDelete from '../components/VMDelete';
import api from '../services/api';

const VirtualMachines = () => {
    const [vms, setVMs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVMs = async () => {
        try {
            setLoading(true);
            const data = await api.getVMs();
            setVMs(data);
        } catch (error) {
            message.error('Erreur lors de la récupération des VMs.');
        } finally {
            setLoading(false);
        }
    };

    
    const handleAction = async (name, action) => {
        try {
            if (action === 'start') {
                await api.startVM(name);
                notification.success({
                    message: 'Succès',
                    description: `La VM "${name}" a été démarrée avec succès.`,
                });
            } else if (action === 'stop') {
                await api.stopVM(name);
                notification.success({
                    message: 'Succès',
                    description: `La VM "${name}" a été arrêtée avec succès.`,
                });
            }
            fetchVMs();
        } catch (error) {
            notification.error({
                message: 'Erreur',
                description: `Impossible de ${action === 'start' ? 'démarrer' : 'arrêter'} la VM "${name}".`,
            });
        }
    };


    useEffect(() => {
        fetchVMs();
    }, []);

    return (
        <div>
            <h2>Gestion des Machines Virtuelles</h2>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <VMList vms={vms} loading={loading} handleAction={handleAction} />
                </Col>
                <Col span={6}>
                    <VMCreate onVMCreated={fetchVMs} />
                </Col>
                <Col span={6}>
                    <VMDelete onVMDeleted={fetchVMs} />
                </Col>
            </Row>
        </div>
    );
};

export default VirtualMachines;