'use client'
import React from 'react'
import styles from "@organismsCSS/staticPages/staticPages.module.scss";
import { Button, Result } from 'antd';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

function NotFound() {
    const router = useRouter()
    return (
        <div className={styles.pageWrap}>
            <div className={styles.contentWrap}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => router.push('/')}>Go to dashboard</Button>}
                />
                {/* <div className={styles.imageWrap}>
                    <Image src="/assets/images/404.png" alt="me" width="300" height="300" />
                </div>
                <div className={styles.textWrap}>
                    Page not found
                </div>
                <div className={styles.footerBtnWrap}>
                    <Button type="link" onClick={() => Router.push('/')}>
                        Go to dashboard
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

export default NotFound