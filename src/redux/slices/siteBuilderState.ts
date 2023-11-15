import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
// import { HYDRATE } from "next-redux-wrapper";
// const HYDRATE_ACTION = createAction(HYDRATE)

type ContextStateType = {
    "previousScale": number,
    "scale": number,
    "positionX": number,
    "positionY": number,
}

export type BuilderContextType = {
    editorMode: boolean,
    state: ContextStateType
}

export interface BuilderState {
    builderState: any;
    builderContext: BuilderContextType;
}

const initialState: BuilderState = {
    builderState: null,
    builderContext: {
        editorMode: true,
        state: { positionX: 0, positionY: 0, previousScale: 0, scale: 0 }
    }
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
    },
});

export const { updateBuilderState } = builderState.actions;
export const { updateBuilderContext } = builderState.actions;

export const getBuilderState = (state: AppState) => state.builderState?.builderState || initialState.builderState;
export const getBuilderContext = (state: AppState) => state.builderState?.builderContext || initialState.builderContext;