import React, { useEffect } from 'react'
import { activeObjectsState } from '../types'
import { fabric } from "fabric";
import { theme, Typography } from 'antd';
import Group from './group';
import Lock, { lockObject } from './lock';
import styles from './objectPropertiesEditor.module.scss'
import CenterAlignment from './centerAlignment';
import Flip from './flip';
import { getCustomObjectType, getObjectType } from '@util/craftBuilderUtils';
import ImageObjectProps from './ImageProps';
import TextObjectProps from './TextProps';
import Saperator from '@atoms/Saperator';
import GroupAlignment from './groupAlignment';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';
import { useAppDispatch } from '@hook/useAppDispatch';
import Angle from './angle';
import Opacity from './opacity';
import Shadow from './shadow';
import Stroke from './stroke';
import ShapesProps from './shapesProps';
import CharactersProps from './charactersProps';
import ThreeD from '../tabsComposer/threeD';
import { BiArrowBack } from 'react-icons/bi';
const { Text } = Typography;

type pageProps = {
    updateLocalCanvas: any
    workspace: fabric.Rect
    canvas: fabric.Canvas,
    activeObjectsState: activeObjectsState
}

function ObjectPropertiesEditor({ updateLocalCanvas, workspace, canvas, activeObjectsState }: pageProps) {
    const dispatch = useAppDispatch()
    const { token } = theme.useToken();
    useEffect(() => {
        if (canvas?.getActiveObject() && activeObjectsState.isSelected && !canvas.getActiveObject().locked) {
            //if all child elements are locked then make parent object locked,
            //need to implememnt this because evry time we select multiple element canvas create new activeObject() (not activeObjects())
            if (activeObjectsState.selectedObject.filter((o) => !o.locked).length == 0) {
                lockObject(canvas.getActiveObject());
                canvas.renderAll();
            }
        }
    }, [activeObjectsState, canvas]);


    return (
        <React.Fragment>
            {activeObjectsState.isSelected && <div className={styles.objectPropertiesEditorWrap}>
                <div className={styles.headingWrap} style={{ background: token.colorBgLayout }}>
                    <div className={`${styles.iconWrap}`} style={{ background: token.colorBgBase, color: token.colorText }} onClick={() => canvas?.discardActiveObject().renderAll()}>
                        <BiArrowBack color={token.colorText} />
                    </div>
                    <div className={styles.title} style={{ color: token.colorTextBase }}>
                        <img src={canvas?.getActiveObject()?.toDataURL()} />
                    </div>
                </div>
                <div className={styles.groupLockWrap}>
                    <Group updateLocalCanvas={updateLocalCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                    <Lock updateLocalCanvas={updateLocalCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                </div>
                {canvas?.getActiveObject()?.locked && <div style={{ marginTop: '10px', textAlign: 'center', color: token.colorErrorActive }}>For editing element need to unlock </div>}
                <Saperator />
                <div className={`${styles.propsWrap} ${canvas?.getActiveObject()?.locked ? 'disabled' : ''}`}>
                    <CenterAlignment updateLocalCanvas={updateLocalCanvas} workspace={workspace} canvas={canvas} activeObjectsState={activeObjectsState} />

                    {activeObjectsState.isMultiple ? <>
                        {activeObjectsState.isMultiple && <GroupAlignment updateLocalCanvas={updateLocalCanvas} workspace={workspace} canvas={canvas} activeObjectsState={activeObjectsState} />}
                        <Saperator />
                    </> : <>
                        {(!activeObjectsState.isGroup &&
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.image &&
                            getCustomObjectType(activeObjectsState.selectedObject[0]) != OBJECT_TYPES.qrCode) &&
                            <div className={styles.imagePropsWrapper}>
                                <>
                                    <ImageObjectProps updateLocalCanvas={updateLocalCanvas} workspace={workspace} canvas={canvas} activeObjectsState={activeObjectsState} />
                                    <Saperator />
                                </>
                            </div>}
                        {(!activeObjectsState.isGroup && getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.text) && <div className={styles.textPropsWrapper}>
                            <>
                                <TextObjectProps updateLocalCanvas={updateLocalCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                                <Saperator />
                            </>
                        </div>}
                        <Saperator />
                        {(getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.rect ||
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.polygon ||
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.circle ||
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.ellipse ||
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.triangle ||
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.path) &&
                            <ShapesProps updateLocalCanvas={updateLocalCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />}

                        {/* {(getCustomObjectType(activeObjectsState?.selectedObject[0]) == OBJECT_TYPES.CharactersProps) && <CharactersProps canvas={canvas} activeObjectsState={activeObjectsState} />} */}
                        <Opacity updateLocalCanvas={updateLocalCanvas} canvas={canvas} />
                        <Saperator />
                        <Angle updateLocalCanvas={updateLocalCanvas} canvas={canvas} />
                        <Saperator />
                        <Stroke updateLocalCanvas={updateLocalCanvas} canvas={canvas} />
                        <Saperator />
                        <Shadow updateLocalCanvas={updateLocalCanvas} canvas={canvas} />
                        <Saperator />
                    </>}
                    <ThreeD updateLocalCanvas={updateLocalCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                    <Saperator />
                    <div className={styles.groupLockWrap}>
                        <Flip updateLocalCanvas={updateLocalCanvas} canvas={canvas} />
                    </div>
                    <Saperator />
                </div>
            </div>}
        </React.Fragment>
    )
}

export default ObjectPropertiesEditor