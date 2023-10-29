import { PATTERN_PAGE } from '@constant/common';
import BgImageEditor from '@molecules/bgImageEditor';
import { theme } from 'antd';
import React, { Fragment, useState } from 'react'
import { imagesList, imagesTypes } from 'src/data/backgroundImages'
import styles from './galleryImages.module.scss'

const configSample = {
    type: 'small'
}
function GalleryImages({ currentPage = "", config, setSelectedImage, selectedImage }) {

    const { token } = theme.useToken();
    const [activeCategory, setActiveCategory] = useState(imagesTypes[config.type][0]);
    const [hoverId, setHoverId] = useState(null)

    return (
        <div className={styles.galleryImagesWrap}>
            <div className={styles.categoriesWrap} style={{ background: token.colorBgBase }}>
                {imagesTypes[config.type].map((category, i) => {
                    return <div className={styles.categoryName} key={i}
                        onClick={() => setActiveCategory(category)}
                        onMouseEnter={() => setHoverId(category)}
                        onMouseLeave={() => setHoverId('')}
                        style={{
                            zIndex: activeCategory == category ? 2 : 1,
                            position: activeCategory == category ? 'sticky' : 'relative',
                            background: token.colorBgBase,
                            borderColor: (hoverId == category || activeCategory == category) ? token.colorPrimary : token.colorBorder,
                            color: (activeCategory == category || hoverId == category) ? token.colorPrimary : token.colorText
                        }}>
                        {category}
                    </div>
                })}
            </div>
            <div className={styles.imagesWrap}>
                {imagesList[config.type][activeCategory].map((imageData, i) => {
                    return <Fragment key={i}>
                        <BgImageEditor
                            currentPage={currentPage}
                            active={selectedImage?.src == imageData}
                            imageData={{ src: imageData }}
                            onSelect={(image) => setSelectedImage(image)}
                            styleProps={{ height: 'auto', column: 3 }}
                        />
                    </Fragment>
                })}
            </div>
        </div>
    )
}

export default GalleryImages