import { AppState } from "@reduxStore/index";
import { createAction, createSlice } from "@reduxjs/toolkit";
import defaultSiteConfig from "src/data/defaultSiteConfig";

// import { HYDRATE } from "next-redux-wrapper";
// const HYDRATE_ACTION = createAction(HYDRATE)

export interface SiteConfig {
    siteConfig: any;
}

const initialState: SiteConfig = {
    siteConfig: defaultSiteConfig,
};

export const siteConfig = createSlice({
    name: "siteConfig",
    initialState,
    reducers: {
        updateSiteConfig(state, action) {
            state.siteConfig = action.payload;
        },
    },
    // extraReducers: (config) => {
    //     config.addCase(HYDRATE_ACTION, (state, action: any) => {
    //         return {
    //             ...state,
    //             ...action.payload.siteConfig,
    //         };
    //     })
    // },
});

export const { updateSiteConfig } = siteConfig.actions;

export const getSiteConfig = (state: AppState) => state.siteConfig?.siteConfig;