import AnimatedVerticalLogo from '@atoms/animatedVerticalLogo'
import styles from './page.module.css'

function Loading({ page }) {

    console.log("loading page:", page)

    return (
        <main className={styles.loadingWrap}>
            <AnimatedVerticalLogo />
            <div className={styles.bgWrap}></div>
        </main>
    )
}

export default Loading