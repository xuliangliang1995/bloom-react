import React from 'react';
import { Layout } from 'antd';
import RegisterBox from '../../components/RegisterBox/RegisterBox';
const { Header, Footer, Sider, Content } = Layout;

class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            baseColor: '#3CB371'
        }
    }
    render(){
        return (
            <div style={{ height:'100%'}}>
                <Layout style={{ height:'100%'}}>
                    <Header style={{height:'10%',background:this.state.baseColor}}></Header>
                    <Layout>
                        <Sider width={'10%'} style={{background:this.state.baseColor}}></Sider>
                        <Content style={{ background: this.state.baseColor}}>
                            <RegisterBox/>
                        </Content>
                        <Sider width={'40%'} style={{background:this.state.baseColor}}></Sider>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Register;