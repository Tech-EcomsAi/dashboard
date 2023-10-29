import Saperator from '@atoms/Saperator';
import { LOGO, LOGO_TEXT } from '@constant/common';
import { Checkbox, Segmented, theme, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { LuCheck, LuFileSignature } from 'react-icons/lu';
import styles from './watermark.module.scss'
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import { TbSignature } from 'react-icons/tb'
import { fabric } from "fabric";
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';
import { workspace } from '@template/craftBuilder';
import { updateImageTextWatermark, updateLogoWatermark, updateTextWatermark } from './utils';
import { activeObjectsState } from '@template/craftBuilder/types';
import { getCustomObjectType, getObjectType } from '@util/craftBuilderUtils';
import Styles from './styles';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast } from '@reduxSlices/toast';
import { WATERMARKS, WATERMARK_TYPES } from '@constant/watermarks';
import defaultCraftBuilderConfig from 'src/data/defaultCraftBuilderConfig';
import ProUserIcon from '@atoms/proUserIcon';

const TAB_TYPES = {
    TYPE: 'Type',
    STYLE: 'Style',
}

type pageProps = {
    updateLocalCanvas: any
    canvas: fabric.Canvas,
    activeObjectsState: activeObjectsState,
    workspace: fabric.Rect
}

function Watermark({ canvas, updateLocalCanvas, workspace, activeObjectsState }: pageProps) {

    const { token } = theme.useToken();
    const [hoverId, setHoverId] = useState(null);
    const [watermarkProps, setWatermarkProps] = useState({ active: true, type: '', src: LOGO, text: LOGO_TEXT, isInline: false })
    const dispatch = useAppDispatch()

    useEffect(() => {
        const objects = canvas ? canvas.getObjects() : [];
        const props = { active: false, type: '', src: LOGO, text: LOGO_TEXT, isInline: false };
        if (objects.length) {
            const atermarkObjectIndex = objects.findIndex((o) => getCustomObjectType(o) == OBJECT_TYPES.watermark);
            if (atermarkObjectIndex != -1) {
                const watermarkobject = objects[atermarkObjectIndex];
                props.active = watermarkobject.get('visible');
                if (getObjectType(watermarkobject) == OBJECT_TYPES.image) {
                    props.src = watermarkobject.getSrc();
                    props.type = WATERMARK_TYPES.LOGO
                } else if (getObjectType(watermarkobject) == OBJECT_TYPES.text) {
                    props.text = watermarkobject.get('text');
                    props.type = WATERMARK_TYPES.TEXT
                } else {
                    const groupObjects = watermarkobject.getObjects();
                    props.isInline = watermarkobject.get(CUSTOME_ATTRIBUTES.IS_INLINE_WATERMARK);
                    props.type = props.isInline ? WATERMARK_TYPES.INLINE_LOGO_AND_TEXT : WATERMARK_TYPES.LOGO_AND_TEXT;
                    groupObjects.forEach((obj) => {
                        if (getCustomObjectType(obj) == `${OBJECT_TYPES.watermark}-${OBJECT_TYPES.image}`) {
                            props.src = obj.getSrc();
                        } else if (getCustomObjectType(obj) == `${OBJECT_TYPES.watermark}-${OBJECT_TYPES.text}`) {
                            props.text = obj.get('text');
                        }
                    })
                }
            }
        }
        if (!props.type) setActiveTab(TAB_TYPES.TYPE)
        setWatermarkProps({ ...props })
    }, [canvas, activeObjectsState])

    const FILL_TYPE_ITEMS_LIST = [
        { key: TAB_TYPES.TYPE, icon: <TbSignature /> },
        { key: TAB_TYPES.STYLE, icon: <LuFileSignature /> },
    ]

    const getSegmentOptions = () => {
        return FILL_TYPE_ITEMS_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} images`}>
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
    const [activeTab, setActiveTab] = useState(TAB_TYPES.TYPE);

    const onClickType = (type) => {
        if (type.id == watermarkProps.type) return
        const watermarkPropsCopy = { ...watermarkProps };
        watermarkPropsCopy.type = type.id;
        watermarkPropsCopy.isInline = Boolean(type.isInline);
        setWatermarkProps(watermarkPropsCopy);
        //add watermark
        switch (type.id) {
            case WATERMARK_TYPES.LOGO:
                updateLogoWatermark(canvas, updateLocalCanvas, watermarkPropsCopy, workspace)
                break;
            case WATERMARK_TYPES.TEXT:
                updateTextWatermark(canvas, watermarkPropsCopy, workspace)
                break;
            case WATERMARK_TYPES.LOGO_AND_TEXT:
                updateImageTextWatermark(canvas, watermarkPropsCopy, workspace)
                break;
            case WATERMARK_TYPES.INLINE_LOGO_AND_TEXT:
                updateImageTextWatermark(canvas, watermarkPropsCopy, workspace)
                break;
            default:
                break;
        }
        setTimeout(() => updateLocalCanvas(canvas, 'Watermark'), 100);
    }

    const onClickEnableWatermark = (status) => {
        if (defaultCraftBuilderConfig.isPro) {
            setWatermarkProps({ ...watermarkProps, active: status })
            const objects = canvas.getObjects();
            const atermarkObjectIndex = objects.findIndex((o) => getCustomObjectType(o) == OBJECT_TYPES.watermark);
            if (status) {
                if (atermarkObjectIndex != -1) {
                    objects[atermarkObjectIndex].set('visible', true);
                } else {
                    // const watermarkPropsCopy = { ...watermarkProps };
                    // watermarkPropsCopy.type = WATERMARK_TYPES.LOGO_AND_TEXT;
                    // watermarkPropsCopy.active = true;
                    // updateImageTextWatermark(canvas, watermarkPropsCopy, workspace)
                    // setWatermarkProps({ ...watermarkPropsCopy })
                }
            } else {
                (atermarkObjectIndex != -1) && objects[atermarkObjectIndex].set('visible', false);
            }
            updateLocalCanvas(canvas, 'Watermark')
        } else {
            dispatch(showErrorToast('To disable watermark you need to be on pro version'))
        }
    }

    const onSwitchTab = (tab) => {
        if (watermarkProps.type) setActiveTab(tab);
        else {
            setActiveTab(TAB_TYPES.TYPE)
            dispatch(showErrorToast('Please select type first'))
        }
    }

    return (
        <div className={styles.watermarkWrap}>
            <div className={`${styles.toggleWrap}`}>
                <Checkbox
                    disabled={!defaultCraftBuilderConfig.isPro}
                    className={styles.checkboxElement}
                    defaultChecked={!watermarkProps.active}
                    style={{ color: token.colorTextBase }}
                    checked={!watermarkProps.active}
                    onChange={(value) => onClickEnableWatermark(!watermarkProps.active)}>
                    Hide watermark
                </Checkbox>
                <ProUserIcon />
            </div>
            <Saperator />
            <div className={`${GlobalCss.segmentWrap} ${styles.segmentWrap} ${!watermarkProps.active ? 'disabled' : ''}`} >
                <Segmented
                    className={GlobalCss.largeSegmentWrap}
                    style={{ background: token.colorBgTextActive }}
                    size="middle"
                    block={true}
                    value={activeTab}
                    defaultValue={TAB_TYPES.TYPE}
                    onChange={(tab: any) => onSwitchTab(tab)}
                    options={getSegmentOptions()}
                />
            </div>
            <div className={`${styles.typesList} ${!watermarkProps.active ? 'disabled' : ''}`}>

                {activeTab == TAB_TYPES.TYPE ? <>
                    {WATERMARKS.map((type, i) => {
                        return <React.Fragment key={i}>
                            <div className={`${styles.typeDetails} ${styles[watermarkProps.type]}`}
                                onClick={() => onClickType(type)}
                                style={{
                                    borderColor: (watermarkProps.type == type.id || hoverId == type.id) ? token.colorPrimary : token.colorBorder,
                                    background: (watermarkProps.type == type.id || hoverId == type.id) ? token.colorPrimaryBgHover : token.colorBgTextHover
                                }}
                                onMouseEnter={() => setHoverId(type.id)}
                                onMouseLeave={() => setHoverId('')}>
                                {watermarkProps.type == type.id && <div className={GlobalCss.selectedItem} style={{ backgroundColor: token.colorPrimary }}>
                                    <LuCheck />
                                </div>}
                                <div className={styles.title}>{type.title}</div>
                                <div className={styles.watermarkWrap} style={{
                                    flexDirection: type.isInline ? 'row' : 'column',
                                    // background: token.colorBgTextHover
                                }} >
                                    {type.showImg && <div className={styles.imageWrap}><img src={watermarkProps.src} /></div>}
                                    {type.showText && <div className={styles.textWrap}>{watermarkProps.text}</div>}
                                </div>
                            </div>
                        </React.Fragment>
                    })}
                </> : <>
                    <div className={`${styles.stylesWrap} ${defaultCraftBuilderConfig.isPro ? '' : 'disabled'}`}>
                        <Styles setWatermarkProps={setWatermarkProps} watermarkProps={watermarkProps} canvas={canvas} updateLocalCanvas={updateLocalCanvas} />
                    </div>
                    {!defaultCraftBuilderConfig.isPro && <div className={styles.styllesProCheck}>
                        Acailable For Pro
                        <ProUserIcon />
                    </div>}
                </>}
            </div>
            <Saperator />
        </div>
    )
}

export default Watermark