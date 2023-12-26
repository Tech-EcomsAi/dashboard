'use client'
import { HOME_ROUTING } from '@constant/navigations';
import styles from "@organismsCSS/staticPages/staticPages.module.scss";
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

function NotFound() {
    const router = useRouter()
    return (
        <div className={styles.pageWrap}>
            <div className={styles.contentWrap}>
                <Result
                    status="500"
                    title="500"
                    subTitle="Sorry, something went wrong."
                    extra={<Button type="primary" onClick={() => router.push(HOME_ROUTING)}>Go to dashboard</Button>}
                />
            </div>
        </div>
    )
}

export default NotFound