import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { ALERT_SUCCESS, ALERT_ERROR, ALERT_WARNING, ALERT_INFO } from "@constant/alert";
import { DEFAULT_ALERT_TIME } from "@constant/defaultValues";
// import { HYDRATE } from "next-redux-wrapper";
// const HYDRATE_ACTION = createAction(HYDRATE)

export interface Alert {
  alert: { type: string, title: string, message: string, time: number };
}

const initialState: Alert = {
  alert: { type: '', title: '', message: '', time: DEFAULT_ALERT_TIME }
};

export const alert = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showSuccessAlert(state, action) {
      state.alert = { type: ALERT_SUCCESS, time: DEFAULT_ALERT_TIME, ...action.payload };
    },
    showErrorAlert(state, action) {
      state.alert = { type: ALERT_ERROR, time: DEFAULT_ALERT_TIME, ...action.payload };
    },
    showWarningAlert(state, action) {
      state.alert = { type: ALERT_WARNING, time: DEFAULT_ALERT_TIME, ...action.payload };
    },
    showAlert(state, action) {
      state.alert = { type: ALERT_INFO, time: DEFAULT_ALERT_TIME, ...action.payload };
    },
    clearAlert(state, action) {
      state.alert = { type: '', title: '', message: '', time: 0 };
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(HYDRATE_ACTION, (state, action: any) => {
  //       return {
  //         ...state,
  //         ...action.payload.alert,
  //       };
  //     })
  // },
});

export const { showSuccessAlert, showErrorAlert, showWarningAlert, showAlert, clearAlert } = alert.actions;

export const getAlertState = (state: AppState) => state.alert?.alert;
