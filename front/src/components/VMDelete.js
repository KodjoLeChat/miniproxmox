import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert } from 'antd';
import api from '../services/api';

const VMDelete = ({ onVMDeleted }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const onFinish = async (values) => {
        try {
            const response = await api.deleteVM(values.name);
            setMessage(response.message);
            setError('');
            if (onVMDeleted) {
                onVMDeleted();
            }
        } catch (err) {
            setMessage('');
            setError('Erreur lors de la suppression de la VM');
            console.error(err);
        }
    };

    return (
        <Card title="Supprimer une VM">
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="name" label="Nom de la VM" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Supprimer VM
                </Button>

                {/* Messages de retour */}
                {message && <Alert message={message} type="success" style={{ marginTop: '16px' }} />}
                {error && <Alert message={error} type="error" style={{ marginTop: '16px' }} />}
            </Form>
        </Card>
    );
};

export default VMDelete;
