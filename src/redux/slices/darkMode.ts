import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "@reduxStore/index";
// import { HYDRATE } from "next-redux-wrapper";
// const HYDRATE_ACTION = createAction(HYDRATE)

export interface DarkMode {
    darkMode: any;
}

const initialState: DarkMode = {
    darkMode: null,
};

export const darkMode = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggleDarkMode(state, action) {
            state.darkMode = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(HYDRATE_ACTION, (state, action: any) => {
    //             return {
    //                 ...state,
    //                 ...action.payload.darkMode,
    //             };
    //         })
    // },
});

export const { toggleDarkMode } = darkMode.actions;

export const getDarkModeState = (state: AppState) => state.darkMode?.darkMode;