'use client';
import React, { useEffect, useState } from 'react'
import styles from './navbar.module.scss'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import { Button, theme } from 'antd';
import { showSuccessToast } from '@reduxSlices/toast';
import { getDarkModeState, toggleDarkMode } from '@reduxSlices/clientThemeConfig';

function Navbar() {
    const { data: session } = useSession()
    const dispatch = useAppDispatch();
    const isDark = useAppSelector(getDarkModeState);
    const [usetData, setUsetData] = useState<any>(session?.user)
    const { token } = theme.useToken();

    useEffect(() => {
        setUsetData(session?.user)
    }, [session])

    console.log("Navbar Session", session)
    return (
        <div className={styles.navbarWrap}>
            <Link href="/pricing">
                <div className={styles.loginAction} style={{ background: token.colorPrimary }}>
                    Pricing
                </div>
            </Link>
            <Link href="/dashboard">
                <div className={styles.loginAction} style={{ background: token.colorPrimary }}>
                    Dashboard
                </div>
            </Link>

            <Button onClick={() => dispatch(toggleDarkMode(!isDark))}>
                {isDark ? "Light" : "Dark"}
            </Button>

            <Button onClick={() => dispatch(showSuccessToast('Template saved successfuly'))}>
                Show toast
            </Button>

            <div className={styles.loginAction}>
                {usetData?.email}
                <div >{usetData?.name}</div>
                {usetData?.image && <div ><Image src={usetData?.image || ''} alt={'ecoms.ai'} height={50} width={50} /></div>}
                {Boolean(usetData) ? <button onClick={() => signOut()}>Logout</button> :
                    <button onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })}>Login</button>}
                {/* <button onClick={() => signIn("email", { email: "pasaydandg@gmail.com" })}>Sign in with Email</button> */}
            </div>
        </div>
    )
}

export default Navbar