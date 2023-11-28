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

function LoginPage() {

  const session = useSession();
  const [cred, setUser] = useState({ username: '', password: '' });
  const dispatch = useAppDispatch();
  const [error, setError] = useState({ id: '', message: '' });
  const { token } = theme.useToken();
  const [userData, setUserData] = useState<any>(Boolean(session?.data?.user) ? session?.data?.user : null)
  const router = useRouter();

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
    return <div className={styles.loginPageWrap}>
      <div className={styles.headerWrap}>
        <div className={styles.logoWrap}>
          <img src={'https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2Flogo.png?alt=media&token=af824138-7ebb-4a72-b873-57298fd0a430'} />
        </div>
      </div>
      <div className={styles.bodyWrap}>
        <div className={styles.bodyContent}>
          <div className={styles.leftContent}>
            <img src="assets/images/loginPage/login-2.svg" />
          </div>
          <div className={styles.rightContent}>
            <div className={styles.formWrap}>
              <div className={`heading ${styles.heading}`}>Welcome back!</div>
              <div className={styles.subHeading}>Take your business beyond the four walls</div>
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
                  <Input
                    size="large"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username" />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                {error.message && <div className={styles.error}>
                  {error.message}
                </div>}
                <Space direction="vertical" align="center" style={{ width: "100%" }} >

                  <Form.Item className={styles.submitBtnWrap} >
                    <Button type="primary" size="large" htmlType="submit" style={{ width: "100%" }} className="login-form-button">
                      Log in
                    </Button>
                    <Button type="link" className="login-form-button">
                      Forgot password
                    </Button>
                  </Form.Item>

                  <Divider style={{ background: token.colorPrimaryBg, width: "100p%" }} />
                  <TextElement text={'OR'} color={'#ffff'} />
                  <Divider style={{ background: token.colorPrimaryBg, width: "100p%" }} />

                  <Button type="text" size="large" icon={<FcGoogle />} style={{ fontSize: 40 }} onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/builder' })} />
                </Space>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  // return <Suspense fallback={<p style={{ height: "100vh", width: "100vw", background: "red", color: "green", zIndex: 1000 }}>Logging out...</p>}>
  //   {renderPage()}
  // </Suspense>
  return <>{renderPage()}</>
}

export default LoginPage;
