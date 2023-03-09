import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../css/screen.css';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import MyHeader from "../components/Header";
import {RenderScreen} from "./BrowseView";
import {history} from "../utils/history";
import {Box} from "native-base";

let w = window.innerWidth * 0.5;
let h = window.innerHeight;

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('今日热团', '1', <AppstoreOutlined />),
    getItem('水果鲜花', "2", <AppstoreOutlined />),
    getItem('肉禽蛋', '3', <AppstoreOutlined />),
    getItem('水产海鲜', '4', <AppstoreOutlined />),
    getItem('乳品烘焙', '乳品烘焙', <AppstoreOutlined />),
    getItem('酒水饮料', '酒水饮料', <AppstoreOutlined />),
];


const SwitchScreen3 = () => {

    const onClick = (e) => {
        console.log('click ', e.key);
        if(e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4')
            history.push('/switch' + e.key);
    };

    return (
        <div>
            <MyHeader/>
            <Layout hasSider>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: "#9f1239",
                    }}
                >
                    <Menu theme="dark" mode="inline" onClick={onClick} defaultSelectedKeys={['3']} items={items}
                          style={{backgroundColor: "#9f1239"}}/>
                </Sider>
                <Layout
                    className="site-layout"
                    style={{
                        marginLeft: 200,
                    }}
                >


                    <Content
                        style={{
                            margin: '24px 16px 0',
                            overflow: 'initial',
                        }}
                    >
                        <RenderScreen props='肉禽蛋'/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default SwitchScreen3;
