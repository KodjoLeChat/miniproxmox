// src/components/VMCreate.js
import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert } from 'antd';
import api from '../services/api';

const VMCreate = ({ onVMCreated }) => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const onFinish = async (values) => {
        try {
            const response = await api.createVM(values);
            setMessage(response.message);
            setError('');
            form.resetFields();
            if (onVMCreated) {
                onVMCreated();
            }
        } catch (error) {
            setMessage('');
            setError('Erreur lors de la création de la VM');
            console.error(error);
        }
    };

    return (
        <Card title="Créer une VM">
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="name" label="Nom de la VM" rules={[{ required: true }]}>
                    <Input placeholder="Veuillez donner un nom qui n'existe pas encore" />
                </Form.Item>
                <Form.Item name="memory" label="Mémoire (Mo)" rules={[{ required: true }]}>
                    <Input type="number" placeholder="Ex: 1024" />
                </Form.Item>
                <Form.Item name="vcpu" label="vCPUs" rules={[{ required: true }]}>
                    <Input type="number" placeholder="Ex: 2" />
                </Form.Item>
                <Form.Item name="disk_path" label="Chemin de l'image ISO" rules={[{ required: true }]}>
                    <Input placeholder="/chemin/vers/image.iso" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Créer VM
                </Button>

                {/* Messages de retour */}
                {message && <Alert message={message} type="success" style={{ marginTop: '16px' }} />}
                {error && <Alert message={error} type="error" style={{ marginTop: '16px' }} />}
            </Form>
        </Card>
    );
};

export default VMCreate;
