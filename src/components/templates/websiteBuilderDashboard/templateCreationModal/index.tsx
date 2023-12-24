import React, { Fragment, useEffect, useState } from 'react'
import styles from './templateCreationModal.module.scss';
import { Button, Card, Modal, Space, Timeline, Typography, theme } from 'antd';
import { LuArrowLeft, LuBook, LuBookCopy, LuBookLock, LuBookOpenCheck, LuBookTemplate, LuMoveLeft, LuMoveRight, LuPanelRight, LuPaperclip, LuX } from 'react-icons/lu';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorAlert } from '@reduxSlices/alert';
import { showErrorToast } from '@reduxSlices/toast';
import Loader from '@organisms/loader';
import { TEMPLATES_PROPS_TYPE, TEMPLATE_PAGES_LIST, TEMPLATE_SECTIONS_LIST, TEMPLATE_TYPES_LIST } from '@constant/templates';
import Saperator from '@atoms/Saperator';
import { MdOutlineNavigateNext } from 'react-icons/md';
const { Text, Title } = Typography
import { AnimatePresence, motion } from 'framer-motion';

type STEP_DETAILS_PROPS = { stepId: number, title: string, selectedTitle: string, tooltip: string, list: any[] }

const STEPS_LIST: STEP_DETAILS_PROPS[] = [
    { stepId: 0, list: TEMPLATE_TYPES_LIST, selectedTitle: "Selected Website Type", title: "Select Type", tooltip: "Which type of website do you want to create?" },
    { stepId: 1, list: TEMPLATE_PAGES_LIST, selectedTitle: "Selected Pages", title: "Select Pages", tooltip: "Select pages of your website" },
    { stepId: 2, list: TEMPLATE_SECTIONS_LIST, selectedTitle: "Selected Sections", title: "Select Sections", tooltip: "Select section of your pages" },
    // { stepId: 3, list: [], selectedTitle: "Creating your site", title: "Creating your site", tooltip: "Please hold tight, your site is getting ready in few seconds" },
]

