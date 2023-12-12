import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import styles from './header.module.scss'
import { LuCheck, LuImage, LuShare2 } from 'react-icons/lu'
import { activeObjectsState } from '../types';
import { Button, theme, Tooltip, Modal, Checkbox, Input, Popconfirm, Dropdown, MenuProps } from 'antd';
import defaultCraftBuilderConfig from 'src/data/defaultCraftBuilderConfig';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast } from '@reduxSlices/toast';
import { PiFileSvg, PiFileJpg, PiFilePng, PiCrownFill } from 'react-icons/pi';
import { getDarkModeState, toggleDarkMode } from '@reduxSlices/clientThemeConfig';
import { TbDownload, TbEdit, TbResize } from 'react-icons/tb';
import { useAppSelector } from '@hook/useAppSelector';
import { MdDarkMode, MdCleaningServices, MdSave } from 'react-icons/md'
import { v4 as uuid } from 'uuid';
import { BiSolidHomeSmile } from 'react-icons/bi';
import { checkNonRestrictedObject, getCustomObjectType } from '@util/craftBuilderUtils';
import { BsFillSunFill } from 'react-icons/bs';
import CRAFT_SIZES from '@constant/craftSizes';
import SocialIcon from '@assets/Icons/social/SocialIcon';
import { IoSave } from 'react-icons/io5';
import { GiSave } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { ImDownload } from 'react-icons/im';
const { Search } = Input;
import { DownOutlined } from '@ant-design/icons';
import { showSuccessAlert } from '@reduxSlices/alert';
import { OBJECT_TYPES, SHARE_CRAFT_TYPES } from '@constant/craftBuilder';
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import ProUserIcon from '@atoms/proUserIcon';
const { TextArea } = Input;

type pageProps = {
    updateWorkspaceSize: any,
    setAutoSizing: any,
    updateLocalCanvas: any,
    canvas: fabric.Canvas,
    activeObjectsState: activeObjectsState
}

const DOWNLOAD_OPTIONS = {
    REMOVE_BG: 'Remove Background',
    REMOVE_WATERMARK: 'Remove Watermark',
    PNG: 'png',
    JPEG: 'jpeg',
    SVG: 'svg',
}

const FILE_TYPES = [
    { name: DOWNLOAD_OPTIONS.PNG, icon: <PiFilePng /> },
    { name: DOWNLOAD_OPTIONS.JPEG, icon: <PiFileJpg /> },
    { name: DOWNLOAD_OPTIONS.SVG, icon: <PiFileSvg /> },
]

const shareModalEmptyObj = {
    active: false,
    type: {
        name: 'SMS',
        showTitle: false,
        showDesc: false,
        showUserData: false,
        userDataType: 'Email'
    },
    title: "", description: "", userData: ''
};

