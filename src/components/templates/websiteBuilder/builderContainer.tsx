'use client'
import { BACKGROUND_TYPES, BUILDER_PAGE } from '@constant/common';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import ComponentRenderer from '@organisms/componentRenderer/index';
import { initialState, updateActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import { ActiveTemplateConfigType, BuilderContextType, getActiveTemplateConfig, getBuilderContext } from "@reduxSlices/siteBuilderState";
import styles from '@templatesCSS/websiteBuilder/builderContainer.module.scss';
import getBackground from '@util/getBackgroundStyle';
import { theme } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment } from 'react';

function BuilderContainer({ builderState }) {
    const dispatch = useAppDispatch();
    const activeTemplateConfig: ActiveTemplateConfigType = useAppSelector(getActiveTemplateConfig);
    const builderContext: BuilderContextType = useAppSelector(getBuilderContext);
    const { token } = theme.useToken();

    const onClickComponent = (event: any, index: any, uid: number) => {
        if (!builderContext.editorMode) return;
        if (uid) dispatch(updateActiveEditorComponent({ id: builderState[Object.keys(builderState)[0]][index]?.id, uid, originalState: builderState[Object.keys(builderState)[0]][index] }))
        else dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
        event.stopPropagation()
    }

    return (
        <React.Fragment>
            {(activeTemplateConfig?.background?.type == BACKGROUND_TYPES.IMAGE) && <style dangerouslySetInnerHTML={{
                __html: `
                #builderBody{
                    position:relative;
                }
                #builderBody:after {
                        content: ' ';
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        opacity:${activeTemplateConfig?.background?.opacity || 1};
                        background:url(${activeTemplateConfig?.background?.src});
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }`
            }}></style>}

            <AnimatePresence>
                {(builderContext.deviceType == "All" ? ["Mobile", "Desktop"] : [builderContext.deviceType]).map((deviceType: string, deviceIndex: number) => {
                    return <React.Fragment key={deviceIndex}>
                        <motion.div className={`${styles.builderDroppableList} ${styles[deviceType]}`}
                            style={{ pointerEvents: builderContext.editorMode ? "unset" : "none" }}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'max-content', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            onClick={(e) => onClickComponent(e, null, null)}>
                            <div className={styles.deviceTypeHeader} style={{
                                background: token.colorBgLayout,
                                color: token.colorPrimary,
                                border: `1px solid ${token.colorBorder}`,
                            }}>
                                <div className={styles.subHeading}
                                    style={{
                                        fontSize: `${(builderContext.state.scale > 0.3 ? 15 + builderContext.state.scale * 10 : 20 + (100 * builderContext.state.scale))}px`,
                                    }}>
                                    {deviceType} Devices
                                </div>
                            </div>
                            {Object.keys(builderState).map((stateId, i) => {
                                return (
                                    <Droppable
                                        isCombineEnabled={true}
                                        key={i}
                                        droppableId={deviceType} >
                                        {(provided, snapshot) => (
                                            <Fragment>
                                                <div className={`builderBody ${styles.bodyFrame} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`}
                                                    ref={provided.innerRef}
                                                    id="builderBody"
                                                    style={{
                                                        ...activeTemplateConfig?.style,
                                                        // height: "auto",
                                                        background: snapshot.isDraggingOver ? token.colorPrimaryBgHover : { ...getBackground(activeTemplateConfig?.background) }
                                                    }}
                                                >
                                                    {Boolean(builderState[stateId].length) && builderState[stateId].map((item, index) => {
                                                        return <Fragment key={index}>
                                                            <Draggable isDragDisabled={!builderContext.editorMode} key={item?.id} draggableId={item?.id} index={index}>
                                                                {(provided: any, snapshot) => {
                                                                    return <React.Fragment>
                                                                        <div className={`${styles.draggComponentWrap} ${snapshot.isDragging ? styles.sortingInProgress : ''}`}
                                                                            {...provided.dragHandleProps}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            style={{
                                                                                ...provided.draggableProps.style,
                                                                                height: "auto",
                                                                                background: snapshot.isDragging ? token.colorBgBase : "inherit",
                                                                                outline: snapshot.isDragging ? `2px solid ${token.colorPrimaryBorder}` : "unset",
                                                                                opacity: snapshot.isDragging ? 0.9 : 1,
                                                                                filter: snapshot.isDragging ? "drop-shadow(5px 5px 10px #000000)" : "unset",
                                                                            }}
                                                                            onClick={(e) => onClickComponent(e, index, item?.uid)}
                                                                        >
                                                                            <ComponentRenderer
                                                                                builderState={builderState}
                                                                                lastChild={builderState[stateId].length - 1 == index}
                                                                                index={index}
                                                                                id={item?.id}
                                                                                uid={item?.uid}
                                                                                currentPage={BUILDER_PAGE}
                                                                                componentConfig={item}
                                                                                deviceType={(builderContext.deviceType == "All" && deviceType == "Mobile") ? 'mobile' : "desktop"}
                                                                            />
                                                                        </div>
                                                                    </React.Fragment>
                                                                }}
                                                            </Draggable>
                                                        </Fragment>
                                                    })}
                                                    <div className={styles.emptyEditorWrap} style={{
                                                        color: token.colorTextBase,
                                                        background: snapshot.isDraggingOver ? token.colorPrimaryBgHover : token.colorBgElevated,
                                                        outlineColor: "unset"
                                                    }}>
                                                        <div style={{
                                                            outlineColor: token.colorBorder,
                                                            fontSize: `${(builderContext.state.scale > 0.3 ? 15 + builderContext.state.scale * 10 : 20 + (100 * builderContext.state.scale))}px`,
                                                        }}>Drop sections here</div>
                                                    </div>
                                                    {provided.placeholder}
                                                </div>
                                            </Fragment>
                                        )}
                                    </Droppable>
                                );
                            })}
                        </motion.div>
                    </React.Fragment>
                })}
            </AnimatePresence>

        </React.Fragment>
    )
}

export default BuilderContainer