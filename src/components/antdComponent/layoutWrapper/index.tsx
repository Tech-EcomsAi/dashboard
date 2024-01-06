'use client'
import { StyleProvider, createCache } from '@ant-design/cssinjs';
import { useAppSelector } from '@hook/useAppSelector';
import HeadMetaTags from '@organisms/headMetaTags';
import HeaderComponent from '@organisms/headerComponent';
import SidebarComponent from '@organisms/sidebar';
import Toast from '@organisms/toast';
import AntdThemeProvider from '@providers/antdThemeProvider';
import { getAppSettingsPanelStatus, getDarkModeState, getRTLDirectionState, getSidebarState } from '@reduxSlices/clientThemeConfig';
import { Layout, theme } from 'antd';
import React, { Fragment } from 'react';
import styles from './layoutWrapper.module.scss';
// import AppSettingsPanel from '@organisms/sidebar/appSettingsPanel';
import type Entity from '@ant-design/cssinjs/es/Cache';
import NoSSRProvider from '@providers/noSSRProvider';


import Loader from '@organisms/loader';
import dynamic from 'next/dynamic';
const { Content } = Layout;

const AppSettingsPanel = dynamic(() => import('@organisms/sidebar/appSettingsPanel'), { ssr: false });

export default function AntdLayoutWrapper(props: any) {
    const cache = React.useMemo<Entity>(() => createCache(), []);
    const isCollapsed = useAppSelector(getSidebarState);
    const isDarkMode = useAppSelector(getDarkModeState);
    const isRTLDirection = useAppSelector(getRTLDirectionState)
    const openSettingPanel = useAppSelector(getAppSettingsPanelStatus)
    const { token } = theme.useToken();
    return (
        <NoSSRProvider>
            <AntdThemeProvider>
                <Layout className={`${styles.layoutWrapper}`} dir={isRTLDirection ? "rtl" : "ltr"} >
                    <StyleProvider cache={cache}>
                        <HeadMetaTags title={undefined} description={undefined} image={undefined} siteName={undefined} storeData={undefined} />
                        <Fragment>
                            <Toast />
                            <Loader />
                            <Layout style={{ paddingLeft: isCollapsed ? "62px" : "200px" }}>
                                <HeaderComponent />
                                <SidebarComponent />
                                <AppSettingsPanel />
                                <Content className={styles.mainContentWraper} style={{ background: isDarkMode ? token.colorFillContent : token.colorBgLayout }}>
                                    {props.children}
                                </Content>
                            </Layout>
                        </Fragment>
                    </StyleProvider>
                </Layout>
            </AntdThemeProvider>
        </NoSSRProvider>
    )
}