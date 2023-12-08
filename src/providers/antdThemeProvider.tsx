'use client'
import React from "react";
import AntdClient from "@lib/antd/antdClient";
import NoSSRProvider from "./noSSRProvider";

const AntdThemeProvider = (props: any) => {
    console.log("inside without layout theme provider")
    return (
        <AntdClient>
            {/* <NoSSRProvider> */}
            {props.children}
            {/* </NoSSRProvider> */}
        </AntdClient>
    )
}

export default AntdThemeProvider;