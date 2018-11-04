import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import App from "../../App";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menus:props.menus?props.menus:defaultMenu
        }

    }
    render(){
        let logo = {
            width: '120px',
            height: '31px',
            background: 'rgba(255,255,255,.2)',
            margin: '16px 28px 16px 0',
            float: 'left'
        };
        const topMenus = this.state.menus.map(menu =>
            <Menu.Item key={menu.key} style={{ float:'right'}}><Icon type={menu.icon} />{menu.name}</Menu.Item>
        )
        const leftMenus = this.state.menus.map(menu =>
            <SubMenu key={menu.key} title={<span><Icon type={menu.icon} />{menu.name}</span>}>
                {
                    menu.menus.map(submenu =>
                        <Menu.Item key={submenu.key}><Link to={submenu.to}>{submenu.name}</Link></Menu.Item>
                    )
                }
            </SubMenu>
        )
        return (
            <div>
                <BrowserRouter basename={'/home'}>
                    <Layout>
                        <Header className="header">
                            <div className='logo' style={ logo }/>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{ lineHeight: '64px' }}
                            >
                                {topMenus}
                            </Menu>
                        </Header>
                        <Layout>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%', borderRight: 0 }}
                                >
                                    {leftMenus}
                                </Menu>
                            </Sider>
                            <Layout style={{ padding: '0 24px 24px',minHeight:'900px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>List</Breadcrumb.Item>
                                    <Breadcrumb.Item>App</Breadcrumb.Item>
                                </Breadcrumb>
                                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                        <Route path={"/flowers"} component={App} exact/>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </BrowserRouter>
            </div>

        )
    }
}
const defaultMenu = [
    {
        key : '001',
        name: '我的花园',
        icon: 'book',
        menus: [
            {
                key: '001001',
                name: '我的花园',
                to: '/flowers'
            },
            {
                key:'001002',
                name: '时间轴',
                to: '/time'
            }
        ]
    },
    {
        key: '002',
        name: '账户信息',
        icon: 'user',
        menus: [
            {
                key: '002001',
                name: '基本信息',
                to: '/baseInfo'
            },{
                key: '002002',
                name: '完善信息',
                to: '/perfectInfo'
            }
        ]
    },
    {
        key: '003',
        name: '我的成就',
        icon: 'trophy',
        menus: [
            {
                key: '003001',
                name: '我的成就',
                to: '/achievement'
            }
        ]
    }
]
export default HomePage;

