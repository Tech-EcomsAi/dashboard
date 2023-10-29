import React, { useRef, useState } from 'react'
import styles from './uploadImage.module.scss'
import { Button, Modal } from 'antd';
import { LuImagePlus, LuUpload } from 'react-icons/lu';
import { AiOutlineClose } from 'react-icons/ai';
import ImageCropper from '@organisms/imageCropper';
import { TbResize } from 'react-icons/tb';

function UploadImage({ src = "", isResize = false, onUpload, label = "Replace Image" }) {
    const fileInputRef = useRef(null);

    const [showCropperModal, setShowCropperModal] = useState({ active: false, src: null })

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setShowCropperModal({ active: true, src: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const onClickUpload = () => {
        if (isResize) setShowCropperModal({ active: true, src: src });
        else fileInputRef.current.click()
    }

    return (
        <div className={styles.uploadImageWrap}>
            <Button size='middle' onClick={onClickUpload} icon={isResize ? <TbResize /> : <LuUpload />} >{label}</Button>
            <input type="file" style={{ display: 'none' }} accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
            <ImageCropper onReplaceImage={onClickUpload} onCancel={() => setShowCropperModal({ active: false, src: null })} modalData={showCropperModal} onSave={onUpload} />
        </div>
    )
}

export default UploadImage