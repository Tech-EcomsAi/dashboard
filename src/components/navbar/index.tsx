'use client';
import React, { useEffect, useState } from 'react'
import styles from './navbar.module.scss'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';

function Navbar() {
    const session = useSession();
    const [usetData, setUsetData] = useState<any>(session?.data?.user)
    useEffect(() => {
        setUsetData(session?.data?.user)
    }, [session])

    console.log("Navbar Session", session)
    return (
        <div className={styles.navbarWrap}>
            <Link href="/pricing">
                <div className={styles.loginAction}>
                    Pricing
                </div>
            </Link>
            <Link href="/dashboard">
                <div className={styles.loginAction}>
                    Dashboard
                </div>
            </Link>
            <div className={styles.loginAction}>
                {usetData?.email}
                <div >{usetData?.name}</div>
                {usetData?.image && <div ><Image src={usetData?.image || ''} alt={''} height={50} width={50} /></div>}
                {Boolean(usetData) ? <button onClick={() => signOut()}>Logout</button> :
                    <button onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })}>Login</button>}
                {/* <button onClick={() => signIn("email", { email: "pasaydandg@gmail.com" })}>Sign in with Email</button> */}
            </div>
        </div>
    )
}

export default Navbar