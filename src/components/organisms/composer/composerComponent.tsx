'use client'
import React, { useEffect, useState } from 'react';
import styles from '@organismsCSS/composer/composer.module.scss'
import { BACKGROUND_TYPES, BUILDER_PAGE } from '@constant/common';
import { isContainerElement } from '@util/utils';
import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import { getBuilderState } from "@reduxSlices/siteBuilderState";
import { getActiveEditorComponent, updateActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import getBackground from '@util/getBackgroundStyle';
import { theme } from 'antd';
import { getColourValue } from '@util/getColorsValue';

type pageProps = {
    config: any,
    currentPage: string,
    parentId: any
}



function ComposerComponent({ config, currentPage, parentId }: pageProps) {
    const componentConfig = { ...config };
    const { component: ComponentType, props, children } = componentConfig;
    const dispatch = useAppDispatch();
    const builderState = useAppSelector(getBuilderState);
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const { token } = theme.useToken();
    const [hoverId, setHoverId] = useState(null)

    const onClickAction = (event: any, action: string) => {
        if ((Boolean(currentPage == BUILDER_PAGE) && !isContainerElement(componentConfig))) {
            switch (action) {
                case 'EDIT':
                    const parentConfig = builderState[Object.keys(builderState)[0]].find(i => i.id == parentId);
                    dispatch(updateActiveEditorComponent({ parentId: parentId, uid: parentConfig.uid, originalState: parentConfig, childId: componentConfig.uid }))
                    break;
                default:
                    break;
            }
            event.stopPropagation();
        }
    }
    const renerComponent = () => {
        return <React.Fragment>
            {(componentConfig?.background?.type == BACKGROUND_TYPES.IMAGE) && <style dangerouslySetInnerHTML={{
                __html: `
                #${componentConfig.uid}{
                    position:relative;
                }
                #${componentConfig.uid}:after {
                        content: ' ';
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        opacity:${componentConfig?.background?.opacity || 1};
                        background:url(${componentConfig?.background?.src});
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }`
            }}></style>}
            <ComponentType
                onMouseEnter={() => setHoverId(currentPage == BUILDER_PAGE && activeComponent.childId)}
                onMouseLeave={() => setHoverId('')}
                style={{
                    ...componentConfig.style,
                    color: getColourValue(componentConfig?.style?.color),
                    ...getBackground(componentConfig.background),
                    outline: (hoverId && activeComponent.childId == hoverId) ? `2px solid ${token.colorPrimary}` : ""
                }}
                id={componentConfig.uid}
                className={`composerWrap ${styles.composerWrap}  ${(activeComponent.parentId === parentId && activeComponent.childId === componentConfig.uid) ? styles.active : ''} ${currentPage == BUILDER_PAGE ? styles.hoverOutline : ''}`}
                onClick={(e) => onClickAction(e, 'EDIT')}
            >
                {props?.text && props.text}
                {children ? children?.map((childConfig, index) => {
                    return <React.Fragment key={index}>
                        <ComposerComponent config={childConfig} currentPage={currentPage} parentId={parentId} />
                    </React.Fragment>
                }) : null}
            </ComponentType>
        </React.Fragment>
    }

    return (
        <>
            {ComponentType ? <>
                {renerComponent()}
            </> : null}
        </>
    );
}

export default ComposerComponent