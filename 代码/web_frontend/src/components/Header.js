import React from 'react';
import '../css/browse.css'
import {Menu, Layout} from 'antd';
import {UserOutlined, AppstoreOutlined, RocketOutlined, ShoppingCartOutlined, HomeOutlined,UnorderedListOutlined, BarChartOutlined, UserDeleteOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
const { Header, Content, Footer } = Layout;

class MyHeader extends React.Component{

    render(){
        return (
            <Header style={{backgroundColor: "#be123c"}}>
                <div className="logo">
                    <p style={{marginBottom: '100px',height: '15px'}} className="header_heading">
                        交我团
                    </p>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{backgroundColor: "#be123c"}}
                    defaultSelectedKeys={['2']}
                >
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="#">
                            主页
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="cart" icon={<AppstoreOutlined />}>
                        <Link to="/switch1">
                            附近拼团
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="begin" icon={<RocketOutlined />}>
                        <Link to="/create">
                            一键开团
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="order" icon={<UnorderedListOutlined />}>
                        <Link to="/order">
                            订单
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="statistics" icon={<UserOutlined />}>
                        {/* <a href="#">
                            个人
                        </a> */}
                        <Link to="/myProfile">
                        个人
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default MyHeader;