function TemplateCreationModal({ setShowViewAllTemplateModal, showModal, handleModalResponse }) {
    const [activeStep, setActiveStep] = useState(STEPS_LIST[0]);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const { token } = theme.useToken();
    const [templateDetails, setTemplateDetails] = useState({
        templateType: { key: "", title: "" },
        pages: [{ key: 1, title: "Home Page" }],
        sections: []
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
            setTemplateDetails({ pages: [{ key: 1, title: "Home Page" }], sections: [], templateType: value });
            setActiveStep(STEPS_LIST[1])
            //pages
        } else if (activeStep.stepId == 1) {
            const previndex = templateDetails.pages.findIndex((p) => p.key == value.key)
            if (previndex != -1) {
                const pagesList = templateDetails.pages;
                pagesList.splice(previndex, 1);
                setTemplateDetails({ ...templateDetails, pages: pagesList });
            } else {
                setTemplateDetails({ ...templateDetails, pages: [...templateDetails.pages, value] });
            }
        } else if (activeStep.stepId == 2) {
            const previndex = templateDetails.sections.findIndex((p) => p.key == value.key)
            if (previndex != -1) {
                const sectionsList = templateDetails.sections;
                sectionsList.splice(previndex, 1);
                setTemplateDetails({ ...templateDetails, sections: sectionsList });
            } else {
                setTemplateDetails({ ...templateDetails, sections: [...templateDetails.sections, value] });
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

    const renderStepsCard = () => {
        return STEPS_LIST.map((stepDetails: STEP_DETAILS_PROPS, index: number) => {
            const isActive = (stepDetails.stepId == 0 ? Boolean(templateDetails?.templateType?.title) :
                stepDetails.stepId == 1 ? templateDetails?.pages.length > 1 :
                    templateDetails?.sections.length != 0)

            return {
                children: <Card
                    className={styles.stepCard}
                    key={stepDetails.stepId}
                    headStyle={{ minHeight: 0, padding: 0 }}
                    style={{ background: token.colorFillContent }}
                    title={<Space style={{ cursor: "pointer", width: "100%", padding: 8, background: token.colorPrimaryBg }} onClick={() => navigateToStep(STEPS_LIST[stepDetails.stepId])}>
                        {stepDetails.stepId == 0 ? <>
                            {Boolean(templateDetails?.templateType?.title) ?
                                <Space align='center'>
                                    <Text>{stepDetails.selectedTitle} :</Text>
                                    <Title level={5} style={{ margin: 0 }} type='success'> {templateDetails?.templateType?.title}</Title>
                                </Space>
                                :
                                <Text>{stepDetails.tooltip}</Text>}
                        </> : stepDetails.stepId == 1 ? <>
                            {templateDetails?.pages.length > 1 ?
                                <Space align='center' wrap>
                                    <Text>{stepDetails.selectedTitle} :</Text>
                                    <Title level={5} style={{ margin: 0 }} type='success'> {templateDetails?.pages.map((page, i) => <Fragment key={page.key}>{page.title} {i != templateDetails?.pages.length - 1 && ", "}</Fragment>)}</Title>
                                </Space>
                                :
                                <Text>{STEPS_LIST[1].tooltip}</Text>}
                        </> : <>
                            {templateDetails?.sections.length != 0 ?
                                <Space align='center' wrap>
                                    <Text>{stepDetails.selectedTitle} :</Text>
                                    <Title level={5} style={{ margin: 0 }} type='success'> {templateDetails?.sections.map((section, i) => <Fragment key={section.key}>{section.title} {i != templateDetails?.sections.length - 1 && ", "}</Fragment>)}</Title>
                                </Space>
                                :
                                <Text>{STEPS_LIST[2].tooltip}</Text>}
                        </>}
                    </Space>}
                    bodyStyle={{ padding: "unset" }}
                    extra={<Button className={styles.actionButton} icon={<MdOutlineNavigateNext />} type='text' size='large' style={{ transform: `rotate(${activeStep.stepId == stepDetails.stepId ? 90 : 0}deg)` }} />}
                >
                    {activeStep.stepId == stepDetails.stepId && <Space direction='vertical' align='end' style={{ width: "100%", padding: 20 }}>
                        <Space wrap style={{ width: "100%" }}>
                            {stepDetails.list.map((typeDetails: TEMPLATES_PROPS_TYPE) => {
                                return <Fragment key={typeDetails.key}>
                                    {stepDetails.stepId == 0 && <Button shape='round' type={templateDetails?.templateType?.key == typeDetails.key ? "primary" : "dashed"} size='middle' onClick={() => onSelectConfig(typeDetails)}>{typeDetails.title}</Button>}
                                    {stepDetails.stepId == 1 && <Button shape='round' type={templateDetails?.pages.find(type => typeDetails.key == type.key) ? "primary" : "dashed"} size='middle' onClick={() => onSelectConfig({ key: typeDetails.key, title: typeDetails.title })}>{typeDetails.title}</Button>}
                                    {stepDetails.stepId == 2 && <Button shape='round' type={templateDetails?.sections.find(type => typeDetails.key == type.key) ? "primary" : "dashed"} size='middle' onClick={() => onSelectConfig({ key: typeDetails.key, title: typeDetails.title })}>{typeDetails.title}</Button>}
                                </Fragment>
                            })}
                        </Space>
                        <Space align='end' style={{ width: "100%" }} >
                            {stepDetails.stepId > 0 && <Button icon={<LuMoveLeft />} onClick={() => navigateToStep(STEPS_LIST[stepDetails.stepId - 1])} />}
                            {stepDetails.stepId < 2 && <Button icon={<LuMoveRight />} onClick={() => navigateToStep(STEPS_LIST[stepDetails.stepId + 1])} />}
                        </Space>
                    </Space>
                    }
                </Card >,
                color: isActive ? "green" : "gray"
            }
        })
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
            <AnimatePresence>
                <Timeline
                    items={[...renderStepsCard()]}
                />
            </AnimatePresence>
            {isLoading && <Loader />}
        </Modal>
    )
}

export default TemplateCreationModal