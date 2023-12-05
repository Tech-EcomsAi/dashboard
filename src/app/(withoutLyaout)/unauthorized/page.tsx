'use client'
import React, { Suspense } from 'react'
import styles from "../../404/notfound.module.css";
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { HOME_ROUTING, NAVIGARIONS_ROUTINGS } from '@constant/navigations';
import { LOGO_LARGE } from '@constant/common';

function UnAuthorized() {
    const router = useRouter()
    return (
        <div className={styles.pageWrap}>
            <div className={styles.logoWrap}>
                <Suspense fallback={<div>Loading</div>}>
                    <img src={LOGO_LARGE} />
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
                <p>If you're supposed to have access, please make sure you're logged in with the correct account. For further assistance, reach out to our support team.</p>
                <Button size='large' type="primary" onClick={() => router.push(`/${NAVIGARIONS_ROUTINGS.SIGNIN}`)}>Sign-in with different email</Button>
            </div>
            {/* <div className={styles.contentWrap}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => router.push(`/${HOME_ROUTING}`)}>Go to dashboard</Button>}
                />
            </div> */}
        </div>
    )
}

export default UnAuthorized