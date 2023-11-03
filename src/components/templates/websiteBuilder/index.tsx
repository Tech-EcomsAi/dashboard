'use client'
import styles from '@templatesCSS/websiteBuilder/websiteBuilder.module.scss'
import React, { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Layout, Popconfirm, Row, Space, theme, Tooltip, Typography } from 'antd';
import { useAppSelector } from '@hook/useAppSelector';
import { getDarkModeState } from '@reduxSlices/darkMode';
import { BsFillPencilFill, BsLaptop, BsPhone, BsFillLayersFill, BsArrowCounterclockwise } from 'react-icons/bs';
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
import { BiDownArrow, BiHome } from 'react-icons/bi';
import IconButton from '@antdComponent/iconButton';
import TextElement from '@antdComponent/textElement';
import SegmentComponent, { SEGMENT_OPTIONS_TYPES } from '@atoms/segment';
import { LuSettings } from 'react-icons/lu';
import { MdArrowDropDown } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoIosArrowDropdown } from 'react-icons/io';
import { TbChevronDown, TbComponents, TbEdit, TbLayersIntersect, TbPencilCog } from 'react-icons/tb';
import ReactFlowWrapper from './reactFlowWrapper';

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
    // { title: 'Tablet', icon: <BsTabletLandscape /> },
    { title: 'Desktop', icon: <BsLaptop /> }
]

const SEGMENT_OPTIONS = [
    { key: 'Sections', value: 'Sections', icon: <TbComponents /> },
    { key: 'Editor', value: 'Editor', icon: <TbEdit /> },
    { key: 'Site', value: 'Global', icon: <LuSettings /> },
]

const items: any = [
    {
        key: '1',
        label: 'Home Page',
    },
    {
        key: '2',
        label: 'About Us',
    },
    {
        key: '3',
        label: 'Contact Us',
    },
];

function WebsiteBuilder() {
    const { token } = theme.useToken();
    const isDarkMode = useAppSelector(getDarkModeState)
    const [activeOptionTab, setActiveOptionTab] = useState('Sections');
    const [activeDeviceType, setActiveDeviceType] = useState(DEVICE_TYPES[0].title);
    const dispatch = useAppDispatch();
    const builderState = useAppSelector(getBuilderState) || { [uuid()]: [] };
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const [originalDesignState, setOriginalDesignState] = useState({ [uuid()]: [] });
    const [activePage, setActivePage] = useState(items[0])

    useEffect(() => {
        if (Boolean(activeComponent.uid)) setActiveOptionTab('Editor');
    }, [activeComponent])

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

    const handleMenuClick: any = (e) => {
        console.log('click', e);
        setActivePage(items.find((page: any) => page.key === e.key))
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Layout className={styles.websiteBuilderWrap}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Layout className={styles.builderLeftWrap}>
                    <Header className={`${styles.headerWrap}`} style={{ background: token.colorBgBase }}>
                        <Row>
                            <Col className={`${styles.headingWrap}`} span={6}>
                                <Space>
                                    <IconButton
                                        icon={<BiHome />}
                                        active={false}
                                        onClickButton={() => { }}
                                        type={'circle'}
                                        tooltip="Back to dashboard"
                                    />
                                    <TextElement color={token.colorPrimary} text={`${LOGO_TEXT} Website Builder`} />
                                </Space>
                            </Col>
                            <Col className={`${styles.headingWrap}`} span={12}>
                                <Space>
                                    <Space>
                                        <TextElement color={token.colorText} text={`Current page :`} />
                                        <Dropdown menu={menuProps}>
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
                            <Col className={styles.actionsWrap} span={6}>
                                <Popconfirm
                                    title="Revert Changes"
                                    description="Are you sure you want revert?"
                                    onConfirm={onClickRevert}
                                >
                                    <IconButton
                                        icon={<BsArrowCounterclockwise />}
                                        active={false}
                                        onClickButton={() => { }}
                                        type={'circle'}
                                        tooltip="Revert Changes"
                                    />
                                </Popconfirm>

                                {DEVICE_TYPES.map((device: any, i: number) => {
                                    return <React.Fragment key={i}>
                                        <IconButton
                                            icon={device.icon}
                                            active={activeDeviceType == device.title}
                                            onClickButton={() => setActiveDeviceType(device.title)}
                                            type={'circle'}
                                            tooltip={`${device.title} View`}
                                        />
                                    </React.Fragment>
                                })}
                            </Col>
                        </Row>
                    </Header>
                    <Content className={`${isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"}`} style={{ background: token.colorBgLayout }}>
                        <div className={styles.editorContent} onClick={onOutsideEditorClick} >
                            <ReactFlowWrapper builderState={builderState} activeDeviceType={activeDeviceType} ></ReactFlowWrapper>
                        </div>
                    </Content>
                </Layout>
                <Sider
                    className={`${styles.builderRightWrap} ${isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"} ${styles[activeDeviceType]}`}>
                    <div className={styles.sidebarWrap}>
                        <div className={styles.segmentWrap}>
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
                                Drag and drop section to left builder area
                            </div>
                            <SectionsContainer ComponentConfigs={ComponentConfigs} />
                        </div>}
                        {activeOptionTab == SEGMENT_OPTIONS[1].key && <div className={styles.sidebarContentWrap}>
                            <div className={styles.note} style={{ color: token.colorPrimary }}>
                                {Boolean(activeComponent.uid) ? 'Edit content of selected section' : 'You have no component selected'}
                            </div>
                            {Boolean(activeComponent.uid) && <ComponentEditor activeComponent={activeComponent} builderState={builderState} />}
                        </div>}
                        {activeOptionTab == SEGMENT_OPTIONS[2].key && <div className={styles.sidebarContentWrap}>
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