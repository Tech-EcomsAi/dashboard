import React, { useEffect, useState } from 'react'
import { activeObjectsState } from '../../types'
import { fabric } from "fabric";
import styles from '@objectPropertiesEditor/objectPropertiesEditor.module.scss';
import { Button, Space, Switch, theme } from 'antd';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import FontFamily from '@molecules/styleElement/fontFamily';
import FontSize from '@molecules/styleElement/fontSize';
import { TbAlignCenter, TbAlignLeft, TbAlignRight, TbBold, TbUnderline, TbItalic, TbStrikethrough } from 'react-icons/tb';
import LetterSpacing from '@molecules/styleElement/letterSpacing';
import LineHeight from '@molecules/styleElement/lineHeight';
import ColorPickerComponent from '@molecules/styleElement/colorPicker';
import Saperator from '@atoms/Saperator';
import { letterSpacingList, lineHeightsList, textAttributes } from '@constant/craftBuilder';
import { IMAGE_EDITOR_PAGE } from '@constant/common';
import Patterns from '../patterns';


type pageProps = {
    updateLocalCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

function StylesProps({ updateLocalCanvas, canvas, activeObjectsState }: pageProps) {
    const { token } = theme.useToken();
    const [textAttribute, setAttributes] = useState<any>(textAttributes);
    const [initialPropsGets, setInitialPropsGets] = useState(false);
    const [hoverId, setHoverId] = useState<any>('');

    useEffect(() => {
        const activeObject = canvas?.getActiveObjects()[0];
        if (activeObject) {
            const attributesCopy = { ...textAttribute };
            Object.keys(attributesCopy).map((type) => {
                attributesCopy[type] = activeObject.get(type);
                // if (type == 'fill') {
                //     if (typeof attributesCopy[type] == 'object') setIsFillColor(false)
                // }
            })
            setInitialPropsGets(true)
            setAttributes(attributesCopy);
        }
    }, [canvas, activeObjectsState])

    const textStylesList = [
        { value: 'left', label: 'Left', icon: <TbAlignLeft />, property: 'textAlign' },
        { value: 'center', label: 'Center', icon: <TbAlignCenter />, property: 'textAlign' },
        { value: 'right', label: 'Right', icon: <TbAlignRight />, property: 'textAlign' },
        { value: 'bold', label: 'Bold', icon: <TbBold />, property: 'fontWeight' },
        { value: 'italic', label: 'Italic', icon: <TbItalic />, property: 'fontStyle' },
        { value: true, label: 'Underline', icon: <TbUnderline />, property: 'underline' },
        { value: true, label: 'linethrough', icon: <TbStrikethrough />, property: 'linethrough' },
    ]

    const onChange = (property, value) => {
        const activeObject = canvas.getActiveObject();
        activeObject.set(property, value)
        setAttributes({ ...textAttribute, [property]: value })
        updateLocalCanvas(canvas, `StylesProps: ${property}`);
    }

    const onClickAction = (style) => {
        switch (style.property) {
            case 'textAlign':
                onChange(style.property, style.value)
                break;
            case 'fontWeight':
                onChange(style.property, textAttribute[style.property] == style.value ? 'normal' : style.value);
                break;
            case 'fontStyle':
                onChange(style.property, textAttribute[style.property] == style.value ? 'normal' : style.value);
                break;
            case 'underline':
                onChange(style.property, !textAttribute[style.property]);
                break;
            case 'linethrough':
                onChange(style.property, !textAttribute[style.property]);
                break;
            default:
                break;
        }
    }

    const getWidthOfCharSpacing = (value) => {
        return ((value && textAttribute.fontSize) ? (textAttribute.fontSize * Number(value)) : 0).toFixed();
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.textStylesWrap}`}>
            <div className={`${styleElementCSS.elementWrap}`}>
                <div className={styles.propertyWrapper}>
                    <FontFamily currentPage={IMAGE_EDITOR_PAGE} value={textAttribute.fontFamily} onChange={onChange} style={{ background: 'unset', color: token.colorTextBase }} />
                    <FontSize value={textAttribute.fontSize} onChange={onChange} style={{ background: 'unset', color: token.colorTextBase }} />
                </div>
                <Saperator />

                <div className={`${styleElementCSS.label} ${styles.label}`}>Text Styles</div>
                <div className={styles.propertyWrapper}>
                    {textStylesList.map((style, i) => {
                        return <React.Fragment key={i}>
                            <div className={styles.iconWrap}
                                onClick={() => onClickAction(style)}
                                onMouseEnter={() => setHoverId(style.value)}
                                onMouseLeave={() => setHoverId('')}
                                style={{
                                    backgroundColor: style.value == textAttribute[style.property] ? token.colorPrimary : token.colorBgBase,
                                    border: '1px solid #dee1ec',
                                    borderColor: (style.value == textAttribute[style.property] || hoverId == style.value) ? token.colorPrimary : token.colorBgLayout,
                                    color: style.value == textAttribute[style.property] ? token.colorBgBase : 'inherit'
                                }}>
                                {style.icon}
                            </div>
                        </React.Fragment>
                    })}
                </div>
                <Saperator />
                {canvas?.getActiveObject() && <Patterns canvas={canvas} updateLocalCanvas={updateLocalCanvas} activeObjectsState={activeObjectsState} activeObject={canvas?.getActiveObject()} />}
                <Saperator />
                <div className={styles.propertyWrapper}>
                    <LetterSpacing
                        optionsList={letterSpacingList}
                        value={(textAttribute.charSpacing / textAttribute.fontSize)}
                        onChange={(property, value) => onChange('charSpacing', getWidthOfCharSpacing(value))}
                        style={{ background: 'unset', color: token.colorTextBase }} />
                    <LineHeight
                        optionsList={lineHeightsList}
                        value={textAttribute.lineHeight}
                        onChange={(property, value) => onChange('lineHeight', value ? Number(value.split('px')[0]) : 0)}
                        style={{ background: 'unset', color: token.colorTextBase }} />
                </div>
                <Saperator />

                {activeObjectsState.isSelected && initialPropsGets && <>
                    <ColorPickerComponent
                        parentStyles={{ background: 'unset', color: token.colorTextBase }}
                        // hideColorString
                        value={{ format: 'hex', color: textAttribute.textBackgroundColor }}
                        onChange={(value) => onChange('textBackgroundColor', value.color)}
                        label="Text Background Color" />
                </>}
            </div>
        </div>
    )
}

export default StylesProps