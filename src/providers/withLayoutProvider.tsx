'use client'
import AntdLayoutWrapper from "@antdComponent/layoutWrapper";
import React from "react";

const WithLayoutProvider = (props: any) => {
    console.log("1. Inside With Layout Provider")
    return (
        <AntdLayoutWrapper>
            {props.children}
        </AntdLayoutWrapper>
    )
}

export default WithLayoutProvider;