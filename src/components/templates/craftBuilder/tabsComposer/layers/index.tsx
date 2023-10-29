import { Popconfirm, Popover, Segmented, theme, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import styles from './layers.module.scss'
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import { BsLayers, BsLayersHalf } from 'react-icons/bs'
import { getCustomObjectType, getObjectType } from '@util/craftBuilderUtils';
import { RiBringForward, RiBringToFront, RiSendBackward, RiSendToBack, RiDeleteBin6Fill, RiLockFill, RiLockUnlockFill } from 'react-icons/ri'
import { FaClone } from 'react-icons/fa'
import { fabric } from "fabric";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { activeObjectsState } from '@template/craftBuilder/types';
import { v4 as uuid } from 'uuid';
import { workspace } from '@template/craftBuilder';
import { lockObject, unlockObject } from '@template/craftBuilder/objectPropertiesEditor/lock';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';

const TAB_TYPES = {
    ALL_LAYERS: 'All',
    GROUP_LAYERS: 'Group',
}
const SELECTED_OBJECTS_TYPES = {
    SINGLE: 'Single',
    MULTIPLE: 'Multiple',
    GROUP: 'Group',
}

type pageProps = {
    updateLocalCanvas: any
    canvas: fabric.Canvas,
    activeObjectsState: activeObjectsState
}

function Layers({ canvas, updateLocalCanvas, activeObjectsState }: pageProps) {
    const { token } = theme.useToken();
    const [layersList, setLayersList] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState(null)
    const [hoverId, setHoverId] = useState(null)
    const [groupedLayersList, setGroupedLayersList] = useState([])
    const [selectedObjectTypes, setSelectedObjectTypes] = useState(SELECTED_OBJECTS_TYPES.SINGLE);

    const prepareLayersData = () => {
        const objects = canvas.getObjects();
        canvas.preserveObjectStacking = true;
        // setLayersList(canvas.getObjects())
        const layers: any[] = [];
        objects.map((obj) => {
            if ((getCustomObjectType(obj) !== OBJECT_TYPES.workspace) && (getCustomObjectType(obj) !== OBJECT_TYPES.watermark)) {
                layers.push({
                    type: getObjectType(obj),
                    src: obj.toDataURL(),
                    uid: obj.get('uid')
                })
            }
        })
        setLayersList(layers.reverse());
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length) {
            if (activeObjects.length == 1) {
                setSelectedLayer(activeObjects[0].get('uid'))
                setSelectedObjectTypes(SELECTED_OBJECTS_TYPES.SINGLE)
            } else {
                //multiple selected objects
                setSelectedLayer(null);
                setGroupedLayersList([]);
                // setActiveTab(TAB_TYPES.ALL_LAYERS);
                // var gLayers: any[] = [];
                // setSelectedObjectTypes(SELECTED_OBJECTS_TYPES.MULTIPLE)
                // activeObjects.map((obj) => {
                //     gLayers.push({
                //         type: getObjectType(obj),
                //         src: obj.toDataURL(),
                //         uid: obj.get('uid') || uuid()
                //     })
                // })
                // setGroupedLayersList(gLayers.reverse())
            }
        } else {
            setSelectedObjectTypes(SELECTED_OBJECTS_TYPES.SINGLE)
            setSelectedLayer(null);
            setGroupedLayersList([]);
            setActiveTab(TAB_TYPES.ALL_LAYERS);
        }

        console.log("activeObjectsState.isGroup", activeObjectsState.isGroup)
        if (activeObjectsState.isGroup && activeObjects.length) {
            const objects = activeObjects[0].getObjects()
            var gLayers: any[] = [];
            objects.map((obj) => {
                obj.uid = obj.get('uid') || uuid();
                gLayers.push({
                    type: getObjectType(obj),
                    src: obj.toDataURL(),
                    uid: obj.get('uid') || uuid()
                })
            })
            setSelectedObjectTypes(SELECTED_OBJECTS_TYPES.GROUP)
            setGroupedLayersList(gLayers.reverse())
        }
    }
    useEffect(() => {
        if (canvas) {
            prepareLayersData()
        }
    }, [activeObjectsState])

    useEffect(() => {
        const activeObjects = canvas.getActiveObjects();
        (!activeObjectsState.isGroup && selectedLayer && activeObjects.length <= 1) && setGroupedLayersList(layersList.filter((o) => o.uid == selectedLayer).reverse())
    }, [selectedLayer])



    const FILL_TYPE_ITEMS_LIST = [
        { key: TAB_TYPES.ALL_LAYERS, icon: <BsLayers /> },
        { key: TAB_TYPES.GROUP_LAYERS, icon: <BsLayersHalf /> },
    ]

    const getSegmentOptions = () => {
        return FILL_TYPE_ITEMS_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} layers`}>
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
    const [activeTab, setActiveTab] = useState(TAB_TYPES.ALL_LAYERS);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const newPosition = result.destination.index;
        const layerId = result.draggableId;
        moveObjects(layerId, newPosition)
        setTimeout(() => {
            updateLocalCanvas(canvas, `layers:${'handleOnDragEnd'}`)
            prepareLayersData()
        }, 100);
    }


    const cloneSelectedObject = () => {
        const selectedObject = canvas.getActiveObject();
        if (selectedObject) {
            selectedObject.clone(function (cloned) {
                canvas.add(cloned.set({
                    left: cloned.left + 10,
                    top: cloned.top + 10,
                    uid: uuid()
                }));
                console.log(cloned);
                canvas.setActiveObject(cloned);
                canvas.renderAll();
            }, [CUSTOME_ATTRIBUTES.PATTERN_DATA, CUSTOME_ATTRIBUTES.OBJECT_TYPE]);

        }
    };

    const moveObjects = (layerId, newPosition) => {
        if (selectedObjectTypes == SELECTED_OBJECTS_TYPES.GROUP && activeTab == TAB_TYPES.GROUP_LAYERS) {
            if (canvas.getActiveObjects()) {
                const groupObjects = canvas.getActiveObjects()[0].getObjects()
                let objectToReposition = groupObjects.find((item) => item.uid === layerId);
                canvas.getActiveObjects()[0].remove(objectToReposition);
                canvas.getActiveObjects()[0].insertAt(objectToReposition, (groupObjects.length - 1) - newPosition);
            }

        } else if (selectedObjectTypes == SELECTED_OBJECTS_TYPES.MULTIPLE) {
            const activeObjects = canvas.getActiveObjects();
            let objectToReposition = activeObjects.find((item) => item.uid === layerId);
            // const objects = canvas.getObjects();
            canvas.getActiveObject().remove(objectToReposition);
            canvas.getActiveObject().insertAt(objectToReposition, (activeObjects.length - 1) - newPosition);

        } else {
            //  else if (selectedObjectTypes == SELECTED_OBJECTS_TYPES.SINGLE) {
            let objectToReposition = canvas.getObjects().find((item) => item.uid === layerId);
            const objects = canvas.getObjects();
            canvas.remove(objectToReposition);
            canvas.insertAt(objectToReposition, (objects.length - 1) - newPosition);
        }
    }

    const onClickAction = (event: any, action: any, layerId, from, layerIndex, listLength) => {
        let activeObject = canvas.getObjects().find((item) => item.uid === layerId);
        switch (action) {
            case 'UP':
                moveObjects(layerId, layerIndex - 1);
                // moveLayerUp(canvas, activeObject, updateLocalCanvas)
                break;
            case 'DOWN':
                moveObjects(layerId, layerIndex + 1);
                // moveLayerDown(canvas, activeObject, updateLocalCanvas)
                break;
            case 'UPTOP':
                moveObjects(layerId, 0);
                // moveLayerUpTop(canvas, activeObject, updateLocalCanvas)
                break;
            case 'DOWNTOP':
                moveObjects(layerId, listLength - 1);
                // moveLayerDownTop(canvas, activeObject, updateLocalCanvas)
                break;
            case 'LOCK':
                activeObjectsState.selectedObject.map((object) => lockObject(object))
                lockObject(canvas.getActiveObject());
                // updateLocalCanvas(canvas)
                break;
            case 'UNLOCK':
                activeObjectsState.selectedObject.map((object) => unlockObject(object))
                unlockObject(canvas.getActiveObject());
                // updateLocalCanvas(canvas)
                break;
            case 'DELETE':
                if (activeTab == TAB_TYPES.ALL_LAYERS) {
                    const activeObject = canvas.getActiveObjects();
                    if (activeObject) {
                        activeObject.map((item) => canvas.remove(item));
                        canvas.discardActiveObject();
                    }
                }
                break;
            case 'CLONE':
                cloneSelectedObject();
                break;
            default:
                break;
        }
        updateLocalCanvas(canvas, `layers:${action}`)
        prepareLayersData()
        event.stopPropagation();
    }


    const onChangeTab = (tab) => {
        setActiveTab(tab)
        setSelectedLayer(null)
    }

    const onClickLayer = (layerId, from) => {
        setSelectedLayer(layerId)
        if (from == 'LAYERS') {
            const activeObject = canvas.getObjects().find((item) => item.uid === layerId);
            // canvas.discardActiveObject();
            canvas.setActiveObject(activeObject);
            canvas.renderAll();
        }
    }

    const checkForIsLocked = () => {
        if (activeObjectsState.isSelected) {
            if (activeObjectsState.selectedObject.length == 1) {
                return !activeObjectsState.selectedObject[0].hasControls
            } else {
                return (activeObjectsState.selectedObject.filter((o) => o.hasControls).length == 0);
            }
        } else false
    }

    const getLayerActions = (layerIndex, listLength) => {
        let isQrObject = false;
        if (canvas && Boolean(canvas.getActiveObjects())) {
            const qrObject = canvas.getActiveObjects()?.find((i) => getCustomObjectType(i) == OBJECT_TYPES.qrCode);;
            if (qrObject) isQrObject = true;
        }
        return [
            { id: 'UP', name: 'Move Forward', icon: <RiBringForward />, tooltip: 'Move Forward', active: (selectedObjectTypes == SELECTED_OBJECTS_TYPES.SINGLE && layerIndex != 0) },
            { id: 'DOWN', name: 'Move Backword', icon: < RiSendBackward />, tooltip: 'Move Backword', active: (selectedObjectTypes == SELECTED_OBJECTS_TYPES.SINGLE && layerIndex != listLength - 1) },
            { id: 'UPTOP', name: 'Move To Front', icon: <RiBringToFront />, tooltip: 'Move To Front', active: layerIndex != 0 },
            { id: 'DOWNTOP', name: 'Move To Back', icon: <RiSendToBack />, tooltip: 'Move To Back', active: layerIndex != listLength - 1 },
            { id: 'LOCK', name: 'Lock Layer', icon: <RiLockFill />, tooltip: 'Lock Layer', active: (activeTab == TAB_TYPES.ALL_LAYERS && !checkForIsLocked()) },
            { id: 'UNLOCK', name: 'Unlock Layer', icon: <RiLockUnlockFill />, tooltip: 'Unlock Layer', active: (activeTab == TAB_TYPES.ALL_LAYERS && checkForIsLocked()) },
            { id: 'CLONE', name: 'Clone Layer', icon: <FaClone />, tooltip: 'Clone Layer', active: (!isQrObject && activeTab == TAB_TYPES.ALL_LAYERS) },
        ]
    }

    const renderLayerActions = (layerId, from, layerIndex, listLength) => {
        console.log(layerId)
        return <div className={styles.layerActionsWrap}>
            {getLayerActions(layerIndex, listLength).map((action) => {

                return <React.Fragment key={action.id}>
                    {action.active && <Tooltip title={action.tooltip} key={action.id} placement='right'>
                        <div className={`${styles.iconWrap}`}
                            style={{ background: token.colorBgLayout, color: token.colorText }}
                            onClick={(e) => onClickAction(e, action.id, layerId, from, layerIndex, listLength)}>
                            {action.icon}
                        </div>
                    </Tooltip>}
                </React.Fragment>
            })}
            {activeTab == TAB_TYPES.ALL_LAYERS && <Tooltip title="Delete Layer" key={6} placement='right'>
                <Popconfirm
                    title="Delete Layer"
                    description="Are you sure you want to delete this layer?"
                    onConfirm={(e) => onClickAction(e, 'DELETE', layerId, from, layerIndex, listLength)}
                >
                    <div className={`${styles.iconWrap}`}
                        style={{ background: token.colorBgLayout, color: token.colorText }}>
                        <RiDeleteBin6Fill />
                    </div>
                </Popconfirm>
            </Tooltip>}
        </div>
    }

    const renderLayersList = (layersList, from) => {
        return <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable key={layersList} droppableId={'layersList'} >
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} className={`${styles.layersList} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`}
                        style={{ background: snapshot.isDragging ? token.colorBgTextActive : 'unset' }}
                    >
                        {layersList.map((layerDetails, layerIndex) => {
                            return (
                                <Draggable key={layerDetails?.uid} draggableId={layerDetails?.uid} index={layerIndex}>
                                    {(provided, snapshot) => (
                                        <div className={`${styles.layerItemWrap} ${snapshot.isDragging ? styles.sortingInProgress : ''}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={() => onClickLayer(layerDetails?.uid, from)}>
                                            <Popover content={() => renderLayerActions(layerDetails?.uid, from, layerIndex, layersList.length)} placement="left" trigger="click">
                                                <div className={styles.layerDetails}
                                                    onMouseEnter={() => setHoverId(layerDetails?.uid)}
                                                    onMouseLeave={() => setHoverId('')}
                                                    style={{
                                                        backgroundColor: (selectedLayer == layerDetails?.uid || hoverId == layerDetails?.uid) ? token.colorPrimaryBgHover : token.colorBgTextHover,
                                                        borderColor: (selectedLayer == layerDetails?.uid || hoverId == layerDetails?.uid) ? token.colorPrimary : token.colorBgTextHover,
                                                        color: (selectedLayer == layerDetails?.uid || hoverId == layerDetails?.uid) ? token.colorPrimary : token.colorTextBase,
                                                    }}>
                                                    <div className={styles.handler}><RxDragHandleDots2 /></div>
                                                    <div className={styles.layerImg}>
                                                        <img src={layerDetails?.src} />
                                                    </div>
                                                </div>
                                            </Popover>
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    }

    return (
        <div className={styles.layersWrap}>
            <div className={GlobalCss.segmentWrap} >
                {selectedObjectTypes == SELECTED_OBJECTS_TYPES.GROUP && <Segmented
                    className={GlobalCss.largeSegmentWrap}
                    style={{ background: token.colorBgTextActive }}
                    size="middle"
                    block={true}
                    value={activeTab}
                    defaultValue={TAB_TYPES.ALL_LAYERS}
                    onChange={(tab: any) => onChangeTab(tab)}
                    options={getSegmentOptions()}
                />}
            </div>
            <div className={styles.tabContent}>
                {layersList.length != 0 ? <>
                    {activeTab == TAB_TYPES.ALL_LAYERS ? <>
                        {renderLayersList(layersList, 'LAYERS')}
                    </> : <>
                        <div className={styles.objectsListWrap}>
                            {renderLayersList(groupedLayersList, TAB_TYPES.GROUP_LAYERS)}
                        </div>
                    </>}
                </> : <>
                    <div className={styles.notFound}>
                        Elements not added yet
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Layers