import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
// import { HYDRATE } from "next-redux-wrapper";
// const HYDRATE_ACTION = createAction(HYDRATE)

export interface AuthUser {
  authUser: any;
}

const initialState: AuthUser = {
  authUser: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(HYDRATE_ACTION, (state, action: any) => {
  //       return {
  //         ...state,
  //         ...action.payload.auth,
  //       };
  //       // action is inferred correctly here if using TS
  //     })
  // },

  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.auth,
  //     };
  //   },
  // },
});

export const { setAuthUser } = auth.actions;

export const getAuthUserState = (state: AppState) => state.auth?.authUser;

// export default auth.reducer;
