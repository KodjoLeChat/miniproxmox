import React from 'react';
import { List, Card, Empty, Spin, Button } from 'antd';

const VMList = ({ vms, loading, handleAction }) => {
    return (
        <Card title="Liste des VMs">
            {loading ? (
                <Spin tip="Chargement..." />
            ) : vms.length === 0 ? (
                <Empty description="Aucune VM disponible" />
            ) : (
                <List
                    dataSource={vms}
                    renderItem={(vm) => (
                        <List.Item>
                            <Card className="vm-card">
                                <p><strong>Nom :</strong> {vm.Nom}</p>
                                <p><strong>ID :</strong> {vm.ID}</p>
                                <p><strong>État :</strong> {vm.État === 1 ? 'En cours d\'exécution' : 'Éteinte'}</p>
                                <Button
                                    type="primary"
                                    danger={vm.État === 1}
                                    onClick={() => handleAction(vm.Nom, vm.État === 1 ? 'stop' : 'start')}
                                >
                                    {vm.État === 1 ? 'Arrêter' : 'Démarrer'}
                                </Button>
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </Card>
    );
};

export default VMList;
