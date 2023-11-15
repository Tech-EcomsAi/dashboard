import React, { Fragment } from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd';
import styles from '@templatesCSS/websiteBuilder/builderContainer.module.scss'
import ComponentRenderer from '@organisms/componentRenderer/index';
import { useAppDispatch } from '@hook/useAppDispatch';
import { getActiveEditorComponent, initialState, updateActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import { BACKGROUND_TYPES, BUILDER_PAGE } from '@constant/common';
import { useAppSelector } from '@hook/useAppSelector';
import { getSiteConfig } from '@reduxSlices/siteConfig';
import getBackground from '@util/getBackgroundStyle';
import { theme } from 'antd';
import { _debounce } from '@hook/useDebounce';
import { BuilderContextType, getBuilderContext } from "@reduxSlices/siteBuilderState";

function BuilderContainer({ builderState, activeDeviceType }) {
    const dispatch = useAppDispatch();
    const siteConfig = useAppSelector(getSiteConfig);
    const builderContext: BuilderContextType = useAppSelector(getBuilderContext);
    const { token } = theme.useToken();
    const activeComponent = useAppSelector(getActiveEditorComponent);

    const onClickComponent = (event: any, index: any, uid: number) => {
        if (uid) dispatch(updateActiveEditorComponent({ parentId: builderState[Object.keys(builderState)[0]][index]?.id, uid, originalState: builderState[Object.keys(builderState)[0]][index] }))
        else dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
        event.stopPropagation()
    }
    return (
        <React.Fragment>
            {(siteConfig?.background?.type == BACKGROUND_TYPES.IMAGE) && <style dangerouslySetInnerHTML={{
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
                        opacity:${siteConfig?.background?.opacity || 1};
                        background:url(${siteConfig?.background?.src});
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }`
            }}></style>}

            {(activeDeviceType == "All" ? ["Mobile", "Desktop"] : [activeDeviceType]).map((deviceType: string, deviceIndex: number) => {
                return <React.Fragment key={deviceIndex}>
                    <div className={`${styles.builderDroppableList} ${styles[deviceType]}`} onClick={(e) => onClickComponent(e, null, null)}>
                        <div className={styles.deviceTypeHeader} style={{
                            background: token.colorBgLayout,
                            color: token.colorPrimary,
                            border: `1px solid ${token.colorBorder}`,
                        }}>
                            <div className={styles.subHeading}
                                style={{
                                    fontSize: `${(builderContext.state.scale > 0.3 ? 15 + builderContext.state.scale * 10 : 20 + (100 * builderContext.state.scale))}px`,
                                }}>
                                {deviceType} Devices : {builderContext.state.scale}
                            </div>
                        </div>
                        {Object.keys(builderState).map((list, i) => {
                            return (
                                <Droppable key={list} droppableId={list} >
                                    {(provided, snapshot) => (
                                        <Fragment>
                                            <div className={`builderBody ${styles.bodyFrame} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`}
                                                ref={provided.innerRef}
                                                id="builderBody"
                                                style={{
                                                    ...siteConfig?.style,
                                                    // height: "auto",
                                                    background: snapshot.isDraggingOver ? token.colorPrimaryBgHover : { ...getBackground(siteConfig?.background) }
                                                }}
                                            >
                                                {Boolean(builderState[list].length) && builderState[list].map((item, index) => {
                                                    return <Fragment>
                                                        {/* item.id: {item.id}
                                                        <br />
                                                        snapshot.draggingOverWith: {snapshot.draggingOverWith}
                                                        <br />
                                                        snapshot.draggingFromThisWith: {snapshot.draggingFromThisWith}
                                                        <br /> */}
                                                        {/* {snapshot.isUsingPlaceholder && <div style={{ color: "red", fontSize: "40px" }}>isUsingPlaceholder :Drop items here</div>}
                                                        {snapshot.isDraggingOver && <div style={{ color: "red", fontSize: "40px" }}> isDraggingOver : Drop items here</div>} */}

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
                                                                            lastChild={builderState[list].length - 1 == index}
                                                                            index={index}
                                                                            parentId={item?.id}
                                                                            uid={item?.uid}
                                                                            currentPage={BUILDER_PAGE}
                                                                            componentConfig={item}
                                                                            deviceType={(activeDeviceType == "All" && deviceType == "Mobile") ? 'mobile' : "desktop"}
                                                                        />
                                                                    </div>
                                                                </React.Fragment>
                                                            }}
                                                        </Draggable>
                                                    </Fragment>
                                                })}
                                                <div className={styles.emptyEditorWrap} style={{
                                                    color: token.colorTextBase,
                                                    background: snapshot.isDraggingOver ? token.colorPrimaryBgHover : token.colorFillAlter,
                                                    outlineColor: token.colorBgBase
                                                }}>
                                                    <div>Drop sections here</div>
                                                </div>
                                                {provided.placeholder}
                                            </div>
                                        </Fragment>
                                    )}
                                </Droppable>
                            );
                        })}
                    </div>
                </React.Fragment>
            })}

        </React.Fragment>
    )
}

export default BuilderContainer