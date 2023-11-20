'use client'
import React from 'react'
import styles from "@organismsCSS/staticPages/staticPages.module.scss";
import { Button, Result } from 'antd';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { HOME_ROUTING } from '@constant/navigations';

function NotFound() {
    const router = useRouter()
    return (
        <div className={styles.pageWrap}>
            <div className={styles.contentWrap}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => router.push(`/${HOME_ROUTING}`)}>Go to dashboard</Button>}
                />
            </div>
        </div>
    )
}

export default NotFound