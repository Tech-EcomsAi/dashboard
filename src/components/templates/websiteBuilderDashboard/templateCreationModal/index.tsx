import React, { Fragment, useEffect, useState } from 'react'
import styles from './templateCreationModal.module.scss';
import { Button, Card, Modal, Space, Timeline, Typography } from 'antd';
import { LuArrowLeft, LuBook, LuBookCopy, LuBookLock, LuBookOpenCheck, LuBookTemplate, LuPaperclip, LuX } from 'react-icons/lu';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorAlert } from '@reduxSlices/alert';
import { showErrorToast } from '@reduxSlices/toast';
import Loader from '@organisms/loader';
import { TEMPLATES_PROPS_TYPE, TEMPLATE_PAGES_LIST, TEMPLATE_SECTIONS_LIST, TEMPLATE_TYPES_LIST } from '@constant/templates';
import Saperator from '@atoms/Saperator';
const { Text, Title } = Typography

type STEP_DETAILS_PROPS = {
    stepId: number, title: string, tooltip: string
}
const STEPS_LIST = [
    { stepId: 0, title: "Select Type", tooltip: "Which type of website do you want to create?" },
    { stepId: 1, title: "Select Pages", tooltip: "Select pages of your website" },
    { stepId: 2, title: "Select Sections", tooltip: "Select section of your pages" },
    { stepId: 3, title: "Creating your site", tooltip: "Please hold tight, your site is getting ready in few seconds" },
]

