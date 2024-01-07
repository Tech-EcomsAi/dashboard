'use client'
import { useAppSelector } from '@hook/useAppSelector';
import { getAppLanguageState, getDarkModeState } from '@reduxSlices/clientThemeConfig';
import styles from '@templatesCSS/websiteBuilder/websiteBuilder.module.scss';
import { Button, Col, Dropdown, Layout, Popconfirm, Row, Space, Tooltip, Typography, theme } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { BsArrowCounterclockwise, BsLaptop, BsPhone } from 'react-icons/bs';
import { v4 as uuid } from 'uuid';
import SectionsContainer from './sectionsContainer';
// import { DragDropContext } from '@hello-pangea/dnd';
import IconButton from '@antdComponent/iconButton';
import TextElement from '@antdComponent/textElement';
import SegmentComponent, { SEGMENT_OPTIONS_TYPES } from '@atoms/segment';
import { updateTemplateConfig } from '@database/collections/websiteTemplateConfig';
import { useAppDispatch } from '@hook/useAppDispatch';
import ComponentEditor from '@organisms/componentEditor';
import { getActiveEditorComponent, initialState, updateActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import { BuilderContextType, getActiveTemplateConfig, getBuilderContext, getBuilderState, updateBuilderContext, updateBuilderState } from "@reduxSlices/siteBuilderState";
import { showErrorToast, showSuccessToast } from '@reduxSlices/toast';
import { copy, move, reorder } from '@util/dndHelpers';
import { isSameObjects } from '@util/utils';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { translator } from 'public/dictionaries';
import { LuEye, LuSettings, LuUploadCloud } from 'react-icons/lu';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { TbChevronDown, TbComponents, TbDevices, TbEdit } from 'react-icons/tb';
import BuilderWrapper from './builderWrapper';
import GlobalContainer from './globalContainer';

const DragDropContext = dynamic(() => import('@hello-pangea/dnd').then(mod => { return mod.DragDropContext; }), { ssr: false },);

const { Header, Content, Sider } = Layout;
const { Text } = Typography;
const activePaesList = [
    { key: '1', label: 'Home Page' },
    { key: '2', label: 'About Us' },
    { key: '3', label: 'Contact Us' },
];
const DEVICE_TYPES = [
    { title: 'All', icon: <TbDevices /> },
    { title: 'Mobile', icon: <BsPhone /> },
    { title: 'Desktop', icon: <BsLaptop /> },
    // { title: 'Tablet', icon: <BsTabletLandscape /> },
]

const SEGMENT_OPTIONS = [
    { key: 'Sections', value: 'Sections', icon: <TbComponents /> },
    { key: 'Editor', value: 'Editor', icon: <TbEdit /> },
    { key: 'Site', value: 'Global', icon: <LuSettings /> },
]

function WebsiteBuilder({ templateState }) {
    const { token } = theme.useToken();
    const { data: session }: any = useSession()
    const isDarkMode = useAppSelector(getDarkModeState)
    const [activeOptionTab, setActiveOptionTab] = useState('Sections');
    const builderContext: BuilderContextType = useAppSelector(getBuilderContext);
    const dispatch = useAppDispatch();
    const builderState = useAppSelector(getBuilderState) || { [uuid()]: [] };
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const [originalTemplateState, setOriginalTemplateState] = useState(templateState || { [uuid()]: [] });
    const [collapsedSectionsContainer, setCollapsedSectionsContainer] = useState(false)
    const [activePage, setActivePage] = useState(activePaesList[0])
    const [isChangesAvailable, setIsChangesAvailable] = useState({ active: false, isLoading: false })
    const activeTemplateConfig = useAppSelector(getActiveTemplateConfig);
    const t = translator(useAppSelector(getAppLanguageState));

    const stateId = useMemo(() => Object.keys(builderState)[0], [builderState]);

    console.log("builderState", builderState)

    useEffect(() => {
        if (builderState) {
            const isSameObj = isSameObjects(templateState, builderState)
            if (!isSameObj) {
                setIsChangesAvailable({ active: true, isLoading: false })
            } else {
                setIsChangesAvailable({ active: false, isLoading: false })
            }
        }
    }, [builderState])

    useEffect(() => {
        if (Boolean(activeComponent.uid)) {
            setActiveOptionTab('Editor');
            setCollapsedSectionsContainer(false)
        };
    }, [activeComponent])

    const onClickOptionsTab = (tab: any) => {
        setActiveOptionTab(tab);
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
    }

    const onDragEnd = result => {
        const { source, destination, draggableId } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
        switch (source.droppableId) {
            case destination.droppableId:
                dispatch(updateBuilderState({
                    [destination.droppableId]: reorder(builderState[stateId], source.index, destination.index)
                }));
                break;
            case 'ECOMAI_BUILDER':
                dispatch(updateBuilderState({
                    [destination.droppableId]: copy(builderState[stateId], source, destination)
                }));
                break;
            default:
                dispatch(updateBuilderState(
                    move(builderState[source.droppableId], builderState[stateId], source, destination)
                ));
                break;
        }
    };

    const onOutsideEditorClick = () => {
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
    }

    const onSelectPage: any = (e) => {
        console.log('click', e);
        setActivePage(activePaesList.find((page: any) => page.key === e.key))
    };

    const onClickRevert = () => {
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
        dispatch(updateBuilderState(originalTemplateState));
        dispatch(showSuccessToast('Changes reverted successfully'));
        setIsChangesAvailable({ active: false, isLoading: false })
    }

    const saveChanges = () => {
        if (Boolean(activeTemplateConfig?.id)) {
            setIsChangesAvailable({ active: true, isLoading: true })
            updateTemplateConfig(session, { ...activeTemplateConfig, templateState: { [activeTemplateConfig.id]: builderState[stateId] } }, activeTemplateConfig.id)
                .then((response: any) => {
                    console.log('response', response)
                    setOriginalTemplateState(builderState)
                    setIsChangesAvailable({ active: false, isLoading: false })
                    dispatch(showSuccessToast('Changes saved successfully'));
                })
                .catch((error: any) => {
                    setIsChangesAvailable({ active: true, isLoading: false })
                    dispatch(showErrorToast('Something wents wrong'));
                    console.log('error', error)
                })
        }
    }

    return (
        <Layout className={styles.websiteBuilderWrap} style={{ gap: collapsedSectionsContainer ? "0px" : "10px" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Layout className={styles.builderLeftWrap} >
                    <Header className={`${styles.headerWrap}`}
                        style={{ background: token.colorBgBase, border: `1px solid ${token.colorBorderBg}`, boxShadow: `${token.colorBorder} 1px 1px 8px -4px` }}>
                        <Row>
                            <Col className={`${styles.headingWrap}`} span={12}>
                                <Space>
                                    <Space>
                                        <TextElement color={token.colorText} text={`${t.currentPageLabel} :`} />
                                        <Dropdown menu={{ items: activePaesList, onClick: onSelectPage }}>
                                            <Button type='default'>
                                                <Space>
                                                    {activePage.label}
                                                    <TbChevronDown />
                                                </Space>
                                            </Button>
                                        </Dropdown>
                                        <IconButton tooltip='Page Settings' icon={<LuSettings />} active={false} onClickButton={() => { }} />
                                    </Space>
                                </Space>
                            </Col>
                            <Col className={styles.actionsWrap} span={12}>
                                {<Tooltip title={isChangesAvailable.active ? "Save current changes" : "Changes already saved !"}>
                                    <Button loading={isChangesAvailable.isLoading} icon={<LuUploadCloud />} disabled={!isChangesAvailable.active} type={"primary"} onClick={saveChanges}>
                                        {isChangesAvailable.active ? "Save Changes" : "Changes saved"}
                                    </Button>
                                </Tooltip>}

                                <Tooltip title="Preview in new tab">
                                    <Button icon={<LuEye />} type='default'>Preview</Button>
                                </Tooltip>

                                {isChangesAvailable.active && <Tooltip title="Revert changes">
                                    <Popconfirm
                                        title="Revert Changes"
                                        description="Are you sure you want revert?"
                                        onConfirm={onClickRevert}
                                    >
                                        <Button type='default' disabled={!isChangesAvailable.active} icon={<BsArrowCounterclockwise />} />
                                    </Popconfirm>
                                </Tooltip>}

                                {DEVICE_TYPES.map((device: any, i: number) => {
                                    return <React.Fragment key={i}>
                                        <Tooltip title={`${device.title} View`}>
                                            <Button
                                                shape={'circle'}
                                                type={builderContext.deviceType == device.title ? "primary" : "default"}
                                                onClick={() => dispatch(updateBuilderContext({ ...builderContext, deviceType: device.title }))}
                                                icon={device.icon} />
                                        </Tooltip>
                                    </React.Fragment>
                                })}

                                <Tooltip title={collapsedSectionsContainer ? "Expand Sections" : "Collapse Sections"}>
                                    <Button
                                        icon={collapsedSectionsContainer ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
                                        onClick={() => setCollapsedSectionsContainer(!collapsedSectionsContainer)}
                                        shape={'circle'}
                                    />
                                </Tooltip>

                            </Col>
                        </Row>
                    </Header>
                    <Content className={`${styles.editorContent}`} onClick={onOutsideEditorClick} style={{
                        background: token.colorBgLayout,
                        // backgroundImage: `linear-gradient(0deg, ${token.colorBgLayout} 0%, ${token.colorBgTextHover} 100%)`
                    }}>
                        <BuilderWrapper builderState={builderState} />
                    </Content>
                </Layout>
                {/* //components sections */}
                <Sider
                    collapsed={collapsedSectionsContainer}
                    collapsedWidth={0}
                    theme={isDarkMode ? "dark" : "light"}
                    defaultCollapsed={false}
                    width={350}
                    style={{ borderRadius: "4px" }}
                >
                    <div className={styles.builderRightWrap} style={{ background: token.colorBgBase, border: `1px solid ${token.colorBorderSecondary}` }}>
                        <div className={styles.sidebarWrap}>
                            <div className={styles.segmentWrap} style={{ borderBottom: `1px solid ${token.colorBorder}` }}>
                                <SegmentComponent
                                    label={``}
                                    value={activeOptionTab}
                                    showIcon={true}
                                    onChange={(tab) => onClickOptionsTab(tab)}
                                    options={SEGMENT_OPTIONS}
                                    type={SEGMENT_OPTIONS_TYPES.ARRAY_OF_OBJECTS}
                                />
                            </div>
                            {activeOptionTab == SEGMENT_OPTIONS[0].key && <div className={styles.sidebarContentWrap}>
                                <div className={styles.note} style={{ color: token.colorPrimary }}>
                                    {t.sectionHeader}
                                </div>
                                <SectionsContainer />
                            </div>}
                            {activeOptionTab == SEGMENT_OPTIONS[1].key && <div className={styles.sidebarContentWrap}>
                                <div className={styles.note} style={{ color: token.colorPrimary }}>
                                    {Boolean(activeComponent.uid) ? 'Edit content of selected section' : 'You have no component selected'}
                                </div>
                                {Boolean(activeComponent.uid) && <ComponentEditor activeComponent={activeComponent} />}
                            </div>}
                            {activeOptionTab == SEGMENT_OPTIONS[2].key && <div className={styles.sidebarContentWrap}>
                                <div className={styles.note} style={{ color: token.colorPrimary }}>
                                    Edit global styles and elements
                                </div>
                                <GlobalContainer />
                            </div>}
                        </div>
                    </div>
                </Sider>
            </DragDropContext>
        </Layout>
    )
}

export default WebsiteBuilder