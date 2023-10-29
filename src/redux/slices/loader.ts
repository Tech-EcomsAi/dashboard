import { AppState } from "@reduxStore/index";
import { createAction, createSlice } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";
// const HYDRATE_ACTION = createAction(HYDRATE)

export interface Loader {
    loader: any;
}

const initialState: Loader = {
    loader: null,
};

export const loader = createSlice({
    name: "loader",
    initialState,
    reducers: {
        toggleLoader(state, action) {
            state.loader = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(HYDRATE_ACTION, (state, action: any) => {
    //             return {
    //                 ...state,
    //                 ...action.payload.loader,
    //             };
    //         })
    // },
});

export const { toggleLoader } = loader.actions;

export const getLoaderState = (state: AppState) => state.loader?.loader;