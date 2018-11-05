import React from 'react';
import { Layout } from 'antd';
import RegisterBox from '../../components/RegisterBox/RegisterBox';
const { Header, Sider, Content } = Layout;

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            baseColor: '#3CB371'
        }
    }
    callback = (e) => {
        this.props.callback();
    }
    render(){
        return (
            <div style={{ height:'100%'}}>
                <Layout style={{ height:'100%'}}>
                    <Header style={{height:'20%',background:this.state.baseColor}}></Header>
                    <Layout>
                        <Sider width={'10%'} style={{background:this.state.baseColor}}></Sider>
                        <Content style={{ background: this.state.baseColor}}>
                            <RegisterBox registerSuccess={this.callback}/>
                        </Content>
                        <Sider width={'30%'} style={{background:this.state.baseColor}}></Sider>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Register;