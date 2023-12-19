import React from 'react'
import styles from './page.module.css'
import AnimatedVerticalLogo from '@atoms/animatedVerticalLogo'

function Loading({ page }) {

    return (
        <main className={styles.loadingWrap}>
            <AnimatedVerticalLogo />
            <div className={styles.bgWrap}></div>
        </main>
    )
}

export default Loading