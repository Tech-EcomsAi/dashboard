import Saperator from '@atoms/Saperator';
import { TEMPLATES_PROPS_TYPE, TEMPLATE_PAGES_LIST, TEMPLATE_SECTIONS_LIST, TEMPLATE_TYPES_LIST } from '@constant/templates';
import { getTemplateConfigById } from '@database/collections/websiteTemplateConfig';
import { addTemplate, getTemplateById } from '@database/collections/websiteTemplates';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast, showSuccessToast } from '@reduxSlices/toast';
import { Button, Card, Input, Modal, Space, Timeline, Typography, theme } from 'antd';
import { AnimatePresence } from 'framer-motion';
import { Fragment, useState } from 'react';
import { LuBook, LuBookCopy, LuBookOpenCheck, LuMoveLeft, LuMoveRight, LuX } from 'react-icons/lu';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { TEMPLATE_DETAILS_TYPE } from '../templateConstants';
import styles from './templateCreationModal.module.scss';
const { Text, Title } = Typography;
const { TextArea } = Input;

const HOME_PAGE_TYPE = { key: 1, title: "Home Page" };

type STEP_DETAILS_PROPS = { stepId: number, title: string, selectedTitle: string, tooltip: string, list: any[] }

const STEPS_LIST: STEP_DETAILS_PROPS[] = [
    { stepId: 0, list: TEMPLATE_TYPES_LIST, selectedTitle: "Selected Website Type", title: "Select Type", tooltip: "Which type of website do you want to create?" },
    { stepId: 1, list: TEMPLATE_PAGES_LIST, selectedTitle: "Selected Pages", title: "Select Pages", tooltip: "Select pages of your website" },
    { stepId: 2, list: TEMPLATE_SECTIONS_LIST, selectedTitle: "Selected Home Page Sections", title: "Select Sections Home Page ", tooltip: "Select section of your pages" },
    // { stepId: 3, list: [], selectedTitle: "Site Short description", title: "Enter short description of your site ", tooltip: "Enter short description of your site" },
]

