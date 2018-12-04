import React, { Component } from 'react';
import { Layout, Carousel,Card, Drawer } from 'antd';
import './App.css';
import LoginBox from './components/LoginBox/LoginBox';
import Register from './containers/Register/Register';
import { Redirect } from 'react-router-dom';
import Request from './components/Axios/Axios';
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
    constructor(){
        super();
        this.state = {
            baseColor: 'rgb(60, 179, 113)',
            themeColor: 'rgb(46, 139, 87)',
            visible: false,
            gardenerId: -1
        }
    }
    componentDidMount(){
        this.getLoginInfo()
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    loginSuccess = (gardenerId) => {
        console.log(gardenerId)
        this.setState({
            gardenerId: gardenerId
        })
    }
    loginOut = () => {
        window.location.href='/gardener/loginOut';
        this.setState({
            gardenerId: 0
        })
    }
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return;
        }
    }
    getLoginInfo = () => {
        Request.get('/gardener/loginInfo')
            .then(response => {
                this.setState({
                    gardenerId: response.data
                })
            })
            .catch(error => this.setState({
                gardenerId: 0
            }))
    }
    render() {
        if(this.state.gardenerId === -1){
            return (
                <div></div>
            )
        }
        if(this.state.gardenerId > 0){
            return (
               <Redirect to={{
                    pathname: "/home",
                    state: {
                        gardenerId: this.state.gardenerId,
                        loginOut: this.loginOut
                    }
                }}/>
            )
        }
        return (
            <div className="App">
                <Layout className="App">
                    <Header style={{ height:'10%',background:this.state.baseColor}}></Header>
                    <Layout style={{ height:'700px'}}>
                        <Sider width="10%" style={{ height:'100%'}} style={{ background:this.state.baseColor }}></Sider>
                        <Content width="60%" style={{ height:'100%'}} className="Content">
                            <Carousel autoplay>
                                <div>
                                    <img alt="example" height={'800px'} width={'100%'} src="https://grasswort.oss-cn-hangzhou.aliyuncs.com/grasswort/img/girl.jpg_compress" />
                                </div>
                                <div>
                                    <img alt="example" height={'800px'} width={'100%'} src="https://grasswort.oss-cn-hangzhou.aliyuncs.com/grasswort/img/girl2.jpg_compress" />
                                </div>
                                <div>
                                    <img alt="example" height={'800px'} width={'100%'} src="https://grasswort.oss-cn-hangzhou.aliyuncs.com/grasswort/img/girl3.jpg_compress" />
                                </div>
                            </Carousel>
                        </Content>
                        <Sider width="20%" className="Content" style={{ background:this.state.themeColor,height:'100%'}}>
                            <Layout>
                                <Content style={{ height: '50%',background:this.state.themeColor}}>
                                    <img alt="example" style={{ margin:'10%',width:'80%',height:'80%'}} src="https://grasswort.oss-cn-hangzhou.aliyuncs.com/logo/si_ming_yue.jpg_origin" />
                                </Content>
                                <Layout style={{ height: '50%'}}>
                                    <Header style={{ height:'10%',background:this.state.themeColor}}></Header>
                                    <Layout style={{ height:'80%'}}>
                                        <Sider width='10%' style={{background:this.state.themeColor}}></Sider>
                                        <Content style={{ height: '100%',background:this.state.themeColor}}>
                                            <LoginBox showDrawer={this.showDrawer} loginSuccess={this.loginSuccess}/>
                                        </Content>
                                        <Sider width='10%' style={{background:this.state.themeColor}}></Sider>
                                    </Layout>
                                    <Footer style={{ height:'10%',background:this.state.themeColor}}></Footer>
                                </Layout>
                            </Layout>
                        </Sider>
                        <Sider width="10%" className="Content" style={{ background:this.state.baseColor,height:'100%' }}></Sider>
                    </Layout>
                    <Footer style={{ height:'20%',background:this.state.baseColor}}>https://grasswort.com</Footer>
                </Layout>
                <Drawer
                    placement="right"
                    width={500}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={{padding:'0px',height:'100%'}}
                >
                    <Register callback={this.onClose}/>
                </Drawer>
            </div>
        );
    }
}

export default App;
