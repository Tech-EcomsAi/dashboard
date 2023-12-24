'use client'
import React, { Suspense } from 'react'
import styles from "../../404/notfound.module.css";
import { Button, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { HOME_ROUTING, NAVIGARIONS_ROUTINGS } from '@constant/navigations';
import { LOGO_LARGE } from '@constant/common';
import Image from 'next/image';
import AnimatedVerticalLogo from '@atoms/animatedVerticalLogo';
import AnimatedLogo from '@atoms/animatedLogo';

function UnAuthorized() {
    const router = useRouter()
    return (
        <div className={styles.pageWrap}>
            <div className={styles.logoWrap}>
                <Suspense fallback={<div>Loading</div>}>
                    {/* <AnimatedVerticalLogo /> */}
                    <AnimatedLogo />
                    {/* <Image src={LOGO_LARGE} alt={'ecoms.ai'} width={300} height={300} /> */}
                </Suspense>
            </div>
            <div className={styles.hWrap}>
                <h1>401</h1>
                <div className={styles.after}>401</div>
            </div>
            <div className={styles.cloak__wrapper}>
                <div className={styles.cloak__container}>
                    <div className={styles.cloak} ></div>
                </div>
            </div>
            <div className={styles.info}>
                <h2>Uh-oh! This area is off-limits.</h2>
                <p>If you&apos;re supposed to have access, please make sure you&apos;re logged in with the correct account. For further assistance, reach out to our support team.</p>
                <Space>
                    <Button size='large' type="primary" onClick={() => router.push(`/${NAVIGARIONS_ROUTINGS.SIGNIN}`)}>Sign-in with different email</Button>
                    <Button size='large' type="primary" onClick={() => router.push(`${HOME_ROUTING}`)}>Got to Dashboard</Button>
                </Space>
            </div>
        </div>
    )
}

export default UnAuthorized