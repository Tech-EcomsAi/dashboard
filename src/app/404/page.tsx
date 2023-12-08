'use client'
import React, { Suspense } from 'react'
import styles from "./notfound.module.css";
import { Button, Result } from 'antd';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { HOME_ROUTING } from '@constant/navigations';
import { LOGO_LARGE } from '@constant/common';

function NotFound() {
    const router = useRouter()
    return (
        <div className={styles.pageWrap}>
            <div className={styles.logoWrap}>
                <Suspense fallback={<div>Loading</div>}>
                    <img src={LOGO_LARGE} />
                </Suspense>
            </div>
            <div className={styles.hWrap}>
                <h1>404</h1>
                <div className={styles.after}>404</div>
            </div>
            <div className={styles.cloak__wrapper}>
                <div className={styles.cloak__container}>
                    <div className={styles.cloak} ></div>
                </div>
            </div>
            <div className={styles.info}>
                <h2>We can't find that page</h2>
                <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p>
                <Button size='large' type="primary" onClick={() => router.push(HOME_ROUTING)}>Go to dashboard</Button>
            </div>
            {/* <div className={styles.contentWrap}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => router.push(HOME_ROUTING)}>Go to dashboard</Button>}
                />
            </div> */}
        </div>
    )
}

export default NotFound