function TemplateCreationModal({ showModal, handleModalResponse }) {
    const [activeStep, setActiveStep] = useState(STEPS_LIST[0]);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const { token } = theme.useToken();
    const [siteCreationActive, setSiteCreationActive] = useState(false)

    const [templateDetails, setTemplateDetails] = useState({
        templateType: { key: "", title: "" },
        pages: [HOME_PAGE_TYPE],
        sections: [],
        description: ""
    })

    const createTemplate = () => {
        // dispatch(toggleLoader(true))
        setIsLoading(true)
        const templateData = { ...templateDetails };
        setSiteCreationActive(true)
        addTemplate(templateData)
            .then((templateId) => {
                console.log("templateId", templateId)
                setIsLoading(true)
                getTemplates(templateId);
                // dispatch(toggleLoader(false))
                dispatch(showSuccessToast("Website Created Successfully"))
            })
            .catch((error) => {
                console.log("error", error)
                setIsLoading(true)
                setSiteCreationActive(false)
                // dispatch(toggleLoader(false))
                dispatch(showErrorToast("Template creation failed"))
            })
    }

    const getTemplates = (templateId) => {
        getTemplateById(templateId).then((res: TEMPLATE_DETAILS_TYPE[]) => {
            console.log("res", res)
            getTemplateConfigById(templateId).then((templateConfigRes) => {
                console.log("templateConfigRes", templateConfigRes)
            }).catch((error) => {
                console.log("config fetching error", error)
            })
        })
    }

    const onSubmit = () => {
        if (activeStep.stepId == 0) {
            if (templateDetails.templateType.key) {
                setActiveStep(STEPS_LIST[1])
            } else {
                dispatch(showErrorToast("Please select website type"))
            }
        } else if (activeStep.stepId == 1) {
            setActiveStep(STEPS_LIST[2]);
        } else if (activeStep.stepId == 2) {
            if (templateDetails.sections.length !== 0) {
                createTemplate();
            } else {
                dispatch(showErrorToast("Please select sections for your home page"))
            }
        }
    }

    const onSelectConfig = (value: TEMPLATES_PROPS_TYPE) => {
        //type
        if (activeStep.stepId == 0) {
            setTemplateDetails({ ...templateDetails, templateType: value, sections: [] })
            // setActiveStep(STEPS_LIST[1])
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
                    title={<Space wrap style={{ cursor: "pointer", width: "100%", padding: 8, background: token.colorBgBase }} onClick={() => navigateToStep(STEPS_LIST[stepDetails.stepId])}>
                        {stepDetails.stepId == 0 ? <>
                            {Boolean(templateDetails?.templateType?.title) ?
                                <Space wrap align='center'>
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
                                <Text>{STEPS_LIST[stepDetails.stepId].tooltip}</Text>}
                        </> : stepDetails.stepId == 2 ? <>
                            {templateDetails?.sections.length != 0 ?
                                <Space align='center' wrap>
                                    <Text>{stepDetails.selectedTitle} :</Text>
                                    <Title level={5} style={{ margin: 0 }} type='success'> {templateDetails?.sections.map((section, i) => <Fragment key={section.key}>{section.title} {i != templateDetails?.sections.length - 1 && ", "}</Fragment>)}</Title>
                                </Space>
                                :
                                <Text>{STEPS_LIST[stepDetails.stepId].tooltip}</Text>}
                        </> : <>
                            <Text>{STEPS_LIST[stepDetails.stepId].tooltip}</Text>
                        </>}
                    </Space>}
                    bodyStyle={{ padding: "unset" }}
                    extra={<Button className={styles.actionButton} icon={<MdOutlineNavigateNext />} type='text' size='large' style={{ transform: `rotate(${activeStep?.stepId == stepDetails.stepId ? 90 : 0}deg)` }} />}
                >
                    {activeStep?.stepId == stepDetails.stepId && <Space direction='vertical' align='end' style={{ width: "100%", padding: 20 }}>
                        {stepDetails.list.length != 0 && <Space wrap style={{ width: "100%" }}>
                            {stepDetails.list.map((typeDetails: TEMPLATES_PROPS_TYPE) => {
                                return <Fragment key={typeDetails.key}>
                                    {stepDetails.stepId == 0 && <Button shape='round' type={templateDetails?.templateType?.key == typeDetails.key ? "primary" : "dashed"} size='middle' onClick={() => onSelectConfig(typeDetails)} >{typeDetails.title}</Button>}
                                    {stepDetails.stepId == 1 && <Button shape='round' type={Boolean(templateDetails?.pages.find(type => typeDetails.key == type.key)) ? "primary" : "dashed"} size='middle' onClick={() => onSelectConfig({ key: typeDetails.key, title: typeDetails.title })} disabled={typeDetails.key == 1}>{typeDetails.title}</Button>}
                                    {stepDetails.stepId == 2 && <Button shape='round' type={Boolean(templateDetails?.sections.find(type => typeDetails.key == type.key)) ? "primary" : "dashed"} size='middle' onClick={() => onSelectConfig({ key: typeDetails.key, title: typeDetails.title })}>{typeDetails.title}</Button>}
                                </Fragment>
                            })}
                            {stepDetails.stepId == 3 && <>
                                <TextArea
                                    allowClear
                                    size="large"
                                    value={templateDetails.description}
                                    placeholder="Enter short min 120 letters description"
                                    // style={{ minHeight: 'auto' }}
                                    onChange={(e) => setTemplateDetails({ ...templateDetails, description: e.target.value })}
                                />
                            </>}
                        </Space>}
                        <Space align='end' style={{ width: "100%" }} >
                            {stepDetails.stepId > 0 && <Button icon={<LuMoveLeft />} onClick={() => navigateToStep(STEPS_LIST[stepDetails.stepId - 1])} />}
                            {stepDetails.stepId < STEPS_LIST.length - 1 && <Button icon={<LuMoveRight />} onClick={() => navigateToStep(STEPS_LIST[stepDetails.stepId + 1])} />}
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
            maskClosable={false}
            destroyOnClose
            title="Let’s create new website"
            open={showModal}
            onCancel={() => handleModalResponse()}
            styles={{
                mask: { backdropFilter: 'blur(6px)' },
                body: { maxWidth: '80vh' }
            }}
            footer={<Space direction='vertical' style={{ width: "100%" }}>
                <Saperator />
                <Space>
                    <Button onClick={() => handleModalResponse()} size='large' icon={<LuX />}>Cancel</Button>
                    {activeStep?.stepId == 0 ? <Button size='large' type='primary' onClick={onSubmit} icon={<LuBookCopy />}>Select Pages</Button> :
                        activeStep?.stepId == 1 ? <Button size='large' type='primary' onClick={onSubmit} icon={<LuBook />}>Select Sections</Button> :
                            <Button size='large' type='primary' onClick={onSubmit} icon={<LuBookOpenCheck />} loading={isLoading}>Create Site</Button>
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
        </Modal>
    )
}

export default TemplateCreationModal