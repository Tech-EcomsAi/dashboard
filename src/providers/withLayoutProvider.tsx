'use client'
import AntdLayoutWrapper from "@antdComponent/layoutWrapper";

const WithLayoutProvider = (props: any) => {
    console.log("1. Inside With Layout Provider")
    return (
        <AntdLayoutWrapper>
            {props.children}
        </AntdLayoutWrapper>
    )
}

export default WithLayoutProvider;
