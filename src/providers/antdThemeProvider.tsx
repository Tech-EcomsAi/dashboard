'use client'
import AntdClient from "@lib/antd/antdClient";

const AntdThemeProvider = (props: any) => {
    console.log("inside without layout theme provider")
    return (
        <AntdClient>
            {props.children}
        </AntdClient>
    )
}

export default AntdThemeProvider;