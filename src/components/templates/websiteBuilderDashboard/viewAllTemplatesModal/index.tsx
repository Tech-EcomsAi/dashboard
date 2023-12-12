import React, { Fragment } from 'react'
import styles from './viewAllTemplatesModal.module.scss'
import { Button, Card, FloatButton, Modal, Space } from 'antd'
import { LuX } from 'react-icons/lu'
import { TEMPLATE_DETAILS_TYPE } from '../templateConstants'
import TemplateRenderer from '../templateRenderer'
import WrapperStyles from '../websiteBuilderDashboard.module.scss'
import ActionIconButton from '@antdComponent/iconButton/actionIconButton'

function ViewAllTemplatesModal({ templateList, showModal, handleModalResponse, filterType = "all" }) {
    return (
        <Modal
            destroyOnClose
            centered
            title="Explore extensive template lybrary, just made for you"
            open={showModal}
            onCancel={() => handleModalResponse()}
            styles={{
                content: {
                    height: '95vh',
                    overflow: "auto"
                },
                // header: { position: "sticky", top: '0', zIndex: "2" },
                mask: { backdropFilter: 'blur(6px)' }
            }}
            footer={null}
            className={WrapperStyles.websiteBuilderDashboardWrap}
            closeIcon={<Button icon={<LuX />} style={{ position: "sticky", top: '0', zIndex: "2" }} />}
            width={'max-content'}
        >
            <div className={WrapperStyles.templatesGroup}>
                segmented component for
                trending
                new
                ...other filters
                {/* <Card className={WrapperStyles.templatesGroup} title={"All Templates"}>
                </Card> */}
                <Space className={WrapperStyles.templatesList} align='start' wrap size={20}>
                    {templateList.map((templateDetails: TEMPLATE_DETAILS_TYPE) => {
                        return <Fragment key={templateDetails.id}><TemplateRenderer templateDetails={templateDetails} /></Fragment>
                    })}
                </Space>
            </div>
        </Modal>
    )
}

export default ViewAllTemplatesModal