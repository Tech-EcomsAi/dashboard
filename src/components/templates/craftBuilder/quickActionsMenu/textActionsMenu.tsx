import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import { activeObjectsState } from '../types';
// import styles from './textActionsMenu.module.scss'
import { theme, Tooltip } from 'antd';
import { TbAlignLeft, TbAlignCenter, TbAlignRight, TbBold, TbItalic, TbUnderline, TbStrikethrough } from 'react-icons/tb';
import { CUSTOME_ATTRIBUTES, textAttributes } from '@constant/craftBuilder';
import { IoTrashSharp, IoDuplicateOutline, IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { v4 as uuid } from 'uuid';
import { IMAGE_EDITOR_PAGE } from '@constant/common';
import FontFamily from '@molecules/styleElement/fontFamily';
import FontSize from '@molecules/styleElement/fontSize';
import ColorPickerComponent from '@molecules/styleElement/colorPicker';


type pageProps = {
    updateActiveObjectCords: any,
    styles: any,
    actionMenuProps: any,
    updateLocalCanvas: any,
    canvas: fabric.Canvas,
    activeObjectsState: activeObjectsState
}

function TextActionsMenu({ updateActiveObjectCords, styles, updateLocalCanvas, canvas, activeObjectsState }: pageProps) {

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
            })
            setInitialPropsGets(true)
            setAttributes(attributesCopy);
        }
    }, [canvas, activeObjectsState])


    const onChange = (property, value) => {
        if (initialPropsGets) {
            const activeObject = canvas.getActiveObject();
            activeObject.set(property, value)
            setAttributes({ ...textAttribute, [property]: value })
            updateLocalCanvas(canvas, 'TextActionsMenu');
        }
    }

    const textStylesList = [
        // { id: 1, value: 'left', action: 'Left', tooltip: "Left Align", icon: <TbAlignLeft />, property: 'textAlign' },
        // { id: 2, value: 'center', action: 'Center', tooltip: "Center Align", icon: <TbAlignCenter />, property: 'textAlign' },
        // { id: 3, value: 'right', action: 'Right', tooltip: "Right Align", icon: <TbAlignRight />, property: 'textAlign' },
        { id: 4, value: 'bold', action: 'Bold', tooltip: "Bold Text", icon: <TbBold />, property: 'fontWeight' },
        { id: 5, value: 'italic', action: 'Italic', tooltip: "Italic Text", icon: <TbItalic />, property: 'fontStyle' },
        { id: 6, value: true, action: 'Underline', tooltip: "Text Underline", icon: <TbUnderline />, property: 'underline' },
        // { id: 7, value: true, action: 'linethrough', tooltip: "Text Linethrough", icon: <TbStrikethrough />, property: 'linethrough' },
        { id: 8, value: 'DELETE', action: 'DELETE', tooltip: 'Delete element', icon: <IoTrashSharp />, property: 'DELETE' },
        { id: 9, value: 'CLONE', action: 'CLONE', tooltip: 'Duplicate element', icon: <IoDuplicateOutline />, property: 'CLONE' },
        { id: 10, value: 'MORE', action: 'MORE', tooltip: 'More Actions', icon: <IoEllipsisHorizontalSharp />, property: 'MORE' },
    ]


    const onClickAction = (event, action) => {
        switch (action.property) {
            case 'textAlign':
                onChange(action.property, action.value)
                break;
            case 'fontWeight':
                onChange(action.property, textAttribute[action.property] == action.value ? 'normal' : action.value);
                break;
            case 'fontStyle':
                onChange(action.property, textAttribute[action.property] == action.value ? 'normal' : action.value);
                break;
            case 'underline':
                onChange(action.property, !textAttribute[action.property]);
                break;
            case 'linethrough':
                onChange(action.property, !textAttribute[action.property]);
                break;
            case 'MORE':
                updateActiveObjectCords(true)
                break;
            case 'DELETE':
                var activeObject = canvas.getActiveObjects();
                if (activeObject) {
                    activeObject.map((item) => canvas.remove(item));
                    canvas.discardActiveObject();
                    canvas.renderAll();
                }
                break;
            case 'CLONE':
                const selectedObject = canvas.getActiveObject();
                if (selectedObject) {
                    selectedObject.clone(function (cloned) {
                        canvas.add(cloned.set({
                            left: cloned.left + 10,
                            top: cloned.top + 10,
                            uid: uuid()
                        }));
                        canvas.setActiveObject(cloned);
                        canvas.renderAll();
                    }, [CUSTOME_ATTRIBUTES.PATTERN_DATA, CUSTOME_ATTRIBUTES.OBJECT_TYPE]);
                }
                break;
            default:
                break;
        }
        event.stopPropagation();
    }


    return (
        <React.Fragment>
            <FontFamily showLabel={false} currentPage={IMAGE_EDITOR_PAGE} value={textAttribute.fontFamily} onChange={onChange} style={{ background: 'unset', color: token.colorTextBase }} />
            <FontSize showLabel={false} value={textAttribute.fontSize} onChange={onChange} style={{ background: 'unset', color: token.colorTextBase }} />
            {initialPropsGets && <ColorPickerComponent
                parentStyles={{ background: 'unset', color: token.colorTextBase }}
                hideTransparency
                hideColorString
                value={{ format: 'hex', color: textAttribute.fill }}
                onChange={(value) => onChange('fill', value.color)}
            />}
            {textStylesList.map((action) => {
                return <div className={styles.action} key={action.id}>
                    <Tooltip title={action.tooltip}>
                        <div className={styles.iconWrap}
                            onMouseEnter={() => setHoverId(action.id)}
                            onMouseLeave={() => setHoverId('')}
                            onClick={(e) => onClickAction(e, action)}
                            style={{
                                backgroundColor: (action.value == textAttribute[action.property] || hoverId == action.id) ? token.colorTextBase : token.colorBgBase,
                                color: (action.value == textAttribute[action.property] || hoverId == action.id) ? token.colorPrimary : token.colorTextBase,
                                borderColor: (action.value == textAttribute[action.property] || hoverId == action.id) ? token.colorTextLightSolid : token.colorBorder
                            }}
                        >
                            {action.icon}
                        </div>
                    </Tooltip>
                </div>
            })}
        </React.Fragment>
    )
}

export default TextActionsMenu