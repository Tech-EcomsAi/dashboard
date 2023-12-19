'use client'
import React, { Fragment, useState } from 'react'
import { Layout, theme } from 'antd';
import AntdThemeProvider from '@providers/antdThemeProvider';
import AlertNotification from '@organisms/alert';
import Toast from '@organisms/toast';
import HeadMetaTags from '@organisms/headMetaTags';
import SidebarComponent from '@organisms/sidebar';
import styles from './layoutWrapper.module.scss'
import { useServerInsertedHTML } from 'next/navigation';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useAppSelector } from '@hook/useAppSelector';
import { getDarkModeState, getRTLDirectionState, getSidebarState } from '@reduxSlices/clientThemeConfig';
import HeaderComponent from '@organisms/headerComponent';
import AppSettingsPanel from '@organisms/sidebar/appSettingsPanel';
import NoSSRProvider from '@providers/noSSRProvider';
import type Entity from '@ant-design/cssinjs/es/Cache';

const { Content } = Layout;

export default function AntdLayoutWrapper(props: any) {
    const cache = React.useMemo<Entity>(() => createCache(), []);
    const isCollapsed = useAppSelector(getSidebarState);
    const isDarkMode = useAppSelector(getDarkModeState);
    const isRTLDirection = useAppSelector(getRTLDirectionState)
    const { token } = theme.useToken();
    return (
        <NoSSRProvider>
            <Layout className={`${styles.layoutWrapper}`} dir={isRTLDirection ? "rtl" : "ltr"} >
                <StyleProvider cache={cache}>
                    <HeadMetaTags title={undefined} description={undefined} image={undefined} siteName={undefined} storeData={undefined} />
                    <AntdThemeProvider>
                        <Fragment>
                            <Toast />
                            <Layout style={{ paddingLeft: isCollapsed ? "62px" : "200px" }}>
                                <HeaderComponent />
                                <SidebarComponent />
                                <AppSettingsPanel />
                                <Content className={styles.mainContentWraper} style={{ background: isDarkMode ? token.colorFillContent : token.colorBgLayout }}>
                                    {props.children}
                                </Content>
                            </Layout>
                        </Fragment>
                    </AntdThemeProvider>
                </StyleProvider>
            </Layout>
        </NoSSRProvider>
    )
}