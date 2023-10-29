'use client'
import styles from '@templatesCSS/websiteBuilder/websiteBuilder.module.scss'
import React, { useEffect, useState } from 'react'
import { Col, Layout, Popconfirm, Row, Segmented, theme, Tooltip, Typography } from 'antd';
import { useAppSelector } from '@hook/useAppSelector';
import { getDarkModeState } from '@reduxSlices/darkMode';
import { BsFillPencilFill, BsLaptop, BsPhone, BsTabletLandscape, BsFillLayersFill, BsArrowCounterclockwise, BsFillPhoneFill, BsFillTabletLandscapeFill, BsLaptopFill, BsMagic } from 'react-icons/bs';
import { v4 as uuid } from 'uuid';
import SectionsContainer from './sectionsContainer';
import BuilderContainer from './builderContainer';
// import { DragDropContext } from '@hello-pangea/dnd';
import { useAppDispatch } from '@hook/useAppDispatch';
import { getBuilderState, updateBuilderState } from '@reduxSlices/builderState';
import ComponentEditor from '@organisms/componentEditor';
import { getActiveEditorComponent, initialState, updateActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import ComponentConfigs from '@organisms/sections/configsList';
import { copy, move, reorder } from '@util/dndHelpers';
import { showSuccessToast } from '@reduxSlices/toast';
import GlobalContainer from './globalContainer';
import { LOGO_TEXT } from '@constant/common';

import dynamic from 'next/dynamic';

const DragDropContext = dynamic(
    () =>
        import('@hello-pangea/dnd').then(mod => {
            return mod.DragDropContext;
        }),
    { ssr: false },
);
const Droppable = dynamic(
    () =>
        import('@hello-pangea/dnd').then(mod => {
            return mod.Droppable;
        }),
    { ssr: false },
);
const Draggable = dynamic(
    () =>
        import('@hello-pangea/dnd').then(mod => {
            return mod.Draggable;
        }),
    { ssr: false },
);


const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const DEVICE_TYPES = [
    { title: 'Mobile', icon: <BsPhone /> },
    { title: 'Tablet', icon: <BsTabletLandscape /> },
    { title: 'Laptop', icon: <BsLaptop /> },
    // { title: 'Mobile', icon: <BsFillPhoneFill /> },
    // { title: 'Tablet', icon: <BsFillTabletLandscapeFill /> },
    // { title: 'Laptop', icon: <BsLaptopFill /> },
]

const SEGMENT_OPTIONS = [
    { title: 'Sections', icon: <BsFillLayersFill /> },
    { title: 'Editor', icon: <BsFillPencilFill /> },
    { title: 'Global', icon: <BsMagic /> },
]

function WebsiteBuilder() {
    const { token } = theme.useToken();
    const isDarkMode = useAppSelector(getDarkModeState)
    const [activeOptionTab, setActiveOptionTab] = useState('Sections');
    const [activeDeviceType, setActiveDeviceType] = useState(DEVICE_TYPES[0].title);
    const dispatch = useAppDispatch();
    const builderState = useAppSelector(getBuilderState) || { [uuid()]: [] };
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const [originalDesignState, setOriginalDesignState] = useState({ [uuid()]: [] });

    useEffect(() => {
        if (Boolean(activeComponent.uid)) setActiveOptionTab('Editor');
    }, [activeComponent])

    const getSegmentOptions = () => {
        return SEGMENT_OPTIONS.map((option) => {
            return {
                label: <div style={{ color: activeOptionTab == option.title ? token.colorPrimary : 'inherit' }}
                    className={`${styles.segmentItem} ${activeOptionTab == option.title ? styles.active : ''}`}>
                    <div className={styles.iconWrap} >
                        {option.icon}
                    </div>
                    <div className={styles.title}>{option.title}</div>
                </div>,
                value: option.title
            }
        })
    }

    const onClickOptionsTab = (tab: any) => {
        setActiveOptionTab(tab);
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
    }

    const onDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
        switch (source.droppableId) {
            case destination.droppableId:
                dispatch(updateBuilderState({
                    [destination.droppableId]: reorder(builderState[source.droppableId], source.index, destination.index)
                }));
                break;
            case 'ECOMAI_BUILDER':
                dispatch(updateBuilderState({
                    [destination.droppableId]: copy(ComponentConfigs, builderState[destination.droppableId], source, destination)
                }));
                break;
            default:
                dispatch(updateBuilderState(
                    move(builderState[source.droppableId], builderState[destination.droppableId], source, destination)
                ));
                break;
        }
    };

    const onClickRevert = () => {
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
        dispatch(updateBuilderState(originalDesignState));
        dispatch(showSuccessToast('Changes reverted successfully'));
    }

    const onOutsideEditorClick = () => {
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
    }
    return (
        <Layout className={styles.websiteBuilderWrap}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Layout className={styles.builderLeftWrap}>
                    <Header className={`${styles.headerWrap}`} style={{ background: token.colorBgLayout }}>
                        <Row>
                            <Col className={styles.headingWrap} span={18}>
                                <Text style={{ color: token.colorPrimary }}>{LOGO_TEXT} Website Builder</Text>
                            </Col>
                            <Col className={styles.actionsWrap} span={6}>

                                <Tooltip title="Revert Changes" color={'#8892b0'} key='3'>
                                    <Popconfirm
                                        title="Revert Changes"
                                        description="Are you sure you want revert?"
                                        onConfirm={onClickRevert}
                                    >
                                        <div style={{ color: isDarkMode ? 'white' : 'black', background: '#dee1ec46' }}
                                            onClick={() => { }}
                                            className={`iconWrap hover ${styles.iconWrap}`}>
                                            <BsArrowCounterclockwise />
                                        </div>
                                    </Popconfirm>
                                </Tooltip>

                                {DEVICE_TYPES.map((device: any, i: number) => {
                                    return <React.Fragment key={i}>
                                        <Tooltip title={`${device.title} View`} color={'#8892b0'} key='3'>
                                            <div style={{ color: isDarkMode ? 'white' : 'black', background: activeDeviceType == device.title ? token.colorPrimary : '#dee1ec46' }}
                                                onClick={() => setActiveDeviceType(device.title)}
                                                className={`iconWrap hover ${styles.iconWrap} ${activeDeviceType == device.title ? styles.active : ''}`}>
                                                {device.icon}
                                            </div>
                                        </Tooltip>
                                    </React.Fragment>
                                })}
                            </Col>
                        </Row>
                    </Header>
                    <Content className={`${isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"}`} style={{ background: token.colorBgLayout }}>
                        <div className={styles.editorContent} onClick={onOutsideEditorClick} >
                            <BuilderContainer builderState={builderState} activeDeviceType={activeDeviceType} />
                        </div>
                    </Content>
                </Layout>
                <Sider
                    className={`${styles.builderRightWrap} ${isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"} ${styles[activeDeviceType]}`}>
                    <div className={styles.sidebarWrap}>
                        <div className={styles.segmentWrap}>
                            <Segmented
                                size="large"
                                block={true}
                                value={activeOptionTab}
                                onChange={(tab: any) => onClickOptionsTab(tab)}
                                options={getSegmentOptions()}
                            />
                        </div>
                        {activeOptionTab == SEGMENT_OPTIONS[0].title && <div className={styles.sidebarContentWrap}>
                            <div className={styles.note} style={{ color: token.colorPrimary }}>
                                Drag and drop section to left builder area
                            </div>
                            <SectionsContainer ComponentConfigs={ComponentConfigs} />
                        </div>}
                        {activeOptionTab == SEGMENT_OPTIONS[1].title && <div className={styles.sidebarContentWrap}>
                            <div className={styles.note} style={{ color: token.colorPrimary }}>
                                {Boolean(activeComponent.uid) ? 'Edit content of selected section' : 'You have no component selected'}
                            </div>
                            {Boolean(activeComponent.uid) && <ComponentEditor activeComponent={activeComponent} builderState={builderState} />}
                        </div>}
                        {activeOptionTab == SEGMENT_OPTIONS[2].title && <div className={styles.sidebarContentWrap}>
                            <div className={styles.note} style={{ color: token.colorPrimary }}>
                                Edit global styles and elements
                            </div>
                            <GlobalContainer />
                        </div>}
                    </div>
                </Sider>
            </DragDropContext>
        </Layout>
    )
}

export default WebsiteBuilder