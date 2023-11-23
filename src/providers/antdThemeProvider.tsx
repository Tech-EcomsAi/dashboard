'use client'
import React from "react";
import AntdClient from "@lib/antd/antdClient";
import NoSSRProvider from "./noSSRProvider";

const AntdThemeProvider = (props: any) => {

    return (
        <AntdClient>
            {/* <NoSSRProvider> */}
            {props.children}
            {/* </NoSSRProvider> */}
        </AntdClient>
    )
}

export default AntdThemeProvider;