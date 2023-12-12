import { LOGO, NO_COLOR_VALUE } from '@constant/common'
import { Button, Checkbox, Input, InputNumber, Modal, Popover, Segmented, theme, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import styles from './qrCode.module.scss'
import { TbBrandWhatsapp, TbClipboardCopy, TbDeviceMobileMessage, TbLink, TbQrcode, TbReplace } from 'react-icons/tb';
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import { fabric } from "fabric";
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import ColorPickerComponent from '@molecules/styleElement/colorPicker';
import Saperator from '@atoms/Saperator';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast, showSuccessToast } from '@reduxSlices/toast';
import { AiOutlineClose } from 'react-icons/ai';
import { addSelectedQRImage } from './utils';
import useDebounce from '@hook/useDebounce';
import { v4 as uuid } from 'uuid';
import { QRCode } from 'react-qrcode-logo';
import { isSameObjects, removeObjRef } from "@util/utils";
import { IoMdColorPalette } from "react-icons/io";
import { RiQrScan2Line } from "react-icons/ri";
import SocialIcon from '@assets/Icons/social/SocialIcon';
import { ImEnlarge } from 'react-icons/im';
import { LuCheck, LuDelete, LuQrCode, LuSettings } from 'react-icons/lu';
import { CONTENT_TYPES, DEFAULT_QR_SIZE, LOGO_SIZES, QRProps, TAB_TYPES, VALUE_TYPES } from '@constant/qrCodeTypes';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';
import { getCustomObjectType, insertImgFile } from '@util/craftBuilderUtils';
import ImageObjectProps from '@template/craftBuilder/objectPropertiesEditor/ImageProps';
import Filters from '@template/craftBuilder/objectPropertiesEditor/ImageProps/filters';
import Group from '@template/craftBuilder/objectPropertiesEditor/group';
import Lock from '@template/craftBuilder/objectPropertiesEditor/lock';
import QrProps from './qrProps';
import SegmentComponent, { SEGMENT_OPTIONS_TYPES } from '@atoms/segment';
import TextElement from '@antdComponent/textElement';
import SliderElement from '@antdComponent/sliderElement';

const { TextArea } = Input;

export const TAB_TYPES_LIST = [
    { key: TAB_TYPES.STYLE, icon: <IoMdColorPalette /> },
    { key: TAB_TYPES.CONTENT, icon: <RiQrScan2Line /> },
    { key: TAB_TYPES.TEMPLATE, icon: <TbQrcode /> },
]

export const VALUE_TYPES_LIST = [
    { key: VALUE_TYPES.WHATSAPP, icon: <TbBrandWhatsapp /> },
    { key: VALUE_TYPES.OTHERS, icon: <TbLink /> },
]