function Header({ updateWorkspaceSize, setAutoSizing, updateLocalCanvas, canvas, activeObjectsState }: pageProps) {

    const [previewUrl, setPreviewUrl] = useState('')
    const { token } = theme.useToken();
    const [hoverId, setHoverId] = useState(null);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const isDarkMode = useAppSelector(getDarkModeState);
    const [activeTemplate, setActiveTemplate] = useState(1)
    const [downloadOptions, setDownloadOptions] = useState({
        removeBg: false,
        type: 'png',//'png', 'jpeg', or 'svg'
        removeWatermark: false
    })
    const [openSizeModal, setOpenSizeModal] = useState(false)
    const [openDownloadModal, setOpenDownloadModal] = useState('')
    const [selectedSize, setSelectedSize] = useState({ name: 'Square', width: 500, height: 500 })
    const [templateName, setTemplateName] = useState('');
    const [shareModal, setShareModal] = useState(shareModalEmptyObj);
    const [navigatorShareAvailable, setNavigatorShareAvailable] = useState(false);
    const [error, setError] = useState({ id: '', message: '' });

    useEffect(() => {
        if (navigator.share) {
            setNavigatorShareAvailable(true)
            // Web Share API is available, you can use it
            console.log('Web Share API is supported');
            // You can enable your share button here
        } else {
            setNavigatorShareAvailable(false)
            // Web Share API is not supported, provide a fallback
            console.log('Web Share API is not supported');
            // You can provide an alternative sharing solution or hide the share button
        }
    }, [])

    const TEMPLATE_ACTIONS: MenuProps['items'] = [
        {
            label: <div className={styles.saveAction}
                onMouseEnter={() => setHoverId(`save-templ`)}
                onMouseLeave={() => setHoverId('')}
                style={{ borderColor: hoverId == 'save-tmpl' ? token.colorPrimary : token.colorBorder }}>
                <div className={styles.iconWrap}
                    style={{ background: token.colorBgTextHover, color: token.colorPrimary }}><MdSave /></div>
                Save as new Template
                {!defaultCraftBuilderConfig.isPro && <ProUserIcon />}
            </div>,
            key: 'Save',
        },
        {
            label: <div className={styles.saveAction}
                onMouseEnter={() => setHoverId(`update-templ`)}
                onMouseLeave={() => setHoverId('')}
                style={{ borderColor: hoverId == 'update-tmpl' ? token.colorPrimary : token.colorBorder }}>
                <div className={styles.iconWrap} style={{ background: token.colorBgTextHover, color: token.colorPrimary }}><GiSave /></div>
                Update current Template
                {!defaultCraftBuilderConfig.isPro && <ProUserIcon />}
            </div>,
            key: 'Update',
        },
    ];

    const switchTheme = () => {
        dispatch(toggleDarkMode(!isDarkMode))
    }

    const getImgUrl = (type = 'png') => {
        const workspace = canvas.getObjects().find((item: fabric.Object) => getCustomObjectType(item) == OBJECT_TYPES.workspace);
        const { left, top, width, height } = workspace as fabric.Object;
        const option = {
            name: 'New Image',
            format: 'png',
            quality: 1,
            width,
            height,
            left,
            top,
        };
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        const watermark = canvas.getObjects().find((item: fabric.Object) => getCustomObjectType(item) == OBJECT_TYPES.watermark);
        watermark.bringToFront()
        canvas.renderAll();
        const dataUrl = canvas.toDataURL(option);
        setAutoSizing();
        return dataUrl;
    };

    const onClickPreview = () => {
        const dataUrl = getImgUrl();
        setPreviewUrl(dataUrl)
    }

    const onChnageOptions = (option, value) => {
        setIsLoading(false);
        switch (option) {
            case DOWNLOAD_OPTIONS.REMOVE_BG:
                if (defaultCraftBuilderConfig.isPro || !value) {
                    setDownloadOptions({ ...downloadOptions, removeBg: value })
                } else {
                    dispatch(showErrorToast('To remove background you need to be on pro version'))
                }
                break;

            case DOWNLOAD_OPTIONS.REMOVE_WATERMARK:
                if (defaultCraftBuilderConfig.isPro || !value) {
                    setDownloadOptions({ ...downloadOptions, removeWatermark: value })
                } else {
                    dispatch(showErrorToast('To remove watermark you need to be on pro version'))
                }
                break;
            default:
                break;
        }
    }

    const onClickDownload = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (downloadOptions.type == DOWNLOAD_OPTIONS.PNG || downloadOptions.type == DOWNLOAD_OPTIONS.JPEG) {
                const dataUrl = getImgUrl(downloadOptions.type);
                downloadFile(dataUrl, downloadOptions.type);
            } else {
                const workspace = canvas.getObjects().find((item: fabric.Object) => getCustomObjectType(item) == OBJECT_TYPES.workspace);
                const { left, top, width, height } = workspace as fabric.Object;
                const dataUrl = canvas.toSVG({ width, height, viewBox: { x: left, y: top, width, height }, });
                const fileStr = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(dataUrl)}`;
                downloadFile(fileStr, 'svg');
                setOpenDownloadModal(null);
            }
        }, 3000);
    }

    const downloadFile = (fileStr, fileType) => {
        const anchorEl = document.createElement('a');
        anchorEl.href = fileStr;
        anchorEl.download = `${uuid()}.${fileType}`;
        document.body.appendChild(anchorEl); // required for firefox
        anchorEl.click();
        anchorEl.remove();
        setIsLoading(false);
    }

    const onClickClear = () => {
        canvas.getObjects().forEach((obj) => {
            if (checkNonRestrictedObject(obj)) canvas.remove(obj)
        });
        canvas.discardActiveObject();
        updateLocalCanvas(canvas, "onClickClear canvas")
    }

    const onClickResize = () => {
        if (selectedSize.height && selectedSize.width) {
            updateWorkspaceSize(selectedSize.width, selectedSize.height);
            setOpenSizeModal(false);
        } else {
            dispatch(showErrorToast('Please select size'))
        }
    }

    const onClickSaveTemplate = () => {
        if (defaultCraftBuilderConfig.isPro) {


            console.log('save template');
            dispatch(showSuccessAlert('Template saved successfuly'))
        } else dispatch(showErrorToast('To save template you need to be on pro version'))
    }

    const onSaveActionClick: MenuProps['onClick'] = ({ key }) => {
        console.log(key)
        if (defaultCraftBuilderConfig.isPro) {


            console.log(`${key} Template`);
            dispatch(showSuccessAlert(`Template ${key} successfuly`))
        } else dispatch(showErrorToast(`To ${key} template you need to be on pro version`))
    };

    const onClickShareOption = (option) => {
        if (option.name == 'More') {
            onShare(shareModal)
        } else setShareModal({ ...shareModal, type: option });
    }

    const renderShareOptions = (options) => {
        return <React.Fragment>
            {options.map((type, i) => {
                return <React.Fragment key={i}>
                    <Tooltip title={type.tooltip}>
                        <div className={styles.typeDetails}
                            onClick={() => onClickShareOption(type)}
                            style={{ borderColor: shareModal.type.name == type.name ? token.colorPrimary : token.colorBorder }}
                        >
                            <div className={styles.iconWrap}>
                                <SocialIcon width={30} style={{ padding: 0 }} height={30} icon={type.icon} />
                            </div>
                            <div className={`${styles.iconWrap} ${styles.nameWrap}`}>
                                {type.name}
                            </div>
                            {shareModal.type.name == type.name && <div className={styles.selectedItem} style={{ backgroundColor: token.colorPrimary }}>
                                <LuCheck />
                            </div>}
                        </div>
                    </Tooltip>
                </React.Fragment>
            })}
        </React.Fragment>

    }

    const validateShareData = () => {
        let err = { id: '', message: "" };
        if (shareModal.type.showUserData && !shareModal.userData) err = { id: 'Email', message: `Please enter ${shareModal.type.userDataType}` }
        if (err.id) {
            dispatch(showErrorToast(err.message))
            setError(err);
        } else return true;
    }

    const onShare = (shareData) => {
        let shareUrl = '';
        const imageUrl = 'https://dashboard.respark.in/assets/images/respark_logo.png' || getImgUrl();
        const { title, description, userData } = shareData;
        if (shareData.type.name != 'More') {
            if (validateShareData()) {
                switch (shareData.type.name) {
                    case 'Whatsapp':
                        shareUrl = `https://wa.me/${userData}?text=${encodeURIComponent(description + ' ' + imageUrl)}`
                        // shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(description + ' ' + imageUrl)}`
                        break;
                    case 'Facebook':
                        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(description + ' ' + imageUrl)}`
                        // shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`
                        break;
                    case 'Instagram':
                        shareUrl = `https://www.instagram.com/share?url=${encodeURIComponent(imageUrl)}`
                        break;
                    case 'Twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(description)}&url=${encodeURIComponent(imageUrl)}`
                        break;
                    case 'Linkedin':
                        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}&url=${encodeURIComponent(imageUrl)}`
                        break;
                    case 'Email':
                        shareUrl = `mailto:${userData}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + ' ' + imageUrl)}`
                        break;
                    case 'Pinterest':
                        shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`
                        break;
                    case 'Tumblr':
                        shareUrl = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(imageUrl)}&caption=${encodeURIComponent(description)}`
                        break;
                    case 'Snapchat':
                        shareUrl = 'https://www.snapchat.com/share?url=' + encodeURIComponent(imageUrl)
                        break;
                    case 'SMS':
                        shareUrl = `sms:+${userData}?body=` + encodeURIComponent(description + ' ' + imageUrl)
                        break;
                    default:
                        break;
                }
                window.open(shareUrl, '_blank');
            }
        } else {
            if (navigatorShareAvailable) {
                navigator.share({
                    title: title,
                    text: description,
                    url: imageUrl
                });
            } else {
                setShareModal(shareModalEmptyObj)
                dispatch(showErrorToast("Default share option not available for your device"))
            }
        }
    }

    return (
        <div className={styles.headerWrap}>
            <Button type='dashed' className={styles.navToHome} icon={<BiSolidHomeSmile />} onClick={switchTheme} />
            <div className={styles.drawingTitle}>
                <Input type='dashed' size="middle" prefix={<TbEdit />} placeholder="Your drawing title" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
            </div>
            <div className={styles.actionsWrap}>
                {Boolean(canvas?.getObjects()?.length > 2) && <Popconfirm
                    okText="Yes"
                    cancelText="No"
                    title="Delete Layers"
                    description="Are you sure you want to delete all layers?"
                    onConfirm={(e) => onClickClear()}
                >
                    <Tooltip title="Start with blank design">
                        <Button icon={<MdCleaningServices />}></Button>
                    </Tooltip>
                </Popconfirm>}
                <Tooltip title="Share your design">
                    <Button icon={<LuShare2 />} onClick={() => setShareModal({ ...shareModalEmptyObj, active: true })}></Button>
                </Tooltip>
                <Tooltip title={`Switch theme to ${isDarkMode ? 'Light' : 'Dark'} Mode`}>
                    <Button type='dashed' className={styles.themeMode} icon={isDarkMode ? <MdDarkMode /> : <BsFillSunFill />} onClick={switchTheme} />
                </Tooltip>
                <Tooltip title="Risize design frame">
                    <Button type='primary' icon={<TbResize />} onClick={() => setOpenSizeModal(true)}>Resize</Button>
                </Tooltip>
                <Tooltip title="Preview of final image">
                    <Button type='primary' icon={<LuImage />} onClick={onClickPreview}>Preview</Button>
                </Tooltip>
                <Tooltip title="Download your creativity">
                    <Button type='primary' icon={<TbDownload />} onClick={() => setOpenDownloadModal(getImgUrl())}>Save</Button>
                </Tooltip>
            </div>

            {/* Final image preview */}
            <Modal
                destroyOnClose
                title="Final image preview"
                open={Boolean(previewUrl)}
                onCancel={() => setPreviewUrl('')}

                footer={null}
                className={styles.modalWrap}
                closeIcon={<AiOutlineClose />}
                width={'max-content'}
            >
                <div className={styles.previewImageWrap}>
                    <img src={previewUrl} />
                </div>
            </Modal>

            {/* Share Image */}
            <Modal
                destroyOnClose
                title="Share your creativity"
                open={Boolean(shareModal.active)}
                onCancel={() => setShareModal({ ...shareModalEmptyObj, active: false })}
                styles={{
                    mask: {
                        backdropFilter: 'blur(6px)'
                    }
                }}
                closeIcon={<AiOutlineClose />}
                width={'max-content'}
                onOk={() => onShare(shareModal)}
                okText={<div className="d-f-c"><LuShare2 /> &nbsp; Share </div>}
                cancelText={<div className="d-f-c"><AiOutlineClose /> &nbsp; Cancel </div>}
            >
                <div className={styles.shareModalWrap}>
                    <div className={styles.shareTypesWrap}>
                        {renderShareOptions(SHARE_CRAFT_TYPES)}
                        {navigatorShareAvailable && renderShareOptions([{ id: 16, tooltip: 'Share Via ...', name: 'More', icon: "sharevia" }])}
                    </div>
                    <div className={styles.dataWrap}>
                        {shareModal.type.showUserData && <div className={styles.titleWrap}>
                            <div className={styles.lable}>Enter {shareModal.type.userDataType}</div>
                            <Input status={error.id == shareModal.type.name ? "error" : ""} defaultValue={shareModal.userData} value={shareModal.userData} onChange={(e) => setShareModal({ ...shareModal, userData: e.target.value })} />
                        </div>}
                        {shareModal.type.showTitle && <div className={styles.titleWrap}>
                            <div className={styles.lable}>Enter title</div>
                            <Input defaultValue={shareModal.title} value={shareModal.title} onChange={(e) => setShareModal({ ...shareModal, title: e.target.value })} />
                        </div>}
                        {shareModal.type.showDesc && <div className={styles.titleWrap}>
                            <div className={styles.lable}>Enter short description</div>
                            <TextArea
                                status={error.id == 'text' ? "error" : ''}
                                allowClear
                                size="large"
                                value={shareModal.description}
                                placeholder="Enter message you want to share"
                                style={{ minHeight: 'auto' }}
                                onChange={(e) => setShareModal({ ...shareModal, description: e.target.value })}
                            />
                        </div>}
                    </div>
                </div>
            </Modal>

            {/* Sizes Options: */}
            <Modal
                destroyOnClose
                title="Sizes Options:"
                open={Boolean(openSizeModal)}
                onCancel={() => setOpenSizeModal(false)}
                styles={{
                    mask: {
                        backdropFilter: 'blur(6px)'
                    }
                }}
                footer={null}
                width={'max-content'}
                className={styles.modalWrap}
                closeIcon={<AiOutlineClose />}
            >
                <div className={styles.sizesWrap}>
                    {/* <div className={styles.title}>Sizes Options: </div> */}
                    <div className={styles.sizesList}>
                        {CRAFT_SIZES.map((craftCategory: any, i) => {
                            return <React.Fragment key={i}>
                                <div className={styles.categoryWrap}>
                                    <div className={styles.details}>
                                        {craftCategory.icon && <div className={styles.iconWrap}>
                                            <SocialIcon icon={craftCategory.icon} />
                                        </div>}
                                        {craftCategory.name}
                                    </div>
                                    <div className={styles.typesList}>
                                        {craftCategory.items.map((type, ind) => {
                                            return <div className={styles.typeDetails} key={ind}
                                                onMouseEnter={() => setHoverId(`${type.id}-${type.name}`)}
                                                onMouseLeave={() => setHoverId('')}
                                                onClick={() => setSelectedSize({ name: `${craftCategory.name}-${type.name}`, height: type.height, width: type.width })}
                                                style={{
                                                    background: token.colorBgContainerDisabled,
                                                    borderColor: (hoverId == `${type.id}-${type.name}` || (selectedSize.width == type.width && selectedSize.height == type.height && selectedSize.name == `${craftCategory.name}-${type.name}`)) ? token.colorPrimary : token.colorBorder,
                                                    color: hoverId == `${type.id}-${type.name}` ? token.colorPrimary : token.colorTextBase
                                                }}
                                            >
                                                {type.icon && <div className={styles.iconWrap}>
                                                    <SocialIcon icon={type.icon} />
                                                </div>}
                                                <div className={styles.sizenameWrap}>
                                                    <div className={styles.name}>{type.name}</div>
                                                    {type.width} x {type.height}px
                                                </div>
                                                {(selectedSize.width == type.width && selectedSize.height == type.height && selectedSize.name == `${craftCategory.name}-${type.name}`) && <div className={styles.selected} style={{ backgroundColor: token.colorPrimary }}>
                                                    <LuCheck />
                                                </div>}
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </React.Fragment>
                        })}
                    </div>
                    <div className={styles.actionBtn} style={{ background: token.colorBgTextHover }}>
                        <Tooltip title={defaultCraftBuilderConfig.isPro ? '' : 'Available for pro version'}>
                            <div className={styles.selectedSize}>
                                <Input addonBefore="Width" defaultValue={selectedSize.width} value={selectedSize.width} onChange={(e) => setSelectedSize({ ...selectedSize, width: Number(e.target.value) })} />
                                <Input addonBefore="Height" defaultValue={selectedSize.height} value={selectedSize.height} onChange={(e) => setSelectedSize({ ...selectedSize, height: Number(e.target.value) })} />
                                {!defaultCraftBuilderConfig.isPro && <div className={styles.proNote} style={{ background: token.colorBgMask }}>
                                    <div className={styles.iconWrap}>
                                        <PiCrownFill />
                                    </div>
                                </div>}
                            </div>
                        </Tooltip>
                        <Button type='primary' size='large' loading={isLoading} icon={<TbResize />} onClick={onClickResize}>Resize</Button>
                    </div>
                </div>
            </Modal>
            {/* Download Options */}
            <Modal
                destroyOnClose
                title="Download Options:"
                open={Boolean(openDownloadModal)}
                onCancel={() => setOpenDownloadModal('')}
                styles={{
                    mask: {
                        backdropFilter: 'blur(6px)'
                    }
                }}
                footer={null}
                className={styles.modalWrap}
                closeIcon={<AiOutlineClose />}
            >
                <div className={styles.saveActionsWrap}>
                    <div className={styles.actionsWrap}>
                        <div className={styles.previewWrap}>
                            <div className={styles.previewImageWrap}>
                                <img src={openDownloadModal} />
                            </div>
                        </div>
                        <div className={styles.saveOptionsWrap}>
                            <div className={styles.actionType}>
                                <Checkbox
                                    className={styles.checkboxElement}
                                    defaultChecked={downloadOptions.removeBg}
                                    style={{ color: token.colorTextBase }}
                                    checked={downloadOptions.removeBg}
                                    onChange={() => onChnageOptions(DOWNLOAD_OPTIONS.REMOVE_BG, !downloadOptions.removeBg)}>
                                    {DOWNLOAD_OPTIONS.REMOVE_BG}
                                </Checkbox>
                                <ProUserIcon />
                            </div>
                            <div className={styles.actionType}>
                                <Checkbox
                                    className={styles.checkboxElement}
                                    defaultChecked={downloadOptions.removeWatermark}
                                    style={{ color: token.colorTextBase }}
                                    checked={downloadOptions.removeWatermark}
                                    onChange={() => onChnageOptions(DOWNLOAD_OPTIONS.REMOVE_WATERMARK, !downloadOptions.removeWatermark)}>
                                    {DOWNLOAD_OPTIONS.REMOVE_WATERMARK}
                                </Checkbox>
                                <ProUserIcon />
                            </div>

                            {FILE_TYPES.map((option) => {
                                return <div key={option.name} className={styles.fileType}
                                    onClick={() => setDownloadOptions({ ...downloadOptions, type: option.name })}
                                    onMouseEnter={() => setHoverId(option)}
                                    onMouseLeave={() => setHoverId('')}
                                    style={{
                                        border: '1px solid #dee1ec',
                                        borderColor: (downloadOptions.type == option.name || hoverId == option) ? token.colorPrimary : token.colorBorder,
                                        color: (downloadOptions.type == option.name || hoverId == option) ? token.colorPrimary : token.colorTextLabel
                                    }}>
                                    <div className={styles.iconWrap}>{option.icon}</div>
                                    {option.name} File
                                    <div className={`${styles.selected} ${downloadOptions.type == option.name ? styles.active : ''}`} style={{ backgroundColor: token.colorPrimary }}>
                                        <LuCheck />
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles.actionBtn}>
                        <Button type='primary' size='middle' loading={isLoading} icon={<ImDownload />} onClick={onClickDownload}>Download</Button>
                        {activeTemplate ? <>

                            <Dropdown
                                // disabled={!defaultCraftBuilderConfig.isPro}
                                placement="bottom"
                                arrow
                                trigger={['click']}
                                destroyPopupOnHide={true}
                                menu={{ items: TEMPLATE_ACTIONS, onClick: onSaveActionClick }}
                                overlayClassName={styles.templateSaveActionsWrap}
                            >
                                <div className={styles.templateActions}>
                                    <Button type='primary' size='middle' loading={isLoading} icon={<IoSave />}>
                                        Template  <DownOutlined />
                                    </Button>
                                    {/* {!defaultCraftBuilderConfig.isPro && <ProUserIcon />} */}
                                </div>
                            </Dropdown>
                        </> :
                            <Button disabled={!defaultCraftBuilderConfig.isPro} type='primary' loading={isLoading} icon={defaultCraftBuilderConfig.isPro ? <IoSave /> : <ProUserIcon />} onClick={onClickSaveTemplate}>Save Template</Button>}
                    </div>
                </div>
            </Modal>
        </div >
    )
}

export default Header
