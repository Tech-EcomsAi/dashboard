import { createSlice } from "@reduxjs/toolkit";
import { TEMPLATE_TYPE } from "@template/websiteBuilderDashboard/templateConstants";
import defaultSiteConfig from "src/data/defaultSiteConfig";
import { AppState } from "../store";
// import { HYDRATE } from "next-redux-wrapper";
// const HYDRATE_ACTION = createAction(HYDRATE)

export type BuilderContextType = {
    editorMode: boolean,
    state: {
        "previousScale": number,
        "scale": number,
        "positionX": number,
        "positionY": number,
    },
    deviceType: "All" | "Mobile" | "Desktop";
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
    builderContext: BuilderContextType;
    activeTemplate: TEMPLATE_TYPE;
    activeTemplateConfig: ActiveTemplateConfigType;
    builderState: any;
}

const initialState: BuilderStateType = {
    builderContext: {
        editorMode: true,
        deviceType: "All",
        state: { positionX: 0, positionY: 0, previousScale: 0, scale: 0 }
    },
    activeTemplate: null,
    activeTemplateConfig: defaultSiteConfig,
    builderState: { ["default"]: [] },
};

export const builderState = createSlice({
    name: "builderState",
    initialState,
    reducers: {
        updateBuilderContext(state, action) {
            state.builderContext = action.payload;
        },
        updateActiveTemplate(state, action) {
            state.activeTemplate = action.payload;
        },
        updateActiveTemplateConfig(state, action) {
            state.activeTemplateConfig = action.payload;
        },
        updateBuilderState(state, action) {
            state.builderState = action.payload;
        },
    },
});

const { updateBuilderState, updateBuilderContext, updateActiveTemplateConfig, updateActiveTemplate } = builderState.actions;

const getBuilderContext = (state: AppState) => state.builderState?.builderContext || initialState.builderContext;
const getActiveTemplate = (state: AppState) => state.builderState?.activeTemplate || initialState.activeTemplate;
const getActiveTemplateConfig = (state: AppState) => state.builderState?.activeTemplateConfig || initialState.activeTemplateConfig;
const getBuilderState = (state: AppState) => state.builderState?.builderState || initialState.builderState;
export { getActiveTemplate, getActiveTemplateConfig, getBuilderContext, getBuilderState, updateActiveTemplate, updateActiveTemplateConfig, updateBuilderContext, updateBuilderState };

