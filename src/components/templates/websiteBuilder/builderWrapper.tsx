import React, { useEffect, useRef, useState } from "react";
import styles from '@templatesCSS/websiteBuilder/builderWrapper.module.scss'
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef, useTransformEffect } from "react-zoom-pan-pinch";
import BuilderContainer from "./builderContainer";
import { theme } from "antd";
import BuilderComponentControls from "./builderComponentControls";
import { useAppSelector } from "@hook/useAppSelector";
import { _debounce } from "@hook/useDebounce";
import { isSameObjects, removeObjRef } from "@util/utils";
import { useAppDispatch } from "@hook/useAppDispatch";
import { BuilderContextType, getBuilderContext, updateBuilderContext } from "@reduxSlices/siteBuilderState";

const BuilderWrapper = ({ builderState }) => {
    const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
    const builderContext: BuilderContextType = useAppSelector(getBuilderContext);

    return (
        <TransformWrapper
            initialScale={0.5}
            initialPositionX={0}
            initialPositionY={0}
            panning={{
                excluded: builderContext.editorMode ? ["builderBody", "componentContentWrap", "composerWrap", "componentRenderer", "dragDropHandle"] : ["dragDropHandle"]
            }}
            // wheel={{
            //     activationKeys: ["Meta", "Control"], //["Shift", "Control", "Alt", "Meta"(e.g.Command on Mac), "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "End", "Home", "PageDown", "PageUp"]
            //     // wheelDisabled: true
            //     touchPadDisabled: true
            // }}
            // centerOnInit={true}
            ref={transformComponentRef}
            // disabled={builderContext?.editorMode}
            minScale={0.2}//Bounding position which will limit the scale to given value
            // disablePadding={false}//Used to disable panning, zooming boundary padding effect. By enabling this option, you will not be able to zoom outside the image area
            centerZoomedOut={true}//When the zoom goes under the 1 value, the library will keep the content component always in the center. Setting it to false will allow to move the scaled element.
        >
            <TransformComponentWrapper builderState={builderState} />
        </TransformWrapper>
    );
};

export default BuilderWrapper;

function TransformComponentWrapper({ builderState }) {
    const { token } = theme.useToken();
    const dispatch = useAppDispatch();
    const builderContext: BuilderContextType = useAppSelector(getBuilderContext);
    const [updatedScale, setUpdatedScale] = useState(builderContext.state.scale);

    const updateContext = (event: any) => {
        const newSate = removeObjRef(event.state);
        setUpdatedScale(event.state.scale)
        if (!isSameObjects(newSate, builderContext.state)) {
            console.log("newSate", newSate.scale)
            // console.log("newSate newScale", `${(newSate.scale > 0.5 ? newSate.scale * 100 : 10 * newSate.scale) * 10}px`)
            dispatch(updateBuilderContext({ ...builderContext, state: newSate }))
        }
    }
    const debouncedContextStateData = _debounce(updateContext, 100);
    useTransformEffect(debouncedContextStateData)

    return (

        <React.Fragment>
            <TransformComponent wrapperClass={styles.builderWrapper}
                wrapperStyle={{
                    "height": 'calc(100vh - 50px)',
                    "width": '100%',
                    "backgroundImage": `radial-gradient(circle at 10px 10px,${token.colorTextPlaceholder} 1px,transparent 0)`,
                    "backgroundSize": `${updatedScale * 50}px ${updatedScale * 50}px`,
                    "cursor": "grab"
                }}
                contentStyle={{
                    flexWrap: "nowrap",
                    gap: '70px',
                    padding: "200px"
                }}
            >
                <BuilderContainer builderState={builderState} />
            </TransformComponent>
            <BuilderComponentControls />
        </React.Fragment>
    )
}