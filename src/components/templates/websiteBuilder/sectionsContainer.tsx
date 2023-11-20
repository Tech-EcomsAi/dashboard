import React from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd';
import styles from '@templatesCSS/websiteBuilder/sectionsContainer.module.scss'
import ComponentRenderer from '@organisms/componentRenderer';
import SectionsList from '@organisms/sections/sectionsList';
import { Collapse, CollapseProps, theme } from 'antd';
import { SECTION_PAGE } from '@constant/common';
const { Panel } = Collapse;

function SectionsContainer({ ComponentConfigs }) {
    const { token } = theme.useToken();
    const onChange = (key: string | string[]) => {
        // console.log(key);
    };


    return (
        <Droppable droppableId="ECOMAI_BUILDER" isDropDisabled={true}>
            {(provided, snapshot) => (
                <div className={`${styles.sectionsContainer} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`} ref={provided.innerRef}>
                    <>
                        {SectionsList.map((section, i) => {
                            const items: CollapseProps['items'] = [
                                {
                                    key: section,
                                    label: section,
                                    children: <>
                                        {ComponentConfigs.map((item, index) => {
                                            return <React.Fragment key={index}>
                                                {item.section == section && <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <React.Fragment>
                                                            <div className={`${styles.componentWrap} ${snapshot.isDragging ? styles.draggingInProgress : ''}`}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={provided.draggableProps.style}>
                                                                <ComponentRenderer
                                                                    uid={item.uid}
                                                                    componentsList={ComponentConfigs}
                                                                    index={index}
                                                                    parentId={item.id}
                                                                    currentPage={SECTION_PAGE}
                                                                    componentConfig={item}
                                                                />
                                                            </div>

                                                            {/* component picked for dragging */}
                                                            {snapshot.isDragging && (
                                                                <div className={`${styles.componentWrap} ${styles.draggingItem} ${styles.draggingInProgress}`}>
                                                                    <ComponentRenderer
                                                                        uid={item.uid}
                                                                        componentsList={ComponentConfigs}
                                                                        index={index}
                                                                        parentId={item.id}
                                                                        currentPage={SECTION_PAGE}
                                                                        componentConfig={item}
                                                                    />
                                                                </div>
                                                            )}
                                                        </React.Fragment>
                                                    )}
                                                </Draggable>}
                                            </React.Fragment>
                                        })}
                                    </>,
                                }
                            ];

                            return <Collapse key={i}
                                // bordered={false}
                                expandIconPosition='end'
                                defaultActiveKey={[section]}
                                onChange={onChange}
                                size="small"
                                className={styles.sectionConatiner}
                                items={items}
                                style={{ borderColor: token.colorBorderSecondary }}
                            />
                        })}
                    </>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default SectionsContainer