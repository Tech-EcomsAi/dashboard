import React, { useState } from 'react';
import { fabric } from "fabric";
import { Segmented, theme, Tooltip } from 'antd';
import styles from './images.module.scss'
import Saperator from '@atoms/Saperator';
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import { BACKGROUND_IMAGES_TYPES, IMAGE_EDITOR_PAGE } from '@constant/common';
import GalleryImages from '@organisms/imagePickerModal/galleryImages';
import SearchImage from '@organisms/imagePickerModal/searchImage';
import UploadImage from '@organisms/imagePickerModal/uploadImage';
import { MdOutlineImageSearch } from 'react-icons/md';
import { RiImageAddFill } from 'react-icons/ri';
import { BsImages } from 'react-icons/bs';
import { v4 as uuid } from 'uuid';

const TAB_TYPES = {
    GALLERY: 'Gallery',
    SEARCH: 'Search',
    UPLOAD: 'Upload',
}

const Images = ({ canvas, updateLocalCanvas, workspace, activeObjectsState }: any) => {
    const { token } = theme.useToken();
    const [activeTab, setActiveTab] = useState(TAB_TYPES.GALLERY);
    const [selectedImage, setSelectedImage] = useState({ src: '' });

    const handleImageAdded = (imageData: any) => {
        fabric.Image.fromURL(imageData, function (img: any) {
            if (img == null) {
                alert("Error!");
            } else {
                const center = canvas.getCenter();
                img.set({ left: center.left / 2, top: center.top / 2 }).scale(0.2);
                img.set({ uid: uuid() })
                canvas.add(img);
                canvas.viewportCenterObject(img)
                canvas.setActiveObject(img)
                updateLocalCanvas(canvas, 'Images');
            }
        }, { crossOrigin: 'anonymous' });
    };

    const TAB_ITEMS_LIST = [
        {
            key: TAB_TYPES.GALLERY,
            icon: <BsImages />,
            children: <GalleryImages
                selectedImage={selectedImage}
                setSelectedImage={(imageData) => handleSave(imageData)}
                config={{ type: BACKGROUND_IMAGES_TYPES.SQUARE }} />
        },
        {
            key: TAB_TYPES.SEARCH,
            icon: <MdOutlineImageSearch />,
            children: <SearchImage
                currentPage={IMAGE_EDITOR_PAGE}
                actionWrapStyle={{ flexDirection: 'column' }}
                selectedImage={selectedImage}
                setSelectedImage={(imageData) => handleSave(imageData)}
                config={{ type: BACKGROUND_IMAGES_TYPES.SQUARE }} />
        },
        // {
        //     key: TAB_TYPES.UPLOAD,
        //     icon: <RiImageAddFill />,
        //     children: <UploadImage onUpload={handleImageAdded} />
        //     // children: <UploadImage />
        // },
    ]

    const getSegmentOptions = () => {
        return TAB_ITEMS_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} Images`}>
                        <div style={{ color: activeTab == option.key ? token.colorPrimary : 'inherit' }}
                            className={`${GlobalCss.segmentItem} ${activeTab == option.key ? GlobalCss.active : ''}`}>
                            <div className={GlobalCss.iconWrap} style={{ backgroundColor: activeTab == option.key ? token.colorPrimary : token.colorBgBase }}>
                                {option.icon}
                            </div>
                            <div className={GlobalCss.name} style={{ color: activeTab == option.key ? token.colorPrimary : token.colorBgBase }}>{option.key}</div>
                        </div>
                    </Tooltip>,
                value: option.key
            }
        })
    }
    const handleSave = (image) => {
        console.log(image)
        setSelectedImage(image);
        handleImageAdded(image.src)
    }


    const onChangeTab = (key: string) => {
        setActiveTab(key)
    };

    return (
        <div className={styles.imagesWrap}>
            <UploadImage onUpload={handleImageAdded} label="Upload from your computer" />
            <div className={GlobalCss.segmentWrap} >
                <Segmented
                    style={{ background: token.colorBgTextActive }}
                    size="middle"
                    block={true}
                    value={activeTab}
                    defaultValue={TAB_TYPES.GALLERY}
                    onChange={(tab: any) => onChangeTab(tab)}
                    options={getSegmentOptions()}
                />
            </div>
            <div className={styles.tabContent}>
                {TAB_ITEMS_LIST.find((t) => t.key == activeTab).children}
            </div>
            {/* <Saperator /> */}
        </div>
    );
};

export default Images;
