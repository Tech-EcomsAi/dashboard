import { BACKGROUND_IMAGES_TYPES, PATTERN_PAGE } from '@constant/common';
import GalleryImages from '@organisms/imagePickerModal/galleryImages';
import { Checkbox, Segmented, Slider, theme, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { BsImages } from 'react-icons/bs';
import styles from '@objectPropertiesEditor/patterns/patterns.module.scss'
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { fabric } from "fabric";
import { activeObjectsState } from '@template/craftBuilder/types';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showToast } from '@reduxSlices/toast';
import { GiThreeLeaves } from 'react-icons/gi';
import { TbIcons } from 'react-icons/tb';
import IconsElements from '@template/craftBuilder/tabsComposer/graphics/iconsElements';
import GraphicsElements from '@template/craftBuilder/tabsComposer/graphics/graphicsElements';
import GraphicsCss from '@template/craftBuilder/tabsComposer/graphics/graphics.module.scss'
import { getCustomObjectType } from '@util/craftBuilderUtils';

type pageProps = {
    activeObject: any,
    updateLocalCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

const TAB_TYPES = {
    GALLERY: 'Gallery',
    ICONS: 'Icons',
    GRAPHICS: 'Graphics',
    UPLOAD: 'Upload',
}

const FILL_PEPEAT_TYPE = {
    REPEAT: 'repeat',
    NOREPEAT: 'no-repeat'
}

const BGImage = ({ activeObject, updateLocalCanvas, canvas, activeObjectsState }: pageProps) => {

    const { token } = theme.useToken();
    const dispatch = useAppDispatch();
    const [selectedImage, setSelectedImage] = useState({ src: '' });
    const [activeTab, setActiveTab] = useState(TAB_TYPES.GALLERY);
    const [objectDimenstions, setObjectDimenstions] = useState({ width: 0, height: 0 })//active object dimensions
    const [initialPropsGets, setInitialPropsGets] = useState(false);

    const [currentPaternData, setCurrentPaternData] = useState({
        patternSourceCanvas: null,
        img: null,
        repeat: FILL_PEPEAT_TYPE.REPEAT,
        src: '',
        fill: '',
        opacity: 1,
        width: 0,
        height: 0,
        padding: 0,
        forceUpdateImage: false,
        forceUpdate: true
    })

    const updateCanvasPatternData = (paternData) => {
        console.log("inside updateCanvasPatternData")
        activeObject.set('patternData', {
            ...paternData,
            [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: `${getCustomObjectType(activeObject) == OBJECT_TYPES.workspace ? OBJECT_TYPES.workspace + '-' + OBJECT_TYPES.pattern : OBJECT_TYPES.pattern}`
        })
        updateLocalCanvas(canvas, 'BGImage updateCanvasPatternData')
        setCurrentPaternData({ ...paternData, forceUpdate: true })
    }

    useEffect(() => {
        if (currentPaternData.forceUpdate) {
            console.log("currentPaternData changes")
            if (activeObjectsState.isSelected && canvas) {
                console.log("activeObjectsState rerender")
                //if fill is set to pattern
                const patternData = activeObject.get('patternData');
                if (activeObject.get('fill') instanceof fabric.Pattern || currentPaternData.forceUpdateImage) {
                    if (activeObject && patternData && patternData.src && patternData?.objectType.includes(OBJECT_TYPES.pattern)) {
                        fabric.Image.fromURL(patternData.src, function (img) {
                            const widthValue = ((activeObject?.getScaledWidth() || 1) / 2)
                            const repeat = patternData.repeat || 'repeat';
                            const padding = patternData.padding || 0;
                            img.scaleToWidth((widthValue) || 0);
                            img.set('opacity', patternData.opacity)
                            //set selected pattern image dimenstions - which is used for image widht adjustment at edit time
                            const imgDimenstions = { width: patternData.width, height: patternData.height, padding: padding }
                            //add image to canvas and set this canvas as pattern
                            var patternSourceCanvas = new fabric.StaticCanvas();
                            patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + padding, height: img.getScaledHeight() + padding });
                            patternSourceCanvas.add(img);
                            patternSourceCanvas.backgroundColor = patternData.fill;
                            patternSourceCanvas.opacity = patternData.opacity;
                            const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: repeat })
                            activeObject?.set('fill', pattern);
                            setCurrentPaternData({ forceUpdate: false, forceUpdateImage: false, patternSourceCanvas, img, repeat: repeat, src: patternData.src, fill: patternData.fill, opacity: patternData.opacity, ...imgDimenstions })
                            setSelectedImage({ src: patternData.src })
                            canvas.requestRenderAll()
                        }, { crossOrigin: 'anonymous' });
                    }
                }
            }
            setInitialPropsGets(true);
            setObjectDimenstions({ width: activeObject.get('width'), height: activeObject.get('height') })
        }
    }, [canvas, currentPaternData])

    const TAB_ITEMS_LIST = [
        {
            key: TAB_TYPES.GALLERY,
            icon: <BsImages />,
            children: <GalleryImages currentPage={PATTERN_PAGE} selectedImage={selectedImage} setSelectedImage={(imageData) => addPatternImage(imageData)} config={{ type: BACKGROUND_IMAGES_TYPES.SQUARE }} />
        },
        // {
        //     key: TAB_TYPES.ICONS,
        //     icon: <TbIcons />,
        //     children: <IconsElements onSelect={(imageData) => addPatternImage(imageData)} canvas={canvas} updateLocalCanvas={updateLocalCanvas} />
        // },
        {
            key: TAB_TYPES.GRAPHICS,
            icon: <GiThreeLeaves />,
            children: <GraphicsElements onSelect={(imageData) => addPatternImage(imageData)} canvas={canvas} updateLocalCanvas={updateLocalCanvas} />
        },
        // {
        //     key: TAB_TYPES.UPLOAD,
        //     icon: <RiImageAddFill />,
        //     children: <UploadImage onUpload={(image) => addPatternImage({ src: image })} />
        // },
    ]

    const getSegmentOptions = () => {
        return TAB_ITEMS_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} Pattern`}>
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

    const onChange = (key: string) => {
        setActiveTab(key)
    };

    const addPatternImage = (image) => {
        // console.log(image)
        setSelectedImage(image)
        const repeatType = currentPaternData.repeat;
        if (activeObject) {
            fabric.Image.fromURL(image.src, function (img) {

                const patternData = activeObject.get("patternData") || {};

                if (activeObject.get('fill') instanceof fabric.Gradient) {
                    patternData.fill = activeObject.get('fill').colorStops[0].color;
                } else if (typeof activeObject.get('fill') === 'string') {
                    patternData.fill = activeObject.get('fill');
                } else {
                    patternData.fill = patternData.fill || '#0000'
                }

                const opacity = patternData.opacity || activeObject.get('opacity') || 1;
                img.set('opacity', opacity)
                img.scaleToWidth(patternData.width || img.width || ((activeObject?.getScaledWidth() || 1) / 2));

                //set selected pattern image dimenstions - which is used for image widht adjustment at edit time
                const imgDimenstions = { width: img.get('width') - 10, height: img.get('height') - 10, padding: 0 }
                //add image to canvas and set this canvas as pattern
                var patternSourceCanvas = new fabric.StaticCanvas();
                patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + patternData.padding, height: img.getScaledHeight() + patternData.padding });
                patternSourceCanvas.add(img);
                //set previous color as background color

                //set patternSource and iamge in active object so that we can use it for other implimentations

                patternSourceCanvas.backgroundColor = patternData.fill;
                patternData.src = image.src;
                const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: repeatType })
                // activeObject.set('fill', pattern);
                updateCanvasPatternData({
                    patternSourceCanvas,
                    img,
                    src: image.src,
                    repeat: repeatType,
                    fill: patternData.fill,
                    opacity, ...imgDimenstions,
                    width: img.getScaledWidth(),
                    height: img.getScaledHeight(),
                    padding: patternData.padding,
                    forceUpdateImage: true
                });
            }, { crossOrigin: 'anonymous' });
        }
    }

    const getPatternDiamensionDiff = (patternValue) => {
        return ((activeObject?.getScaledWidth() / 2) - patternValue) > 0 && ((activeObject?.getScaledWidth() / 2) - patternValue) < 1;
    }

    const fitPatternToElement = () => {
        const widthValue = ((activeObject?.getScaledWidth() || 1) / 2)
        if (getPatternDiamensionDiff(currentPaternData.width)) {
            dispatch(showToast('Image already fits with element'))
        } else onChangePatternWidth(widthValue);
    }

    const onChangePatternWidth = (widthValue) => {
        updateCanvasPatternData({ ...currentPaternData, width: widthValue })
    }

    const onChangePatternOpacity = (opacityValue) => {
        updateCanvasPatternData({ ...currentPaternData, opacity: opacityValue })
    }


    return (
        <div className={`${styles.patternsWrap}`}>
            {initialPropsGets && <>
                {currentPaternData?.src && <>
                    {/* <div className={styles.fillReapeatType}>
                        <Checkbox
                            className={styles.checkboxElement}
                            defaultChecked={getPatternDiamensionDiff(currentPaternData.width)}
                            style={{ color: token.colorTextBase }}
                            checked={getPatternDiamensionDiff(currentPaternData.width)}
                            onChange={fitPatternToElement}>
                            Fit background to element
                        </Checkbox>
                    </div> */}
                    {/* <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ color: token.colorTextBase }}>
                        <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>Background Image Width</div>
                        <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                            <Slider
                                min={10 || objectDimenstions.width}
                                max={activeObject.patternData?.img?.width || currentPaternData.width}
                                className={styles.siderWrap}
                                defaultValue={objectDimenstions.width}
                                style={{ width: '100%' }}
                                railStyle={{ background: token.colorBgSpotlight }}
                                trackStyle={{ background: token.colorBgSpotlight }}
                                onChange={(value) => onChangePatternWidth(value)}
                                value={currentPaternData.width}
                                step={20}
                            />
                        </div>
                    </div> */}
                    <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ color: token.colorTextBase }}>
                        <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>Background Image Opacity</div>
                        <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                            <Slider
                                min={0}
                                max={1}
                                className={styles.siderWrap}
                                defaultValue={currentPaternData.opacity}
                                style={{ width: '100%' }}
                                railStyle={{ background: token.colorBgSpotlight }}
                                trackStyle={{ background: token.colorBgSpotlight }}
                                onChange={(value) => onChangePatternOpacity(value)}
                                value={currentPaternData.opacity}
                                step={0.1}
                            />
                        </div>
                    </div>
                    <div className={styles.currentFill} style={{ background: token.colorBgSpotlight }}>
                        <img src={currentPaternData?.src} />
                    </div>
                </>}

                <div className={GlobalCss.segmentWrap} >
                    <Segmented
                        style={{ background: token.colorBgTextActive }}
                        size="small"
                        block={true}
                        value={activeTab}
                        defaultValue={TAB_TYPES.GALLERY}
                        onChange={(tab: any) => onChange(tab)}
                        options={getSegmentOptions()}
                    />
                </div>
                <div className={GraphicsCss.tabContent}>
                    {TAB_ITEMS_LIST.find((t) => t.key == activeTab).children}
                </div>
            </>}
        </div>
    )
}

export default BGImage