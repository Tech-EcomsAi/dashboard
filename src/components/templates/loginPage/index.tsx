'use client'
import { useAppDispatch } from "src/hooks/useAppDispatch";
import React, { Suspense, useEffect, useState } from "react";
import styles from '@templatesCSS/loginPage/loginPage.module.scss'
import { setAuthUser } from "@reduxSlices/auth";
import { Button, Divider, Form, Input, Space, theme } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { EMPTY_ERROR } from "@constant/common";
import { showErrorToast, showSuccessToast } from "@reduxSlices/toast";
import { getUserByCredentials } from "@lib/internalApi/user";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import TextElement from "@antdComponent/textElement";
import { useRouter } from 'next/navigation'
import { HOME_ROUTING } from "@constant/navigations";
import { LuSun } from "react-icons/lu";
import { useAppSelector } from "@hook/useAppSelector";
import { getDarkModeState, toggleDarkMode } from "@reduxSlices/clientThemeConfig";

function LoginPage() {

  const session = useSession();
  const [cred, setUser] = useState({ username: '', password: '' });
  const dispatch = useAppDispatch();
  const [error, setError] = useState({ id: '', message: '' });
  const { token } = theme.useToken();
  const [userData, setUserData] = useState<any>(Boolean(session?.data?.user) ? session?.data?.user : null)
  const router = useRouter();
  const isDarkMode = useAppSelector(getDarkModeState)

  // useEffect(() => {
  //   if (Boolean(session?.data?.user)) {
  //     router.push(`/${HOME_ROUTING}`)
  //   }
  // }, [session])


  const login = async (values: any) => {
    getUserByCredentials(values)
      .then((data) => {
        console.log("getUserByCredentials", data);
        dispatch(setAuthUser(data));
        dispatch(showSuccessToast('Login Success'))
        // Router.push('/');
      })
      .catch((err) => {
        dispatch(showErrorToast(err.message))
        setError(err)
      });
  }

  const onValuesChange = () => {
    setError(EMPTY_ERROR)
  };

  const validateMessages = {
    required: "'${name}' is required!",
    // ...
  };


  const renderPage = () => {
    return <div className={styles.loginPageWrap}
      style={{
        background: token.colorBgBase,
        backgroundImage: `radial-gradient(circle at 10px 10px, ${token.colorTextDisabled} 1px, transparent 0)`,
      }}>
      <Space className={styles.headerWrap} align="center">
        <div className={styles.logoWrap}>
          <img src={'https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2Flogo.png?alt=media&token=af824138-7ebb-4a72-b873-57298fd0a430'} />
        </div>
        <Button icon={<LuSun />} size="large" onClick={() => dispatch(toggleDarkMode(!isDarkMode))} />
      </Space>
      <div className={styles.bodyWrap} style={{
        background: "url(assets/images/loginPage/login_screen_bg.png)"
      }}>
        <div className={styles.bgWrap}></div>
        <div className={styles.bodyContent}>
          {/* <div className={styles.leftContent}>
            <img src="assets/images/loginPage/login_screen_bg.png" />
          </div> */}
          <div className={styles.rightContent}>
            <div className={styles.formWrap}
              style={{
                // background: token.colorBgBase,
                // backgroundImage: `radial-gradient(circle at 10px 10px, ${token.colorTextDisabled} 1px, transparent 0)`,
                borderColor: token.colorBorder,
                background: `linear-gradient(0deg,rgba(186,207,247,.04),rgba(186,207,247,.04)), ${token.colorBgBase}`,
                boxShadow: `inset 0 1px 1px 0 rgba(216,236,248,.2), inset 0 24px 48px 0 rgba(168,216,245,.06), 0 16px 32px rgba(0,0,0,.3)`,
              }}>
              <h3 className={`${styles.heading}`} style={{ color: token.colorTextLabel }}>Welcome to</h3>
              <h1 className={`heading ${styles.heading} ${styles.title}`}>EcomsAi</h1>
              <div className={styles.subHeading} style={{ color: token.colorTextHeading }}>Take your business beyond the four walls</div>
              <div className={styles.googleLoginWrap}>
                <Button type="default"
                  size="large"
                  icon={<FcGoogle />}
                  onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/builder' })} >
                  Continue with Google</Button>
              </div>
              <Divider className={styles.saperator}>Or</Divider>
              <Form
                name="normal_login"
                className={`${styles.form} login-form`}
                initialValues={{}}
                onFinish={login}
                onValuesChange={onValuesChange}
                validateMessages={validateMessages}
              >
                <Form.Item
                  className={styles.formItem}
                  name="username"
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input className={styles.inputElement} size="large" prefix={<UserOutlined className="site-form-item-icon" />} allowClear placeholder="Username" />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input.Password className={styles.inputElement} size="large" prefix={<LockOutlined className="site-form-item-icon" />} allowClear placeholder="Password"
                  />
                </Form.Item>
                {error.message && <div className={styles.error}>
                  {error.message}
                </div>}
                <Space direction="vertical" align="center" style={{ width: "100%" }} >
                  <Button type="link" className="login-form-button">Forgot password</Button>
                  <Button type="primary" size="large" htmlType="submit" style={{ width: 200 }} className="login-form-button">Log in</Button>
                </Space>
                <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 20 }} >
                  <Button type="text" className="login-form-button" style={{ color: token.colorTextLabel }}>Not able to login please contact owner</Button>
                </Space>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  return <>{renderPage()}</>
}

export default LoginPage;
