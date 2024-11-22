import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    DesktopOutlined,
    HomeOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => (
    <Sider collapsible>
        <div className="logo" style={{ padding: '16px', color: 'white' }}>
            Mini Proxmox
        </div>
        <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link to="/virtual-machines">Virtual Machines</Link>
            </Menu.Item>
        </Menu>
    </Sider>
);

export default Sidebar;
