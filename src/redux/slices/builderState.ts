import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
// import { HYDRATE } from "next-redux-wrapper";
// const HYDRATE_ACTION = createAction(HYDRATE)

export interface BuilderState {
    builderState: any;
}

const initialState: BuilderState = {
    builderState: null,
};

export const builderState = createSlice({
    name: "builderState",
    initialState,
    reducers: {
        updateBuilderState(state, action) {
            state.builderState = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(HYDRATE_ACTION, (state, action: any) => {
    //             return {
    //                 ...state,
    //                 ...action.payload.builderState,
    //             };
    //         })
    // },
});

export const { updateBuilderState } = builderState.actions;

export const getBuilderState = (state: AppState) => state.builderState?.builderState;