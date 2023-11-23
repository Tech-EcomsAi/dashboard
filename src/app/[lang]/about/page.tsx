'use client'
import TextElement from "@antdComponent/textElement";
import { theme } from "antd";
import { dictionary } from "content";

function Page({ params }: { params: { lang: string } }) {
    const { token } = theme.useToken();
    return (
        <div>
            <TextElement text={dictionary[params.lang]?.aboutHeader} color={token.colorTextBase} />
            <TextElement text={dictionary[params.lang]?.aboutContent} color={token.colorTextBase} />
        </div>
    );
}

export default Page;