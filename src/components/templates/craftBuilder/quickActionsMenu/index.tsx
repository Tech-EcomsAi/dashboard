import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import { activeObjectsState } from '../types';
import styles from './quickActionsMenu.module.scss'
import { theme, Tooltip } from 'antd';
import { TbAlignLeft, TbAlignCenter, TbAlignRight, TbBold, TbItalic, TbUnderline, TbStrikethrough } from 'react-icons/tb';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES, textAttributes } from '@constant/craftBuilder';
import { IoTrashSharp, IoDuplicateOutline, IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { v4 as uuid } from 'uuid';
import { FaClone } from 'react-icons/fa';
import { RiBringForward, RiSendBackward, RiBringToFront, RiSendToBack, RiLockFill, RiLockUnlockFill } from 'react-icons/ri';
import { lockObject, unlockObject } from '../objectPropertiesEditor/lock';
import { moveLayerUp, moveLayerDown, moveLayerUpTop, moveLayerDownTop } from '../tabsComposer/layers/layersActions';
import TextActionsMenu from './textActionsMenu';
import { getCustomObjectType } from '@util/craftBuilderUtils';


type pageProps = {
    updateActiveObjectCords: any,
    actionMenuProps: any,
    updateLocalCanvas: any,
    canvas: fabric.Canvas,
    activeObjectsState: activeObjectsState
}

function QuickActionsMenu({ updateActiveObjectCords, actionMenuProps, updateLocalCanvas, canvas, activeObjectsState }: pageProps) {

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
        const activeObject = canvas.getActiveObject();
        activeObject.set(property, value)
        setAttributes({ ...textAttribute, [property]: value })
        updateLocalCanvas(canvas);
    }

    const MENU_ACTIONS = [
        { id: 1, action: 'DELETE', tooltip: 'Delete element', icon: <IoTrashSharp /> },
        { id: 2, action: 'CLONE', tooltip: 'Duplicate element', icon: <IoDuplicateOutline /> },
        { id: 3, action: 'MORE', tooltip: 'More Actions', icon: <IoEllipsisHorizontalSharp /> },
    ]


    const cloneSelectedObject = () => {
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
    };

    const onClickContextMenuAction = (event: any, action: any) => {
        switch (action) {
            case 'UP':
                moveLayerUp(canvas, actionMenuProps.activeObject, updateLocalCanvas)
                break;
            case 'DOWN':
                moveLayerDown(canvas, actionMenuProps.activeObject, updateLocalCanvas)
                break;
            case 'UPTOP':
                moveLayerUpTop(canvas, actionMenuProps.activeObject, updateLocalCanvas)
                break;
            case 'DOWNTOP':
                moveLayerDownTop(canvas, actionMenuProps.activeObject, updateLocalCanvas)
                break;
            case 'LOCK':
                activeObjectsState.selectedObject.map((object) => lockObject(object))
                lockObject(canvas.getActiveObject());
                // updateLocalCanvas(canvas)
                updateLocalCanvas(canvas, 'context menu action :LOCK')
                break;
            case 'UNLOCK':
                activeObjectsState.selectedObject.map((object) => unlockObject(object))
                unlockObject(canvas.getActiveObject());
                // updateLocalCanvas(canvas)
                updateLocalCanvas(canvas, 'context menu action :UNLOCK')
                break;
            case 'DELETE':
                const activeObject = canvas.getActiveObjects();
                if (activeObject) {
                    activeObject.map((item) => canvas.remove(item));
                    canvas.discardActiveObject();
                    updateLocalCanvas(canvas, 'context menu action :DELETE')
                }
                break;
            case 'CLONE':
                cloneSelectedObject();
                break;
            default:
                break;
        }
        event.stopPropagation();
    }

    const onClickAction = (event, action) => {
        switch (action) {
            case 'MORE':
                updateActiveObjectCords(true)
                break;
            case 'DELETE':
                onClickContextMenuAction(event, action)
                break;
            case 'CLONE':
                onClickContextMenuAction(event, action)
                break;
            default:
                break;
        }
        event.stopPropagation();
    }


    const checkForIsLocked = () => {
        if (actionMenuProps.active) {
            return !actionMenuProps.activeObject.hasControls
        } else false
    }

    const getLayerActions = () => {
        return [
            { id: 'UP', action: 'UP', name: 'Move Forward', icon: <RiBringForward />, tooltip: 'Move Forward', active: true },
            { id: 'DOWN', action: 'DOWN', name: 'Move Backword', icon: < RiSendBackward />, tooltip: 'Move Backword', active: true },
            { id: 'UPTOP', action: 'UPTOP', name: 'Move To Front', icon: <RiBringToFront />, tooltip: 'Move To Front', active: true },
            { id: 'DOWNTOP', action: 'DOWNTOP', name: 'Move To Back', icon: <RiSendToBack />, tooltip: 'Move To Back', active: true },
            { id: 'LOCK', action: 'LOCK', name: 'Lock Layer', icon: <RiLockFill />, tooltip: 'Lock Layer', active: !checkForIsLocked() },
            { id: 'UNLOCK', action: 'UNLOCK', name: 'Unlock Layer', icon: <RiLockUnlockFill />, tooltip: 'Unlock Layer', active: checkForIsLocked() },
        ]
    }

    return (
        <React.Fragment>
            <div className={`${styles.quickActionsMenuWrap} ${actionMenuProps.type == OBJECT_TYPES.text ? styles.textActionsMenuWrap : ''}`}
                id="quickActionsMenuWrap"
                style={{
                    background: token.colorBgBase,
                    top: actionMenuProps.top,
                    left: actionMenuProps.left,
                    display: actionMenuProps.active ? 'flex' : 'none',
                }}>
                {actionMenuProps.type == OBJECT_TYPES.text ? <>
                    <TextActionsMenu
                        updateActiveObjectCords={updateActiveObjectCords}
                        styles={styles}
                        actionMenuProps={actionMenuProps}
                        updateLocalCanvas={updateLocalCanvas}
                        canvas={canvas}
                        activeObjectsState={activeObjectsState} />
                </> : <>
                    <React.Fragment>
                        {MENU_ACTIONS.map((action) => {
                            if (action.action == 'CLONE' && canvas && Boolean(canvas.getActiveObjects())) {
                                const qrObject = canvas.getActiveObjects()?.find((i) => getCustomObjectType(i) == OBJECT_TYPES.qrCode);;
                                if (qrObject) {
                                    return null
                                }
                            }
                            return <div className={styles.action} key={action.id}>
                                <Tooltip title={action.tooltip}>
                                    <div className={styles.iconWrap}
                                        onMouseEnter={() => setHoverId(action.id)}
                                        onMouseLeave={() => setHoverId('')}
                                        onClick={(e) => onClickAction(e, action.action)}
                                        style={{
                                            backgroundColor: ((action.action == 'MORE' && actionMenuProps.showContextMenu) || hoverId == action.id) ? token.colorPrimary : token.colorBgTextHover,
                                            color: ((action.action == 'MORE' && actionMenuProps.showContextMenu) || hoverId == action.id) ? token.colorBgBase : token.colorTextBase,
                                            borderColor: ((action.action == 'MORE' && actionMenuProps.showContextMenu) || hoverId == action.id) ? token.colorBgTextHover : token.colorBorder
                                        }}
                                    >
                                        {action.icon}
                                    </div>
                                </Tooltip>
                            </div>
                        })}
                    </React.Fragment>
                </>}
                {/* <div style={{ boxShadow: `0 -20px 0 0 ${token.colorBgBase}` }} className={styles.before}></div> */}
                <div style={{ boxShadow: `0 -20px 0 0 ${token.colorBgBase}`, background: token.colorBgBase }} className={styles.after}></div>
            </div>
            <div className={styles.contextMenuWrap}
                id="contextMenuWrap"
                style={{
                    background: token.colorBgBase,
                    top: actionMenuProps.contextMenuTop,
                    left: actionMenuProps.contextMenuLeft,
                    display: (actionMenuProps.active && actionMenuProps.showContextMenu) ? 'flex' : 'none',
                }}>
                <React.Fragment>
                    {(getLayerActions().filter(o => o.active)).map((action) => {
                        return <div className={styles.action} key={action.id}
                            onMouseEnter={() => setHoverId(action.id)}
                            onMouseLeave={() => setHoverId('')}
                            onClick={(e) => onClickContextMenuAction(e, action.action)}
                            style={{
                                backgroundColor: ((action.action == 'MORE' && actionMenuProps.showContextMenu) || hoverId == action.id) ? token.colorPrimaryHover : token.colorBgBase,
                                color: ((action.action == 'MORE' && actionMenuProps.showContextMenu) || hoverId == action.id) ? token.colorBgBase : token.colorTextBase,
                                borderColor: ((action.action == 'MORE' && actionMenuProps.showContextMenu) || hoverId == action.id) ? token.colorPrimaryHover : token.colorBorder
                            }}
                        >
                            <span>
                                <div className={styles.iconWrap}
                                    style={{
                                        backgroundColor: ((action.action == 'MORE' && actionMenuProps.showContextMenu) || hoverId == action.id) ? token.colorPrimary : token.colorBgBase,
                                        color: ((action.action == 'MORE' && actionMenuProps.showContextMenu) || hoverId == action.id) ? token.colorBgBase : token.colorTextBase,
                                        borderColor: ((action.action == 'MORE' && actionMenuProps.showContextMenu) || hoverId == action.id) ? token.colorTextLightSolid : token.colorBorder
                                    }}
                                >
                                    {action.icon}
                                </div>
                                <div className={styles.title}>
                                    {action.name}
                                </div>
                            </span>
                        </div>
                    })}
                </React.Fragment>
                <div style={{ boxShadow: `0 -20px 0 0 ${token.colorBgBase}` }} className={styles.before}></div>
                <div style={{ boxShadow: `0 -20px 0 0 ${token.colorBgBase}` }} className={styles.after}></div>
            </div>
        </React.Fragment>
    )
}

export default QuickActionsMenu