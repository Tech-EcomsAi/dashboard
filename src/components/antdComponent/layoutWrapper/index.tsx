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
import { getSidebarState } from '@reduxSlices/clientThemeConfig';
import HeaderComponent from '@organisms/headerComponent';
import Navbar from 'src/components/navbar';

const { Content } = Layout;

export default function AntdLayoutWrapper(props: any) {
    const [cache] = React.useState(() => createCache());
    const isCollapsed = useAppSelector(getSidebarState)

    useServerInsertedHTML(() => (
        <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}></style>
    ));

    return (
        <Layout className={`${styles.layoutWrapper}`}>
            <StyleProvider cache={cache}>
                <HeadMetaTags title={undefined} description={undefined} image={undefined} siteName={undefined} storeData={undefined} />
                <AntdThemeProvider>
                    <Fragment>
                        <Toast />
                        <Layout style={{ paddingLeft: isCollapsed ? "62px" : "200px" }}>
                            <HeaderComponent />
                            <SidebarComponent />
                            <Content className={styles.mainContentWraper}>
                                {props.children}
                            </Content>
                        </Layout>
                    </Fragment>
                </AntdThemeProvider>
            </StyleProvider>
        </Layout>
    )
}