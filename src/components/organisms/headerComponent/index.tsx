import React from 'react'
import { Layout, theme } from 'antd';
const { Header, Content } = Layout;


function HeaderComponent() {

    const { token } = theme.useToken();

    return (
        <Header style={{ padding: 0, background: token.colorBgContainer }} >

        </Header>
    )
}

export default HeaderComponent