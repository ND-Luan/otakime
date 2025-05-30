import { AppstoreAddOutlined, BookOutlined, InboxOutlined, MailOutlined, PlayCircleOutlined, SettingOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Avatar, Divider, Dropdown, Layout, Menu, MenuProps, Space, theme } from 'antd';
import React from "react";
import { AcmeLogo } from '../client/header';
import { useRouter } from 'next/navigation'
const { Header, Content, Footer, Sider } = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: `nav ${index + 1}`,
    }),
);

export default function AdminLayout({ children }: TypeAdminLayout) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const router = useRouter()
    const itemMenuUser: MenuProps['items'] = [
        {
            key: '1',
            label: 'My Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Profile',
            extra: '⌘P',
        },
        {
            key: '3',
            label: 'Billing',
            extra: '⌘B',
        },
        {
            key: '4',
            label: 'Settings',
            icon: <SettingOutlined />,
            extra: '⌘S',
        },
    ];
    const itemMenuSlider: MenuProps['items'] = [
        {
            key: 'dashboard',
            label: 'Dasboard',
            type: 'group',
            children: [
                {
                    key: '1', label: 'Dashboard', icon: <BookOutlined />,
                    onClick: () => router.push('/admin/dashboard')
                },
            ],
        },
        {
            key: 'manga',
            label: 'Manga',
            type: 'group',
            children: [
                {
                    key: '2', label: 'Manga', icon: <BookOutlined />,
                    onClick: () => router.push('/admin/manga')
                },
                {
                    key: '3', label: 'Upload Manga', icon: <UploadOutlined />,
                    onClick: () => router.push('/admin/upload-manga')
                },
            ],
        },
        {
            key: 'movie',
            label: 'Movie',
            type: 'group',
            children: [
                {
                    key: '4', label: 'Movie', icon: <PlayCircleOutlined />,
                    onClick: () => router.push('/admin/movie')
                },
                {
                    key: '5', label: 'Upload Movie', icon: <UploadOutlined />,
                    onClick: () => router.push('/admin/upload-movie')
                },
            ],
        },
        {
            key: 'team',
            label: 'Team',
            type: 'group',
            children: [
                {
                    key: '6', label: 'Team', icon: <VideoCameraOutlined />,
                    onClick: () => router.push('/admin/team')
                },
            ],
        },
        {
            key: 'Blog',
            label: 'Blog',
            type: 'group',
            children: [
                {
                    key: '7', label: 'Blog', icon: <InboxOutlined />,
                    onClick: () => router.push('/admin/blog')
                },
            ],
        },
        {
            key: 'admin',
            label: 'Administrator',
            type: 'group',
            children: [
                {
                    key: '8', label: 'Category', icon: <AppstoreAddOutlined />,
                    onClick: () => router.push('/admin/category')
                },
                {                               
                    key: '9', label: 'Send Mail', icon: <MailOutlined />,
                    onClick: () => router.push('/admin/send-mail')
                },
                {
                    key: '10', label: 'User & Role', icon: <UserOutlined />,
                    onClick: () => router.push('/admin/user-role')
                },
            ],
        }
    ]
    return (
        <AntdRegistry>
            <Layout>
                <Sider
                    theme='light'
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div style={{}}>
                        <AcmeLogo />
                        <Divider />
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={itemMenuSlider}
                            onChange={(e) => {
                                console.log(e)
                            }}
                        />
                    </div>
                    {/* <p className='text-center italic'>VERSION 1.0</p> */}
                </Sider>
                <Layout>
                    <Header className="flex justify-between" style={{ background: colorBgContainer }} >
                        <div >Dashboard</div>
                        <Dropdown menu={{ items: itemMenuUser }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    < Avatar
                                        style={{ backgroundColor: '#87d068' }}
                                        icon={<UserOutlined />}
                                    />
                                </Space>
                            </a>
                        </Dropdown>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 'calc(100dvh  - 88px)',
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </AntdRegistry>
    );
}

type TypeAdminLayout = {
    children: React.ReactNode
}