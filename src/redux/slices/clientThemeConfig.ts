import { DEFAULT_DARK_COLOR, DEFAULT_LIGHT_COLOR } from "@constant/common";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@reduxStore/index";

export type ClientThemeConfigType = {
    darkMode: boolean;
    lightColor: string;
    darkColor: string;
    collapsedSidebar: boolean;
}

const initialState: ClientThemeConfigType = {
    darkMode: true,
    lightColor: DEFAULT_LIGHT_COLOR,
    darkColor: DEFAULT_DARK_COLOR,
    collapsedSidebar: true
};

export const clientThemeConfig = createSlice({
    name: "clientThemeConfig",
    initialState,
    reducers: {
        toggleDarkMode(state, action) {
            state.darkMode = action.payload;
        },
        updateLightThemeColor(state, action) {
            state.lightColor = action.payload;
        },
        updateDarkThemeColor(state, action) {
            state.darkColor = action.payload;
        },
        toggleSidbar(state, action) {
            state.collapsedSidebar = action.payload;
        },
    }
});

const { toggleDarkMode, updateLightThemeColor, updateDarkThemeColor, toggleSidbar } = clientThemeConfig.actions;
const getDarkModeState = (state: AppState) => state.clientThemeConfig?.darkMode;
const getLightColorState = (state: AppState) => state.clientThemeConfig?.lightColor;
const getDarkColorState = (state: AppState) => state.clientThemeConfig?.darkColor;
const getSidebarState = (state: AppState) => state.clientThemeConfig?.collapsedSidebar;

export { toggleDarkMode, updateLightThemeColor, updateDarkThemeColor, toggleSidbar, getDarkModeState, getLightColorState, getDarkColorState, getSidebarState }