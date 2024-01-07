import ImageRenderer from '@atoms/imageRenderer';
import { SECTION_PAGE } from '@constant/common';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import ComponentRenderer from '@organisms/componentRenderer';
import HomePageSectionsList from '@organisms/sections/homePage';
import styles from '@templatesCSS/websiteBuilder/sectionsContainer.module.scss';
import { Collapse, CollapseProps, theme } from 'antd';
import React from 'react';
const { Panel } = Collapse;

function SectionsContainer() {
    const { token } = theme.useToken();
    const onChange = (key: string | string[]) => {
        // console.log(key);
    };

    const renderComponent = (item, index) => {
        if (item.thumbnail) return <ImageRenderer src={item.thumbnail} />
        else return <ComponentRenderer
            uid={item.uid}
            index={index}
            id={item.id}
            currentPage={SECTION_PAGE}
            componentConfig={item}
        />
    }

    return (
        <Droppable droppableId="ECOMAI_BUILDER" isDropDisabled={true}>
            {(provided, snapshot) => (
                <div className={`${styles.sectionsContainer} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`} ref={provided.innerRef}>
                    <>
                        {HomePageSectionsList.map((section, i) => {
                            const items: CollapseProps['items'] = [
                                {
                                    key: section.name,
                                    label: section.name,
                                    children: <>
                                        {section.sectionConfigsList.map((item: any, index) => {
                                            return <React.Fragment key={index}>
                                                <Draggable key={item.unid} draggableId={item.uid} index={item.unid}>
                                                    {(provided, snapshot) => (
                                                        <React.Fragment>
                                                            <div className={`${styles.componentWrap} ${snapshot.isDragging ? styles.draggingInProgress : ''}`}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={provided.draggableProps.style}>
                                                                {renderComponent(item, index)}
                                                            </div>

                                                            {/* component picked for dragging */}
                                                            {snapshot.isDragging && (
                                                                <div className={`${styles.componentWrap} ${styles.draggingItem} ${styles.draggingInProgress}`}>
                                                                    {renderComponent(item, index)}
                                                                </div>
                                                            )}
                                                        </React.Fragment>
                                                    )}
                                                </Draggable>
                                            </React.Fragment>
                                        })}
                                    </>,
                                }
                            ];

                            return <Collapse key={i}
                                // bordered={false}
                                expandIconPosition='end'
                                defaultActiveKey={[section.name]}
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