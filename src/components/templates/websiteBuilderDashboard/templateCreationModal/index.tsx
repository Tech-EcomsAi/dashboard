import React from 'react'
import styles from './templateCreationModal.module.scss';
import { Button, Modal, Space } from 'antd';
import { LuX } from 'react-icons/lu';

function TemplateCreationModal({ setShowViewAllTemplateModal, showModal, handleModalResponse }) {

    return (
        <Modal
            destroyOnClose
            title="Let’s create new template"
            open={showModal}
            onCancel={() => handleModalResponse()}
            styles={{ mask: { backdropFilter: 'blur(6px)' } }}
            footer={null}
            closeIcon={<LuX />}
            width={'max-content'}
            className={styles.templatePreviewModalWrap}
        >
            <div className={styles.modalContentWrap}>
                <Button onClick={() => setShowViewAllTemplateModal(true)}>View All Templates</Button>
            </div>
        </Modal>
    )
}

export default TemplateCreationModal