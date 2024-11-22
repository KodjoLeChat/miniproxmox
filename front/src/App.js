import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import VirtualMachines from './pages/VirtualMachines';

const { Content } = Layout;

function App() {
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Content style={{ padding: '24px', background: '#f0f2f5' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/virtual-machines" element={<VirtualMachines />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;
