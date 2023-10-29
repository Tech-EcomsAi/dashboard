'use client'
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import React from "react"; import { reduxStore } from "@reduxStore/index";

persistStore(reduxStore); // persist the store

type props = {
    children: React.ReactNode
}

export function ReduxStoreProvider({ children }: props) {
    return <Provider store={reduxStore}>{children}</Provider>;
}