const EYE_TYPES = { INNER: 'inner', OUTER: "outer" }
function QrCode({ canvas, updateLocalCanvas, activeObjectsState, workspace }) {
    const { token } = theme.useToken();
    const dispatch = useAppDispatch()
    const fileInputRef = useRef(null);
    const [showWAPreviewModal, setShowWAPreviewModal] = useState(false)
    const [showQRPreviewModal, setShowQRPreviewModal] = useState(false)
    const [qrConfig, setQrConfig] = useState<QRProps>({
        value: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
        ecLevel: "M",
        size: DEFAULT_QR_SIZE,
        logoImage: LOGO,
        logoWidth: 80,
        logoOpacity: 1,
        removeQrCodeBehindLogo: false,
        logoPadding: 10,
        logoPaddingStyle: "square",//circle
        qrStyle: 'dots',//dots
        borderRadius: 0,
        eyeRadius: [
            { [EYE_TYPES.OUTER]: [10, 10, 0, 10], [EYE_TYPES.INNER]: [10, 10, 0, 10] },
            { [EYE_TYPES.OUTER]: [10, 10, 10, 0], [EYE_TYPES.INNER]: [10, 10, 10, 0] },
            { [EYE_TYPES.OUTER]: [10, 0, 10, 10], [EYE_TYPES.INNER]: [10, 0, 10, 10] }
        ],
        eyeColor: [
            { [EYE_TYPES.OUTER]: token.colorPrimaryActive, [EYE_TYPES.INNER]: token.colorPrimary },
            { [EYE_TYPES.OUTER]: token.colorPrimaryActive, [EYE_TYPES.INNER]: token.colorPrimary },
            { [EYE_TYPES.OUTER]: token.colorPrimaryActive, [EYE_TYPES.INNER]: token.colorPrimary }],
        id: uuid(),
        fgColor: "black",
        bgColor: '#dee1ec',
        quietZone: 10,
        valueType: VALUE_TYPES.WHATSAPP,
        contentType: VALUE_TYPES.WHATSAPP,
        phone: '',
        text: '',
    })
    const [error, setError] = useState({ id: '', message: '' });
    const [qrImage, setQrImage] = useState('');
    const [isAddedToCanvas, setIsAddedToCanvas] = useState(false)

    const updateQrImage = useDebounce(() => {
        const qrCanvas = document.getElementById(`qr-element`)?.querySelector<HTMLCanvasElement>('canvas');
        const imageSrc = qrCanvas.toDataURL("image/png", 1.0);
        setQrImage(imageSrc)
    })

    useEffect(() => {
        updateQrImage();
        //get already added qr code object
        if (canvas) {
            //if fill is set to pattern
            const qrObject = canvas.getObjects()?.find((i) => getCustomObjectType(i) == OBJECT_TYPES.qrCode);
            if (qrObject) {
                const qrCodeConfig: QRProps = qrObject.get(CUSTOME_ATTRIBUTES.QR_CODE_CONFIG);
                if (qrCodeConfig && qrCodeConfig.value) {
                    setQrConfig(removeObjRef(qrCodeConfig))
                    setIsAddedToCanvas(true)
                } else setIsAddedToCanvas(false)
            } else setIsAddedToCanvas(false)
        }
    }, [activeObjectsState])

    const updateCanvasQRObject = useDebounce(() => {
        const qrObject = canvas.getObjects()?.find((i) => getCustomObjectType(i) == OBJECT_TYPES.qrCode);
        const activeObject = canvas.getActiveObjects();
        if (qrObject) {
            const qrCodeConfig: QRProps = qrObject.get(CUSTOME_ATTRIBUTES.QR_CODE_CONFIG);
            if (!isSameObjects(qrCodeConfig, qrConfig)) {
                activeObject.map((item) => canvas.remove(item));
                canvas.discardActiveObject();
                canvas.remove(qrObject);
                onAddUpdateQr(qrConfig)
            }
        }
    })

    useEffect(() => {
        //get already added qr code object
        if (canvas && isAddedToCanvas) {
            console.log("activeObjectsState QRCODE rerender")
            updateCanvasQRObject(qrConfig)
        }
    }, [qrConfig])


    const onChange = (property, value) => {
        setError({ id: '', message: '' })
        const qrConfigCopy: QRProps = removeObjRef(qrConfig);
        qrConfigCopy[property] = value;
        if (property == 'fgColor' && value == NO_COLOR_VALUE) qrConfigCopy.fgColor = 'black';
        if (property == 'bgColor' && value == NO_COLOR_VALUE) qrConfigCopy.bgColor = 'white';
        if (property == 'logoSize' && value == 1) qrConfigCopy.logoPadding = 0;
        if (property === 'text' || property === 'phone') {
            qrConfigCopy.value = `https://wa.me/${qrConfigCopy.phone}?text=${encodeURI(qrConfigCopy.text)}`;
        }
        if (property == 'logoWidth' && (value == qrConfig.size || value == 1)) {
            qrConfigCopy.logoOpacity = 0.4;
            qrConfigCopy.logoPadding = 0;
            qrConfigCopy.removeQrCodeBehindLogo = false;
        }
        setQrConfig(qrConfigCopy)
        updateQrImage()
    }

    const onChangeEyeColors = (property, value) => {
        const qrConfigCopy: QRProps = removeObjRef(qrConfig);
        const eyeColorCopy = qrConfigCopy.eyeColor;
        eyeColorCopy.map((corner) => {
            corner[property] = value
        })
        qrConfigCopy.eyeColor = eyeColorCopy;
        setQrConfig(qrConfigCopy)
        updateQrImage()
    }

    const onChangeRadius = (property, value) => {
        const qrConfigCopy: QRProps = removeObjRef(qrConfig);
        const eyeRadiusCopy = qrConfigCopy.eyeRadius;
        eyeRadiusCopy.map((corner) => {
            corner[property] = Array(4).fill(value)
        })
        qrConfigCopy.eyeRadius = eyeRadiusCopy;
        setQrConfig(qrConfigCopy)
        updateQrImage()
    }

    const validateWhatsappData = () => {
        let err = { id: '', message: '' };
        if (!qrConfig.phone) err = { id: 'phone', message: 'Whatsapp phone number is mandatory ' }
        else if (qrConfig.phone && qrConfig.phone.length < 7) err = { id: 'phone', message: 'Enter valid whatsapp phone number' }
        else if (!qrConfig.text) err = { id: 'text', message: 'Message is mandatory' }
        if (err.id) {
            setError(err);
            dispatch(showErrorToast(err.message));
            return false;
        } else return true
    }

    const generateLink = () => {
        if (validateWhatsappData()) {
            const qrConfigCopy = { ...qrConfig };
            qrConfigCopy.value = `https://wa.me/${qrConfigCopy.phone}?text=${encodeURI(qrConfigCopy.text)}`;
            navigator?.clipboard?.writeText(qrConfigCopy.value)
            dispatch(showSuccessToast("Link copied successfully!"))
            setQrConfig(qrConfigCopy);
            const element = document.getElementById("qr-list-wrap");
            element && element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }

    const showPreview = () => {
        if (validateWhatsappData()) {
            setShowWAPreviewModal(true);
        }
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                onChange('logoImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [activeTab, setActiveTab] = useState(TAB_TYPES.STYLE);

    const onAddUpdateQr = (qrConfig) => {
        setError({ id: '', message: '' });

        if (qrConfig?.valueType === VALUE_TYPES.WHATSAPP && !validateWhatsappData()) {
            setActiveTab(TAB_TYPES.CONTENT)
            setTimeout(() => {
                const element = document.getElementById("valueContentWrap");
                element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }, 1000);
            return false;

        } else if (qrConfig?.valueType === VALUE_TYPES.OTHERS && !qrConfig.value) {
            setError({ id: 'url', message: 'Please enter url' });
            dispatch(showErrorToast("Please enter url"));
            setActiveTab(TAB_TYPES.CONTENT)
            return false;
        }

        // setQrConfig(qrConfig)
        const qrCanvas = document.getElementById(`qr-element`)?.querySelector<HTMLCanvasElement>('canvas');
        const imageSrc = qrCanvas.toDataURL("image/png", 1.0);
        const qrObject = canvas.getObjects()?.find((i) => getCustomObjectType(i) == OBJECT_TYPES.qrCode);
        addSelectedQRImage(canvas, updateLocalCanvas, { ...qrConfig, src: imageSrc })
        setIsAddedToCanvas(true);
    }

    const getBorderRadius = (values) => {
        return `${values[0] * 1.6}px ${values[1] * 1.6}px ${values[2] * 1.6}px ${values[3] * 1.6}px`
    }

    const onChangeEyeRadius = (typeIndex, type, index, value) => {
        const qrConfigCopy = removeObjRef(qrConfig);
        qrConfigCopy.eyeRadius[typeIndex][type][index] = value
        setQrConfig(qrConfigCopy);
        updateQrImage()
    }

    const renderRadiusActions = (type) => {//type == inner or outer
        const cornerTypes = ['Top Left', 'Top Right', 'Bottom Left'];
        return <div className={styles.radiusActionsWrap}>
            {cornerTypes.map((cornerType, typeIndex) => {
                return <div className={styles.radiusActions} key={typeIndex}>
                    <div className={styles.label} style={{ color: token.colorTextBase }}>{cornerType} Radius</div>
                    <div className={styles.actionWrap}>
                        <div className={styles.preview}
                            style={{
                                borderColor: token.colorBorder,
                                borderRadius: qrConfig.borderRadius,
                                backgroundColor: qrConfig.bgColor
                            }}>
                            <div className={styles.outer}
                                style={{
                                    zIndex: type == EYE_TYPES.INNER ? 1 : 2,
                                    borderColor: qrConfig.eyeColor[typeIndex].outer,
                                    borderRadius: getBorderRadius(qrConfig.eyeRadius[typeIndex].outer),
                                }}>
                            </div>
                            <div className={styles.inner}
                                style={{
                                    opacity: type == EYE_TYPES.OUTER ? 1 : 2,
                                    backgroundColor: qrConfig.eyeColor[typeIndex].inner,
                                    borderRadius: getBorderRadius(qrConfig.eyeRadius[typeIndex].inner),
                                }}>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            {['Top Left', 'Top Right', 'Bottom Right', 'Bottom Left'].map((eyeCorner, eyeCornerIndex) => {
                                return <div key={eyeCornerIndex} className={`${styles.eyeRadiusWrap}`}>
                                    <TextElement text={eyeCorner} color={token.colorTextBase} />
                                    <div className={`${styles.sliderWrap}`}>
                                        <SliderElement
                                            min={0}
                                            max={30}
                                            onChange={(value) => onChangeEyeRadius(typeIndex, type, eyeCornerIndex, value)}
                                            value={qrConfig.eyeRadius[typeIndex][type][eyeCornerIndex]}
                                            step={2}
                                        />
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            })}
        </div>
    }

    return (
        <div className={styles.qrCodeWrap} >
            {/* active Tab */}
            <SegmentComponent
                label=""
                entity={''}
                showIcon={true}
                value={activeTab}
                onChange={(tab: any) => setActiveTab(tab)}
                options={TAB_TYPES_LIST}
                type={SEGMENT_OPTIONS_TYPES.ARRAY_OF_OBJECTS}
            />

            {/* {isAddedToCanvas && <QrProps updateLocalCanvas={updateLocalCanvas} workspace={workspace} canvas={canvas} activeObjectsState={activeObjectsState} />} */}

            {/* selected */}
            {qrImage && <div className={styles.selectedQrCodeWrap}>
                <img src={qrImage} style={{ borderRadius: qrConfig.borderRadius }} />
                <Button onClick={() => setShowQRPreviewModal(true)} icon={<ImEnlarge />}>Preview</Button>
            </div>}


            <div className={styles.qrContentWrap}>
                {activeTab == TAB_TYPES.STYLE && <>
                    {/* Bg colors */}
                    <Saperator />
                    <div className={styles.colorsWrap}>
                        <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                            <div className={`${styleElementCSS.elementWrap}`}>
                                <ColorPickerComponent
                                    parentStyles={{ background: 'unset', color: token.colorTextBase }}
                                    hideColorString
                                    // hideTransparency
                                    value={{ format: 'hex', color: qrConfig.bgColor }}
                                    onChange={(value) => onChange('bgColor', value.color)}
                                    label="Background Color" />
                            </div>
                        </div>
                        <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                            <div className={`${styleElementCSS.elementWrap}`}>
                                <ColorPickerComponent
                                    parentStyles={{ background: 'unset', color: token.colorTextBase }}
                                    hideColorString
                                    // hideTransparency
                                    value={{ format: 'hex', color: qrConfig.fgColor }}
                                    onChange={(value) => onChange('fgColor', value.color)}
                                    label="Design Color" />
                            </div>
                        </div>
                    </div>

                    {/* Eye colors */}
                    <div className={styles.colorsWrap}>
                        <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                            <div className={`${styleElementCSS.elementWrap}`}>
                                <ColorPickerComponent
                                    parentStyles={{ background: 'unset', color: token.colorTextBase }}
                                    hideColorString
                                    hideTransparency
                                    value={{ format: 'hex', color: qrConfig.eyeColor[0].inner }}
                                    onChange={(value) => onChangeEyeColors(EYE_TYPES.INNER, value.color)}
                                    label="Inner Eye Color" />
                            </div>
                        </div>
                        <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                            <div className={`${styleElementCSS.elementWrap}`}>
                                <ColorPickerComponent
                                    parentStyles={{ background: 'unset', color: token.colorTextBase }}
                                    hideColorString
                                    hideTransparency
                                    value={{ format: 'hex', color: qrConfig.eyeColor[0].outer }}
                                    onChange={(value) => onChangeEyeColors(EYE_TYPES.OUTER, value.color)}
                                    label="Outer Eye Color" />
                            </div>
                        </div>
                    </div>

                    <Saperator />
                    {/* Border Radius */}
                    <div className={`${styleElementCSS.styleWrap} ${styles.logoWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                        <TextElement text={'Background Radius'} color={token.colorTextBase} />
                        <div className={`${styles.styleWrap} ${styles.sliderWrap} ${styleElementCSS.elementWrap}`}>
                            <SliderElement
                                min={0}
                                max={qrConfig.quietZone / 1.5}
                                onChange={(value) => onChange('borderRadius', value)}
                                value={qrConfig.borderRadius}
                                step={2}
                            />
                        </div>
                    </div>

                    <Saperator />
                    {/*Eye Radius */}
                    {[EYE_TYPES.OUTER, EYE_TYPES.INNER].map((type) => {
                        return <div key={type} className={`${styleElementCSS.styleWrap} ${styles.logoWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                            <div className={`${styleElementCSS.label} ${styles.iconLable}`}>{type} Eye Radius
                                <Popover title={<div className={styles.popoverTitle}>{type} eye radius</div>} content={() => renderRadiusActions(type)} placement="left" trigger="click">
                                    <div className={styles.iconWrap}>
                                        <LuSettings />
                                    </div>
                                </Popover>
                            </div>
                            <div className={`${styles.styleWrap} ${styles.sliderWrap} ${styleElementCSS.elementWrap}`}>
                                <SliderElement
                                    min={0}
                                    max={30}
                                    onChange={(value) => onChangeRadius(type, value)}
                                    value={qrConfig.eyeRadius[0][type][0]}
                                    step={2}
                                />
                            </div>
                        </div>
                    })}

                    <Saperator />
                    {/* style */}
                    <SegmentComponent
                        label="Style of the QR Code modules"
                        value={qrConfig.qrStyle}
                        onChange={(value) => onChange('qrStyle', value)}
                        options={['squares', 'dots']}
                        type={SEGMENT_OPTIONS_TYPES.ARRAY}
                    />

                    <Saperator />
                    {/* Dencity */}
                    <SegmentComponent
                        label={`${qrConfig.qrStyle} Dencity`}
                        value={qrConfig.ecLevel}
                        onChange={(value) => onChange('ecLevel', value)}
                        options={['M', 'Q', 'H']}
                        type={SEGMENT_OPTIONS_TYPES.ARRAY}
                    />

                    <Saperator />
                    {/* spacing */}
                    <SegmentComponent
                        label="Outer Spacing"
                        value={qrConfig.quietZone}
                        onChange={(value) => onChange('quietZone', value)}
                        options={[0, 10, 20, 30, 40]}
                        type={SEGMENT_OPTIONS_TYPES.ARRAY}
                    />

                    {/* LOGO */}
                    <Saperator />
                    <div className={`${styleElementCSS.styleWrap} ${styles.logoWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                        <TextElement text={'Logo/Image'} color={token.colorTextBase} />
                        <div className={`${styles.styleWrap} ${styleElementCSS.elementWrap}`}>
                            <div className={styles.qrLogo}>
                                <img src={qrConfig.logoImage} />
                                <Button size='middle' onClick={() => fileInputRef.current.click()} icon={<TbReplace />} >Replace</Button>
                                <input type="file" style={{ display: 'none' }} accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>

                    <Saperator />
                    {/* Logo size */}
                    <SegmentComponent
                        label="Logo Size"
                        value={LOGO_SIZES.find((i) => i.value == qrConfig.logoWidth)?.key}
                        onChange={(value) => onChange('logoWidth', LOGO_SIZES.find((i) => i.key == value).value)}
                        options={LOGO_SIZES}
                        type={SEGMENT_OPTIONS_TYPES.ARRAY_OF_OBJECTS}
                    />

                    {/* Logo Blur */}
                    <div className={`${styleElementCSS.styleWrap} ${styles.logoWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                        <TextElement text={'Logo Blur'} color={token.colorTextBase} />
                        <div className={`${styles.sliderWrap} ${styles.sliderWrap} ${styleElementCSS.elementWrap}`}>
                            <SliderElement
                                min={0}
                                max={1}
                                onChange={(value) => onChange('logoOpacity', value)}
                                value={qrConfig.logoOpacity}
                                step={0.1}
                            />
                        </div>
                    </div>

                    {/* Logo Spacing */}
                    <div className={`${styleElementCSS.styleWrap} ${styles.logoWrap} ${qrConfig.size == qrConfig.logoWidth ? 'disabled' : ''}`} style={{ background: 'unset', color: token.colorTextBase }}>
                        <TextElement text={'Logo Spacing'} color={token.colorTextBase} />
                        <div className={`${styles.styleWrap} ${styles.sliderWrap} ${styleElementCSS.elementWrap}`}>
                            <SliderElement
                                min={0}
                                max={20}
                                onChange={(value) => onChange('logoPadding', value)}
                                value={qrConfig.logoPadding}
                                step={2}
                            />
                        </div>
                    </div>

                    <Saperator />
                    {/* Logo Spacing style */}
                    <SegmentComponent
                        label="Logo Spacing style"
                        value={qrConfig.logoPaddingStyle}
                        onChange={(value) => onChange('logoPaddingStyle', value)}
                        options={['square', 'circle']}
                        type={SEGMENT_OPTIONS_TYPES.ARRAY}
                    />

                    <Saperator />
                    {/* Fit Logo to QR */}
                    <div className={` ${styles.styleWrap}`}>
                        <Checkbox
                            className={styles.checkboxElement}
                            defaultChecked={qrConfig.logoWidth == qrConfig.size}
                            style={{ color: token.colorTextBase }}
                            checked={qrConfig.logoWidth == qrConfig.size}
                            onChange={(value) => onChange('logoWidth', qrConfig.size)}>
                            Fit Logo to QR
                        </Checkbox>
                    </div>

                    <Saperator />
                    {/* Remove QR Pttern Behinde Logo */}
                    <div className={` ${styles.styleWrap}`}>
                        <Checkbox
                            className={styles.checkboxElement}
                            defaultChecked={qrConfig.removeQrCodeBehindLogo}
                            style={{ color: token.colorTextBase }}
                            checked={qrConfig.removeQrCodeBehindLogo}
                            onChange={(value) => onChange('removeQrCodeBehindLogo', !qrConfig.removeQrCodeBehindLogo)}>
                            Remove QR Pttern Behinde Logo
                        </Checkbox>
                    </div>
                </>}

                {/* Results after scan" */}
                {activeTab == TAB_TYPES.CONTENT && <>

                    <div className={styles.valueWrap}>
                        <SegmentComponent
                            label="Results after scan"
                            showIcon={true}
                            value={qrConfig?.valueType}
                            onChange={(value: any) => setQrConfig({ ...qrConfig, valueType: value, value: '' })}
                            options={VALUE_TYPES_LIST}
                            type={SEGMENT_OPTIONS_TYPES.ARRAY_OF_OBJECTS}
                        />

                        <div className={styles.valueContentWrap} id="valueContentWrap">
                            {!Boolean(CONTENT_TYPES.find((t) => t.name == qrConfig.contentType)) && <div className={styles.note}>
                                <TextElement text={'Select type you want share after QR Code scanned'} color={token.colorTextBase} />
                            </div>}
                            {qrConfig.valueType == VALUE_TYPES.OTHERS ? <>
                                <div className={styles.contentTypesWrap}>
                                    {CONTENT_TYPES.map((type, i) => {
                                        return <React.Fragment key={i}>
                                            <Tooltip title={type.tooltip}>
                                                <div className={styles.typeDetails}
                                                    onClick={() => setQrConfig({ ...qrConfig, contentType: type.name })}
                                                    style={{ borderColor: qrConfig.contentType == type.name ? token.colorPrimary : token.colorBorder }}
                                                >
                                                    <div className={styles.iconWrap}>
                                                        <SocialIcon width={30} style={{ padding: 0 }} height={30} icon={type.icon} />
                                                    </div>
                                                    {qrConfig.contentType == type.name && <div className={GlobalCss.selectedItem} style={{ backgroundColor: token.colorPrimary }}>
                                                        <LuCheck />
                                                    </div>}
                                                </div>
                                            </Tooltip>
                                        </React.Fragment>

                                    })}
                                </div>
                                {Boolean(CONTENT_TYPES.find((t) => t.name == qrConfig.contentType)) ? <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                                    <TextElement text={`Enter ${CONTENT_TYPES.find((t) => t.name == qrConfig.contentType)?.tooltip} you want to share`} color={token.colorTextBase} />
                                    <div className={`${styleElementCSS.elementWrap}`}>
                                        <TextArea
                                            status={error.id == 'url' ? "error" : ''}
                                            allowClear
                                            size="large"
                                            value={qrConfig.value}
                                            placeholder="Enter url that display after scanning the qr code"
                                            style={{ minHeight: 'auto', marginBottom: 24 }}
                                            onChange={(e: any) => onChange('value', e.target.value)}
                                        />
                                    </div>
                                </div> : <></>}
                            </> : <>
                                <div className={styles.whatsappLinkWrap}>
                                    <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                                        <TextElement text={'Enter your phone number'} color={token.colorTextBase} />
                                        <div className={` ${styles.styleWrap} ${styleElementCSS.elementWrap}`}>
                                            <InputNumber
                                                status={error.id == 'phone' ? "error" : ''}
                                                placeholder="Enter your phone number"
                                                // allowClear
                                                type="number"
                                                controls={false}
                                                size="middle"
                                                style={{ width: "100%" }}
                                                value={qrConfig.phone}
                                                onChange={(e: any) => onChange('phone', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                                        <TextElement text={'Enter message you want to share'} color={token.colorTextBase} />
                                        <div className={` ${styles.styleWrap} ${styleElementCSS.elementWrap}`}>
                                            <TextArea
                                                status={error.id == 'text' ? "error" : ''}
                                                allowClear
                                                size="large"
                                                value={qrConfig.text}
                                                placeholder="Enter message that display on whatsapp after scanning the qr code"
                                                style={{ minHeight: 'auto' }}
                                                onChange={(e: any) => onChange('text', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.generateLinkBtn}>
                                        <Button size='middle' icon={<TbClipboardCopy />} type='primary' onClick={generateLink}>Copy Link</Button>
                                        <Button size='middle' icon={<TbDeviceMobileMessage />} type='primary' onClick={showPreview}>Preview</Button>
                                    </div>
                                </div>
                            </>}
                        </div>
                        <Saperator />
                    </div>
                </>}
            </div>

            {!isAddedToCanvas && <div className={styles.qrActionWrap}>
                <Button size='middle' icon={<LuQrCode />} type='primary' onClick={() => onAddUpdateQr(qrConfig)}>Add QR Code</Button>
            </div>}

            {/* //QR Element wrapper */}
            <div className={styles.qrRendererWrap} id="qr-element" style={{ display: 'none' }}>
                <QRCode
                    value={qrConfig.value}
                    ecLevel={qrConfig.ecLevel}
                    size={qrConfig.size}
                    logoImage={qrConfig.logoImage}
                    logoWidth={qrConfig.logoWidth}
                    logoOpacity={qrConfig.logoOpacity}
                    removeQrCodeBehindLogo={qrConfig.removeQrCodeBehindLogo}
                    logoPadding={qrConfig.logoPadding}
                    logoPaddingStyle={qrConfig.logoPaddingStyle}
                    qrStyle={qrConfig.qrStyle}
                    eyeRadius={qrConfig.eyeRadius}
                    eyeColor={qrConfig.eyeColor}
                    id={qrConfig.id}
                    fgColor={qrConfig.fgColor}
                    bgColor={qrConfig.bgColor}
                    quietZone={qrConfig.quietZone}
                />
            </div>

            {/* "Whatsapp message preview" */}
            <Modal
                destroyOnClose
                title="Whatsapp message preview"
                open={Boolean(showWAPreviewModal)}
                onCancel={() => setShowWAPreviewModal(false)}
                onOk={() => window.open(qrConfig.value, "_blank")}
                styles={{
                    mask: {
                        backdropFilter: 'blur(6px)'
                    }
                }}
                className={styles.modalWrap}
                closeIcon={<AiOutlineClose />}
                width={'max-content'}
                okText={<div className="d-f-c">Open whatsapp&nbsp; <TbBrandWhatsapp /></div>}
                cancelText="Close"
            >
                <div className={styles.previewImageWrap}>
                    <div className={styles.frameWrap} >
                        <div className={styles.imgWrap}>
                            <img src="/assets/images/chat_screen.png" />
                        </div>
                        <div className={styles.numberWrap}>{qrConfig.phone}</div>
                        <div className={styles.messageWrap}>
                            {qrConfig.text}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* "QR Code Preview" */}
            <Modal
                destroyOnClose
                title="QR Code Preview"
                open={Boolean(showQRPreviewModal)}
                onCancel={() => setShowQRPreviewModal(false)}
                onOk={() => window.open(qrConfig.value, "_blank")}
                styles={{
                    mask: {
                        backdropFilter: 'blur(6px)'
                    }
                }}
                className={styles.modalWrap}
                closeIcon={<AiOutlineClose />}
                width={'max-content'}
                footer={null}
                okText={<div className="d-f-c">Open whatsapp&nbsp; <TbBrandWhatsapp /></div>}
                cancelText="Close"
            >
                <div className={`${styles.previewImageWrap} ${styles.qrpreviewImageWrap}`}>
                    <div className={styles.frameWrap} >
                        <div className={styles.imgWrap}>
                            <img src={qrImage} style={{ borderRadius: qrConfig.borderRadius }} />
                        </div>
                        <div className={styles.messageWrap}
                            style={{ borderColor: token.colorBorder, color: token.colorTextBase, background: token.colorBgLayout }}
                        >
                            <div className={styles.numberWrap} style={{ color: token.colorTextLabel }}>Results after scan</div>
                            {qrConfig.value ? qrConfig.value : "Please add content"}
                        </div>
                        <div className={styles.messageWrap}
                            style={{ borderColor: token.colorBorder, color: token.colorTextBase, background: token.colorBgLayout }}
                        >
                            <div className={styles.numberWrap} style={{ color: token.colorTextLabel }}>Scan this qr code using your phone and check the results</div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default QrCode