function TemplateCreationModal({ setShowViewAllTemplateModal, showModal, handleModalResponse }) {
    const [activeStep, setActiveStep] = useState(STEPS_LIST[0]);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [templateDetails, setTemplateDetails] = useState({
        templateType: { key: "", title: "" },
        pages: ["Home Page"],
        sections: [""]
    })

    const createWebsite = () => {
        setIsLoading(true)
        return new Promise((res, rej) => {
            setTimeout(() => {
                setIsLoading(false)
                res(true)
            }, 5000);
        })
    }

    const onSubmit = () => {
        if (activeStep.stepId == 0) {
            if (templateDetails.templateType.key) {
                setActiveStep(STEPS_LIST[1])
            } else {
                dispatch(showErrorToast("Please select type"))
            }
        } else if (activeStep.stepId == 1) {
            setActiveStep(STEPS_LIST[2]);
        } else if (activeStep.stepId == 2) {
            setActiveStep(STEPS_LIST[3]);
            createWebsite().then(() => {
                dispatch(showErrorToast("Website Created Successfully"))
            })
        } else {

        }
    }

    const onSelectConfig = (value: TEMPLATES_PROPS_TYPE) => {
        //type
        if (activeStep.stepId == 0) {
            setTemplateDetails({ pages: ["Home Page"], sections: [], templateType: value });
            setActiveStep(STEPS_LIST[1])
            //pages
        } else if (activeStep.stepId == 1) {
            const previndex = templateDetails.pages.findIndex((p) => p == value.key)
            if (previndex != -1) {
                const pagesList = templateDetails.pages;
                pagesList.splice(previndex, 1);
                setTemplateDetails({ ...templateDetails, pages: pagesList });
            } else {
                setTemplateDetails({ ...templateDetails, pages: [...templateDetails.pages, value.key] });
            }
        } else if (activeStep.stepId == 2) {
            const previndex = templateDetails.sections.findIndex((p) => p == value.key)
            if (previndex != -1) {
                const sectionsList = templateDetails.sections;
                sectionsList.splice(previndex, 1);
                setTemplateDetails({ ...templateDetails, sections: sectionsList });
            } else {
                setTemplateDetails({ ...templateDetails, sections: [...templateDetails.sections, value.key] });
            }
        } else {

        }
    }

    const navigateToStep = (stepDetails: STEP_DETAILS_PROPS) => {
        if (stepDetails.stepId != 0 && !Boolean(templateDetails.templateType.key)) {
            dispatch(showErrorToast("Select website type"));
            return;
        } else {
            setActiveStep(stepDetails)
        }
    }

    return (
        <Modal
            destroyOnClose
            title="Let’s create new website"
            open={showModal}
            onCancel={() => handleModalResponse()}
            styles={{
                mask: { backdropFilter: 'blur(6px)' },
                body: { maxWidth: '80vh', minWidth: 360 }
            }}
            footer={<Space direction='vertical' style={{ width: "100%" }}>
                <Saperator />
                <Space>
                    <Button onClick={() => handleModalResponse()} size='large' icon={<LuX />}>Cancel</Button>
                    {activeStep.stepId == 0 ? <Button size='large' type='primary' onClick={onSubmit} icon={<LuBookCopy />}>Select Pages</Button> :
                        activeStep.stepId == 1 ? <Button size='large' type='primary' onClick={onSubmit} icon={<LuBook />}>Select Sections</Button> :
                            <Button size='large' type='primary' onClick={onSubmit} icon={<LuBookOpenCheck />}>Create Site</Button>
                    }
                </Space>
            </Space>}
            closeIcon={<LuX />}
            width={'max-content'}
            className={styles.templatePreviewModalWrap}
        >
            <Saperator />

            <Timeline
                items={[
                    {
                        children: <Card
                            title={<Space onClick={() => navigateToStep(STEPS_LIST[0])}>
                                {Boolean(templateDetails?.templateType?.title) ?
                                    <Text>Selected website type : {templateDetails?.templateType?.title}</Text> :
                                    <Text>{STEPS_LIST[0].tooltip}</Text>}
                            </Space>}
                            bodyStyle={{ padding: "unset" }}
                        >
                            {activeStep.stepId == 0 && <Space direction='horizontal' wrap style={{ width: "100%", padding: 20 }}>
                                {TEMPLATE_TYPES_LIST.map((typeDetails: TEMPLATES_PROPS_TYPE) => {
                                    return <Fragment key={typeDetails.key}>
                                        <Button type={templateDetails?.templateType?.key == typeDetails.key ? "primary" : "dashed"}
                                            size='large'
                                            onClick={() => onSelectConfig(typeDetails)}>{typeDetails.title}</Button>
                                    </Fragment>
                                })}
                            </Space>}
                        </Card>,
                        color: Boolean(templateDetails?.templateType?.title) ? "green" : "gray"
                    },
                    {
                        children:
                            <Card
                                title={
                                    <Space onClick={() => navigateToStep(STEPS_LIST[1])}>
                                        {templateDetails?.pages.length > 1 ?
                                            <Text>Selected pages : {templateDetails?.pages.map((p) => <Fragment key={p}>{p}</Fragment>)}</Text> :
                                            <Text>{STEPS_LIST[1].tooltip}</Text>}
                                    </Space>
                                }
                                bodyStyle={{ padding: "unset" }}
                            >
                                {activeStep.stepId == 1 && <Space direction='horizontal' wrap style={{ width: "100%", padding: 20 }}>
                                    {TEMPLATE_PAGES_LIST.map((typeDetails: TEMPLATES_PROPS_TYPE) => {
                                        return <Fragment key={typeDetails.key}>
                                            <Button type={templateDetails?.pages.includes(typeDetails.key) ? "primary" : "dashed"}
                                                size='large'
                                                onClick={() => onSelectConfig(typeDetails)}>{typeDetails.title}</Button>
                                        </Fragment>
                                    })}
                                </Space>}
                            </Card>,
                        color: templateDetails?.pages.length > 1 ? "green" : "gray"
                    },
                    {
                        children: <Card
                            title={
                                <Space onClick={() => navigateToStep(STEPS_LIST[2])}>
                                    {templateDetails?.sections.length != 0 ?
                                        <Text>Selected Sections : {templateDetails?.sections.map((p) => <Fragment key={p}>{p}</Fragment>)}</Text> :
                                        <Text>{STEPS_LIST[2].tooltip}</Text>}
                                </Space>
                            }
                            bodyStyle={{ padding: "unset" }}
                        >
                            {activeStep.stepId == 2 && <Space direction='horizontal' wrap style={{ width: "100%", padding: 20 }}>
                                {TEMPLATE_SECTIONS_LIST.map((typeDetails: TEMPLATES_PROPS_TYPE) => {
                                    return <Fragment key={typeDetails.key}>
                                        <Button type={templateDetails?.sections.includes(typeDetails.key) ? "primary" : "dashed"}
                                            size='large'
                                            onClick={() => onSelectConfig(typeDetails)}>{typeDetails.title}</Button>
                                    </Fragment>
                                })}
                            </Space>}
                        </Card>,
                        color: templateDetails?.sections.length != 0 ? "green" : "gray"
                    },
                ]}
            />

            {isLoading && <Loader />}
        </Modal>
    )
}

export default TemplateCreationModal