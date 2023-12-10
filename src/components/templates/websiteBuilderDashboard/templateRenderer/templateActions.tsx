import ActionIconButton from '@antdComponent/iconButton/actionIconButton';
import { Tooltip, Space, Button, Popconfirm, message, Dropdown } from 'antd';
import React, { Fragment } from 'react'
import { LuEye, LuPenSquare, LuMoreHorizontal, LuUserPlus, LuCopy, LuDelete, LuStar, LuTrash, LuHeart, LuExternalLink } from 'react-icons/lu';

type TEMPLATE_ACTION = {
    key: "preview" | "edit" | "more" | "favorite" | "use";
    title: string;
    icon: React.JSX.Element;
}

const PLATFORM_TEMPLATES_ACTIONS: TEMPLATE_ACTION[] = [
    { key: 'preview', title: "Open template in new tab", icon: LuExternalLink },
    { key: 'use', title: "Use this template", icon: LuPenSquare },
    { key: "favorite", title: "Add to Favorite", icon: LuHeart }
]

const USER_TEMPLATES_ACTIONS: TEMPLATE_ACTION[] = [
    { key: 'preview', title: "Open template in new tab", icon: LuExternalLink },
    { key: 'edit', title: "Edit template", icon: LuPenSquare },
    { key: 'more', title: "More Actions", icon: LuMoreHorizontal }
]

const MORE_ACTIONS = [
    { key: 'edit', label: "Edit/Clone template", icon: <ActionIconButton icon={LuCopy} /> },
    { key: 'Delete', label: "Delete template", icon: <ActionIconButton icon={LuTrash} /> },
    { key: 'collaborators', label: "Add Collaborators", icon: <ActionIconButton icon={LuUserPlus} /> },
]

const onClickAction = (action) => {
    message.open({
        content: action + " clicked", type: "success"
    })
}

const templateActions = (isPlatformTemplate) =>
    (isPlatformTemplate ? PLATFORM_TEMPLATES_ACTIONS : USER_TEMPLATES_ACTIONS)
        .map((action: TEMPLATE_ACTION) => {
            if (action.key == "preview") {
                return <Fragment key={action.key}>
                    <Tooltip title={action.title}>
                        <Space align='center' onClick={() => onClickAction(action.key)}>
                            <ActionIconButton icon={action.icon} />
                        </Space>
                    </Tooltip>
                </Fragment>
            } else if (action.key == "edit") {
                return <Fragment key={action.key}>
                    <Popconfirm
                        title="Edit Template"
                        description="Are you sure you want to edit this template?"
                        onConfirm={(e) => onClickAction(action.key)}>
                        <Space align='center'>
                            <ActionIconButton icon={action.icon} />
                        </Space>
                    </Popconfirm>
                </Fragment>
            } else if (action.key == "use") {
                return <Fragment key={action.key}>
                    <Popconfirm
                        title="Use This Template"
                        description="Are you sure you want to use this template?"
                        onConfirm={(e) => onClickAction(action.key)}>
                        <Space align='center'>
                            <ActionIconButton icon={action.icon} />
                        </Space>
                    </Popconfirm>
                </Fragment>
            } else if (action.key == "favorite") {
                return <Fragment key={action.key}>
                    <Tooltip title={action.title}>
                        <Space align='center' onClick={() => onClickAction(action.key)}>
                            <ActionIconButton icon={action.icon} />
                        </Space>
                    </Tooltip>
                </Fragment>
            } else if (action.key == "more") {
                return <Fragment key={action.key}>
                    <Dropdown
                        trigger={['click']}
                        placement="top"
                        arrow
                        menu={{
                            items: MORE_ACTIONS,
                            onClick: (action: any) => onClickAction(action.key),
                            defaultSelectedKeys: [],
                            inlineCollapsed: true
                        }}>
                        <Space align='center'>
                            <ActionIconButton icon={action.icon} />
                        </Space>
                    </Dropdown>
                </Fragment>
            } else {
                return null;
            }
        })

export default templateActions