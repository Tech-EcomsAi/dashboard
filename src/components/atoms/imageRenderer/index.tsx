import Image from 'next/image'
import styles from './imageRenderer.module.scss'

function ImageRenderer({ src, width = 300, height = 300 }) {
    return (
        <Image className={styles.nextImageElement} layout='responsive' src={src} width={width} height={height} alt='ecoms.ai' />
    )
}

export default ImageRenderer