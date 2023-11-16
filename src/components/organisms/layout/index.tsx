
import { Fragment, ReactNode, useEffect, useState } from "react";
import styles from "@organismsCSS/layout/layout.module.scss";
import Router from "next/navigation";
import { useAppSelector } from "src/hooks/useAppSelector";
import { useSelector } from 'react-redux';
import { useAppDispatch } from "src/hooks/useAppDispatch";
import HeadMetaTags from "src/components/organisms/headMetaTags";
import SidebarComponent from "src/components/organisms/sidebar";
import { Layout, theme } from 'antd';
const { Content } = Layout;

import HeaderComponent from "src/components/organisms/headerComponent";
import { getAuthUserState, setAuthUser } from "src/redux/slices/auth";
import ErrorBoundary from "@organisms/errorBoundary";
import { getUserByToken } from "src/apiService/user";
import ThemeProvider from "src/themeProvider";
import { getDarkModeState } from "@reduxSlices/clientThemeConfig";

type LayoutProps = {
  children: ReactNode;
};

export default function LayoutComponent({ children }: LayoutProps) {

  const userDetails = useAppSelector(getAuthUserState);
  const dispatch = useAppDispatch();
  const [toggleHeader, setToggleHeader] = useState(false);
  const isDarkMode = useAppSelector(getDarkModeState);
  const { token } = theme.useToken();

  Router.events.on('routeChangeComplete', (route) => {
    if (route.indexOf('builder') != -1) {
      setToggleHeader(false);
    }
  });

  useEffect(() => {
    if (!userDetails) {
      getUserByToken().then((user) => {
        dispatch(setAuthUser(user));
      }).catch(() => {
        Router.push("/403");
      })
    }
  }, []);


  return (
    <>
      <HeadMetaTags title={'GrowMeDigitally'} description={'GrowMeDigitally'} image={'GrowMeDigitally'} siteName={'GrowMeDigitally'} storeData={'GrowMeDigitally'} />
      <Layout style={{ minHeight: '100vh' }}>
        <>
          <ThemeProvider isDarkMode={isDarkMode}> <Fragment>
            <SidebarComponent />
            <Layout>
              {toggleHeader && <HeaderComponent />}
              <Content>
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>
              </Content>
              {/* <FooterComponent /> */}
              <div className={styles.contentContainer}>
              </div>
            </Layout>
          </Fragment>
          </ThemeProvider>
        </>
      </Layout>
      <main className={styles.layoutContainer}>
      </main>
    </>
  );
}

