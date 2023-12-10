import Meta from 'antd/es/card/Meta'
import React, { Fragment } from 'react'
import { Button, Card, Image, Space, Tooltip, theme } from 'antd';
import { LuEye, LuPenSquare, LuMoreHorizontal } from 'react-icons/lu';
import templateActions from './templateActions';

const cardCoverRenderer = (thumbnail) => {
    return <Fragment>
        <Space style={{ width: "100%", height: 200, display: "flex", justifyContent: "center", overflow: "hidden" }} align='center'>
            <Image alt="example" src={thumbnail} />
        </Space>
    </Fragment >
}

function TemplateRenderer({ templateDetails, isPlatformTemplate }) {
    return (
        <Card hoverable key={templateDetails.id}
            style={{ width: 250, minHeight: 200 }}
            cover={cardCoverRenderer(templateDetails.thumbnail)}
            actions={templateActions(isPlatformTemplate)}
        >
            <Meta
                title={templateDetails.title}
                description={templateDetails.publicUrl}
            />
        </Card>
    )
}

export default TemplateRenderer