import React, { useEffect, useState } from 'react'
import { activeObjectsState } from '../types'
import { fabric } from "fabric";
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import styles from './objectPropertiesEditor.module.scss';
import { Segmented, theme, Tooltip } from 'antd';
import { TbAlignCenter, TbAlignLeft, TbAlignRight, TbBold, TbUnderline, TbItalic } from 'react-icons/tb';
import { groupAlignments } from '@constant/craftBuilder';
import { LuAlignStartVertical, LuAlignVerticalJustifyCenter, LuAlignEndVertical, LuAlignCenter, LuAlignStartHorizontal, LuAlignHorizontalJustifyCenter, LuAlignEndHorizontal } from 'react-icons/lu'
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast } from '@reduxSlices/toast';
import TextElement from '@antdComponent/textElement';

const alignments = [
    { id: groupAlignments.left, name: groupAlignments.left, icon: <LuAlignStartVertical />, tooltip: 'Left align to outer element' },
    { id: groupAlignments.centerX, name: groupAlignments.centerX, icon: <LuAlignVerticalJustifyCenter />, tooltip: 'Horizontally align to outer element' },
    { id: groupAlignments.right, name: groupAlignments.right, icon: <LuAlignEndVertical />, tooltip: 'Right align to outer element' },
    { id: groupAlignments.center, name: groupAlignments.center, icon: <LuAlignCenter />, tooltip: 'Center align to outer element' },
    { id: groupAlignments.top, name: groupAlignments.top, icon: <LuAlignStartHorizontal />, tooltip: 'Top align to outer element' },
    { id: groupAlignments.centerY, name: groupAlignments.centerY, icon: <LuAlignHorizontalJustifyCenter />, tooltip: 'Vertically align to outer element' },
    { id: groupAlignments.bottom, name: groupAlignments.bottom, icon: <LuAlignEndHorizontal />, tooltip: 'Bottom align to outer element' },
]

type pageProps = {
    updateLocalCanvas: any,
    workspace: fabric.Rect,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}


function GroupAlignment({ updateLocalCanvas, workspace, canvas, activeObjectsState }: pageProps) {
    const { token } = theme.useToken();
    const [activeObject, setActiveObject] = useState(canvas.getActiveObject());
    const dispatch = useAppDispatch();
    const [hoverId, setHoverId] = useState('');

    useEffect(() => {
        canvas && setActiveObject(canvas.getActiveObject())
    }, [canvas, activeObjectsState])


    const [activeAlignment, setActiveAlignment] = useState({ name: '' })

    // align left
    const left = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'activeSelection') {
            const activeSelection = activeObject;
            const activeObjectLeft = -(activeObject.width / 2);
            activeSelection.forEachObject((item) => {
                item.set({
                    left: activeObjectLeft,
                });
                item.setCoords();
                updateLocalCanvas(canvas, 'GroupAlignment');
            });
        }
    };
    // align right
    const right = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'activeSelection') {
            const activeSelection = activeObject;
            const activeObjectLeft = activeObject.width / 2;
            activeSelection.forEachObject((item) => {
                item.set({
                    left: activeObjectLeft - item.width * item.scaleX,
                });
                item.setCoords();
                updateLocalCanvas(canvas, 'GroupAlignment');
            });
        }
    };
    // horizontal center alignment
    const centerX = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'activeSelection') {
            const activeSelection = activeObject;
            activeSelection.forEachObject((item) => {
                item.set({
                    left: 0 - (item.width * item.scaleX) / 2,
                });
                item.setCoords();
                updateLocalCanvas(canvas, 'GroupAlignment');
            });
        }
    };

    // align top
    const top = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'activeSelection') {
            const activeSelection = activeObject;
            const activeObjectTop = -(activeObject.height / 2);
            activeSelection.forEachObject((item) => {
                item.set({
                    top: activeObjectTop,
                });
                item.setCoords();
                updateLocalCanvas(canvas, 'GroupAlignment');
            });
        }
    };
    // align bottom
    const bottom = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'activeSelection') {
            const activeSelection = activeObject;
            const activeObjectTop = activeObject.height / 2;
            activeSelection.forEachObject((item) => {
                item.set({
                    top: activeObjectTop - item.height * item.scaleY,
                });
                item.setCoords();
                updateLocalCanvas(canvas, 'GroupAlignment');
            });
        }
    };
    // vertical center alignment
    const centerY = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'activeSelection') {
            const activeSelection = activeObject;
            activeSelection.forEachObject((item) => {
                item.set({
                    top: 0 - (item.height * item.scaleY) / 2,
                });
                item.setCoords();
                updateLocalCanvas(canvas, 'GroupAlignment');
            });
        }
    };
    const onClickPosition = (position) => {
        if (!activeObject.locked) {
            setActiveAlignment(position);
            switch (position.name) {
                case groupAlignments.left: left(); break;
                case groupAlignments.centerX: centerX(); break;
                case groupAlignments.right: right(); break;
                case groupAlignments.top: top(); break;
                case groupAlignments.centerY: centerY(); break;
                case groupAlignments.bottom: bottom(); break;
                case groupAlignments.center: centerX(); centerY(); break;
            }
        } else {
            dispatch(showErrorToast('Element is locked 🔒'))
        }
    }
    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.alignmentWrap}`}>
            <TextElement text={"Group Element Alignment"} color={token.colorTextBase} />
            <div className={`${styleElementCSS.elementWrap} ${styles.alignmentWrapper}`}>
                {alignments.map((position, i) => {
                    return <React.Fragment key={position.name}>
                        <Tooltip title={position.tooltip}>
                            <div className={styles.iconWrap} onClick={() => onClickPosition(position)}
                                onMouseEnter={() => setHoverId(position.name)}
                                onMouseLeave={() => setHoverId('')}
                                style={{
                                    backgroundColor: activeAlignment.name == position.name ? token.colorPrimary : token.colorBgBase,
                                    border: '1px solid #dee1ec',
                                    borderColor: (activeAlignment.name == position.name || hoverId == position.name) ? token.colorPrimary : token.colorBgLayout,
                                    color: activeAlignment.name == position.name ? token.colorBgBase : 'inherit'
                                }}>
                                {position.icon}
                            </div>
                        </Tooltip>
                    </React.Fragment>
                })}
            </div>
        </div>
    )
}

export default GroupAlignment