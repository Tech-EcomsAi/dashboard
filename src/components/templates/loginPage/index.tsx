'use client'
import { useAppDispatch } from "src/hooks/useAppDispatch";
import React, { useEffect, useState } from "react";
import styles from '@templatesCSS/loginPage/loginPage.module.scss'
import { Button, Divider, Form, Input, Space, theme } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { EMPTY_ERROR } from "@constant/common";
import { showErrorToast, showSuccessToast } from "@reduxSlices/toast";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { redirect } from 'next/navigation'
import { HOME_ROUTING, NAVIGARIONS_ROUTINGS } from "@constant/navigations";
import { LuSun } from "react-icons/lu";
import { useAppSelector } from "@hook/useAppSelector";
import { getDarkModeState, toggleDarkMode } from "@reduxSlices/clientThemeConfig";
import { useRouter } from 'next/navigation'

const LOGIN_ERRORS = {
  "INVALID_CREAD": "invalid-login-credentials",
  "UNREGISTRED": "email-not-registred",
}

function LoginPage() {
  const router = useRouter();
  const session = useSession();
  const dispatch = useAppDispatch();
  const [error, setError] = useState({ id: '', message: '' });
  const { token } = theme.useToken();
  const isDarkMode = useAppSelector(getDarkModeState)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (Boolean(session?.data?.user)) {
      console.log("user found")
      router.push(`/${HOME_ROUTING}`)
    }
  }, [])


  const signInWithCredentials = async (values: any) => {
    setIsLoading(true)
    signIn('credentials', { email: values.email, password: values.password, redirect: false })
      // getUserByCredentials(values)
      .then((response) => {
        if (response?.error) {
          console.log("singin cred error", response?.error)
          //failure
          if (response?.error.includes(LOGIN_ERRORS.INVALID_CREAD)) {
            dispatch(showErrorToast("Invalid credentials"))
            setError({ id: "cread", message: "Invalid credentials" })
          } else if (response?.error.includes(LOGIN_ERRORS.UNREGISTRED)) {
            dispatch(showErrorToast("Email not registered"))
            setError({ id: "cread", message: "Invalid email" })
          } else {
            dispatch(showErrorToast("Somthing went wrong"))
            setError({ id: "cread", message: "Somthing went wrong, please try again !" })
          }
        } else {
          //success
          dispatch(showSuccessToast("Perfect! You're signed in successfuly."))
          router.push(`/${HOME_ROUTING}`)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        dispatch(showErrorToast(err.message))
        setError(err)
      });
  }

  const signInWithGoogle = () => {
    signIn('google')
      .then((response) => {
        debugger
        console.log("inside  signIn('google')")
        if (response?.error) {
          //failure
          if (response?.error.includes(LOGIN_ERRORS.INVALID_CREAD)) {
            dispatch(showErrorToast("Invalid credentials"))
            setError({ id: "cread", message: "Invalid credentials" })
          } else if (response?.error.includes(LOGIN_ERRORS.UNREGISTRED)) {
            dispatch(showErrorToast("Email not registered"))
            setError({ id: "cread", message: "Invalid email" })
          }
        } else {
          //success
          debugger
          dispatch(showSuccessToast("Perfect! You're signed in successfuly."))
          router.push(`/${HOME_ROUTING}`)
        }
        debugger
        setIsLoading(false)
      })
      .catch((err) => {
        debugger
        setIsLoading(false)
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
      // background: "url(assets/images/loginPage/login_screen_bg.png)"
    }}>
      <div className={styles.bgWrap}></div>
      <div className={styles.bodyContent}>
        <div className={styles.leftContent}>
          <img src="assets/images/loginPage/login_screen_bg.png" />
        </div>
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
                onClick={signInWithGoogle} >
                Sing in with Google</Button>
            </div>
            <Divider className={styles.saperator}>Or</Divider>
            <Form
              name="normal_login"
              className={`${styles.form} login-form`}
              initialValues={{}}
              onFinish={signInWithCredentials}
              onValuesChange={onValuesChange}
              validateMessages={validateMessages}
            >
              <Form.Item
                className={styles.formItem}
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input className={styles.inputElement} size="large" prefix={<UserOutlined className="site-form-item-icon" />} allowClear placeholder="Email" />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }, { min: 6, message: "Password must be at least 6 characters" }]}
              >
                <Input.Password className={styles.inputElement} size="large" prefix={<LockOutlined className="site-form-item-icon" />} allowClear placeholder="Password"
                />
              </Form.Item>
              {error.message && <div className={styles.error}>
                {error.message}
              </div>}
              <Space direction="vertical" align="center" style={{ width: "100%" }} >
                <Button type="link" className="login-form-button" onClick={() => router.push(`/${NAVIGARIONS_ROUTINGS.FORGOT_PASSWORD}`)}>Forgot password</Button>
                <Button loading={isLoading} type="primary" size="large" htmlType="submit" style={{ width: 200 }} className="login-form-button">Log in</Button>
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

export default LoginPage;
