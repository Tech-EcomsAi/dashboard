'use client'
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import Router from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from '@templatesCSS/loginPage/loginPage.module.scss'
import { getAuthUserState, setAuthUser } from "@reduxSlices/auth";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { EMPTY_ERROR } from "@constant/common";
import { showErrorToast, showSuccessToast, showToast } from "@reduxSlices/toast";
import { getUserByCredentials } from "@lib/internalApi/user";

function LoginPage() {

  const [cred, setUser] = useState({ username: '', password: '' });
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(getAuthUserState);
  const [error, setError] = useState({ id: '', message: '' });

  useEffect(() => {
    if (userDetails) {
      // Router.push("/");
    }
  }, []);

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

  return <div className={styles.loginPageWrap}>
    <div className={styles.headerWrap}>
      <div className={styles.logoWrap}>
        <img src={'/assets/4.png'} />
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
              <Form.Item
                className={styles.submitBtnWrap}
              >
                <Button type="link" className="login-form-button">
                  Forgot password
                </Button>
                <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default LoginPage;
