import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const NavBar = () => {
  return (
    <Header style={{background: 'rgba(0,0,0,0)'}}>
      <Menu mode="horizontal">
        <Menu.Item key="1">Main</Menu.Item>
      </Menu>
    </Header>
  );
}

export default NavBar;
