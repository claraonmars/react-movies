import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom'

const { Header } = Layout;

const NavBar = (): JSX.Element => {
  const match = useRouteMatch({
    path: "/",
    strict: true,
    sensitive: true
  });

  return (
    <Header style={{background: 'rgba(0,0,0,0)'}}>
      <Menu mode="horizontal" selectedKeys={match?.isExact ? ["1"]: []}>
        <Menu.Item key="1">
          <Link to="/">Main
          </Link></Menu.Item>
      </Menu>
    </Header>
  );
}

export default NavBar;
