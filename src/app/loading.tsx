import React from 'react'
import styles from './page.module.css'

function Loading({ page }) {
    return (
        <main className={styles.main}>
            {/* {page} */}
            <img src="https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2FecomsAi.gif?alt=media&token=6ce6e52d-7ac5-4e46-b68f-fdd1e11cba07"
                alt={'EcomsAi'}
                width={300}
                height={"auto"} />
        </main>
    )
}

export default Loading