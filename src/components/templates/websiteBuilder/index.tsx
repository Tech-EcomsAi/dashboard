'use client'
import styles from '@templatesCSS/websiteBuilder/websiteBuilder.module.scss'
import React, { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Layout, Popconfirm, Row, Space, theme, Typography } from 'antd';
import { getDarkModeState } from '@reduxSlices/clientThemeConfig';
import { useAppSelector } from '@hook/useAppSelector';
import { BsLaptop, BsPhone, BsArrowCounterclockwise } from 'react-icons/bs';
import { v4 as uuid } from 'uuid';
import SectionsContainer from './sectionsContainer';
// import { DragDropContext } from '@hello-pangea/dnd';
import { useAppDispatch } from '@hook/useAppDispatch';
import { BuilderContextType, getBuilderContext, getBuilderState, updateBuilderContext, updateBuilderState } from "@reduxSlices/siteBuilderState";
import ComponentEditor from '@organisms/componentEditor';
import { getActiveEditorComponent, initialState, updateActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import ComponentConfigs from '@organisms/sections/configsList';
import { copy, move, reorder } from '@util/dndHelpers';
import { showSuccessToast } from '@reduxSlices/toast';
import GlobalContainer from './globalContainer';
import dynamic from 'next/dynamic';
import IconButton from '@antdComponent/iconButton';
import TextElement from '@antdComponent/textElement';
import SegmentComponent, { SEGMENT_OPTIONS_TYPES } from '@atoms/segment';
import { LuSettings } from 'react-icons/lu';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { TbChevronDown, TbComponents, TbDevices, TbEdit } from 'react-icons/tb';
import BuilderWrapper from './builderWrapper';

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
    const builderContext: BuilderContextType = useAppSelector(getBuilderContext);
    const dispatch = useAppDispatch();
    const builderState = useAppSelector(getBuilderState) || { [uuid()]: [] };
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const [originalDesignState, setOriginalDesignState] = useState({ [uuid()]: [] });
    const [activePage, setActivePage] = useState(items[0])
    const [collapsedSectionsContainer, setCollapsedSectionsContainer] = useState(false)

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
        <Layout className={styles.websiteBuilderWrap} style={{ gap: collapsedSectionsContainer ? "0px" : "10px" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Layout className={styles.builderLeftWrap} >
                    <Header className={`${styles.headerWrap}`}
                        style={{ background: token.colorBgBase, border: `1px solid ${token.colorBorderBg}`, boxShadow: `${token.colorBorder} 1px 1px 8px -4px` }}>
                        <Row>
                            {/* <Col className={`${styles.headingWrap}`} span={6}>
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
                            </Col> */}
                            <Col className={`${styles.headingWrap}`} span={18}>
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
                                    <Button
                                        shape='circle'
                                        icon={<BsArrowCounterclockwise />}
                                    />
                                </Popconfirm>

                                {DEVICE_TYPES.map((device: any, i: number) => {
                                    return <React.Fragment key={i}>
                                        <IconButton
                                            icon={device.icon}
                                            active={builderContext.deviceType == device.title}
                                            onClickButton={() => dispatch(updateBuilderContext({ ...builderContext, deviceType: device.title }))}
                                            type={'circle'}
                                            tooltip={`${device.title} View`}
                                        />
                                    </React.Fragment>
                                })}
                                <IconButton
                                    icon={collapsedSectionsContainer ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
                                    active={false}
                                    onClickButton={() => setCollapsedSectionsContainer(!collapsedSectionsContainer)}
                                    type={'circle'}
                                    tooltip={collapsedSectionsContainer ? "Expand Sections" : "Collapse Sections"}
                                />
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
                    </div>
                </Sider>
            </DragDropContext>
        </Layout>
    )
}

export default WebsiteBuilder