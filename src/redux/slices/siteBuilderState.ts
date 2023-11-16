import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import defaultSiteConfig from "src/data/defaultSiteConfig";
// import { HYDRATE } from "next-redux-wrapper";
// const HYDRATE_ACTION = createAction(HYDRATE)

type ContextStateType = {
    "previousScale": number,
    "scale": number,
    "positionX": number,
    "positionY": number,
}

type DeviceType = "All" | "Mobile" | "Desktop";

export type BuilderContextType = {
    editorMode: boolean,
    state: ContextStateType,
    deviceType: DeviceType
}

export type ActiveTemplateConfigType = {
    id: any,
    version: string,
    name: string,
    createdOn: string,
    modifiedOn: string,
    logo: {
        type: string,
        value: any
    },
    background: {
        type?: string,//Color/Gradient/image
        value?: any,
        opacity?: any,
        src?: any
    },
    colors: any[],
    style: any
    //site ref https://colorhunt.co/palettes/neon
}

export interface BuilderStateType {
    builderState: any;
    builderContext: BuilderContextType;
    activeTemplateConfig: ActiveTemplateConfigType;
}

const initialState: BuilderStateType = {
    builderState: null,
    builderContext: {
        editorMode: true,
        deviceType: "All",
        state: { positionX: 0, positionY: 0, previousScale: 0, scale: 0 }
    },
    activeTemplateConfig: defaultSiteConfig
};

export const builderState = createSlice({
    name: "builderState",
    initialState,
    reducers: {
        updateBuilderState(state, action) {
            state.builderState = action.payload;
        },
        updateBuilderContext(state, action) {
            state.builderContext = action.payload;
        },
        updateActiveTemplateConfig(state, action) {
            state.activeTemplateConfig = action.payload;
        },
    },
});

const { updateBuilderState, updateBuilderContext, updateActiveTemplateConfig } = builderState.actions;

const getBuilderState = (state: AppState) => state.builderState?.builderState || initialState.builderState;
const getBuilderContext = (state: AppState) => state.builderState?.builderContext || initialState.builderContext;
const getActiveTemplateConfig = (state: AppState) => state.builderState?.activeTemplateConfig || initialState.activeTemplateConfig;
export { updateBuilderState, updateBuilderContext, updateActiveTemplateConfig, getBuilderState, getBuilderContext, getActiveTemplateConfig };