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

const { Content } = Layout;

export default function AntdLayoutWrapper(props: any) {
    const [cache] = React.useState(() => createCache());
    const [isCollapsed, setIsCollapsed] = useState(false)
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

                        {/* not used */}
                        {/* <AlertNotification /> */}
                        {/* not used */}
                        <SidebarComponent isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                        <Layout style={{ paddingLeft: isCollapsed ? "66px" : "200px" }}>
                            {/* {toggleHeader && <HeaderComponent />} */}
                            <Content>
                                {props.children}
                            </Content>
                            {/* <FooterComponent /> */}
                            {/* <div className={styles.contentContainer}>
                          </div> */}
                        </Layout>
                    </Fragment>
                </AntdThemeProvider>
            </StyleProvider>;
        </Layout>
    )
}

// function AntdLayoutWrapper(props: any) {
//     return (
//         <Layout className={`${styles.layoutWrapper}`}>
//             <HeadMetaTags title={undefined} description={undefined} image={undefined} siteName={undefined} storeData={undefined} />
//             <AntdThemeProvider>
//                 <Fragment>
//                     <Toast />

//                     {/* not used */}
//                     {/* <AlertNotification /> */}
//                     {/* not used */}
//                     <SidebarComponent />
//                     <Layout>
//                         {/* {toggleHeader && <HeaderComponent />} */}
//                         <Content>
//                             {props.children}
//                         </Content>
//                         {/* <FooterComponent /> */}
//                         {/* <div className={styles.contentContainer}>
//                           </div> */}
//                     </Layout>
//                 </Fragment>
//             </AntdThemeProvider>
//         </Layout>
//     )
// }

// export default AntdLayoutWrapper