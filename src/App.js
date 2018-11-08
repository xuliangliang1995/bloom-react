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

    getLoginInfo = () => {
        Request.get('/gardener/loginInfo')
            .then(response => this.setState({
                gardenerId: response.data.id
            }))
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
                    <Layout>
                        <Sider width="10%" style={{ background:this.state.baseColor }}></Sider>
                        <Content width="60%" className="Content">
                            <Carousel autoplay>
                                <div>
                                    <Card
                                        hoverable
                                        style={{ width: '100%'}}
                                        cover={<img alt="example" style={{ height:'700px'}} src="https://goss.veer.com/creative/vcg/veer/800water/veer-155204544.jpg" />}
                                    >
                                    </Card>
                                </div>
                                <div>
                                    <Card
                                        hoverable
                                        style={{ width: '100%'}}
                                        cover={<img alt="example" style={{ height:'700px'}} src="https://gaopin-img.bj.bcebos.com/133101725027.jpg" />}
                                    >
                                    </Card>
                                </div>
                                <div>
                                    <Card
                                        hoverable
                                        style={{ width: '100%'}}
                                        cover={<img alt="example" style={{ height:'700px'}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536778670264&di=07c7563309915c3a239345a3820d6f3b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cc13554242c80000019ae9e173e9.jpg%401280w_1l_2o_100sh.jpg" />}
                                    >
                                    </Card>
                                </div>
                                <div>
                                    <Card
                                        hoverable
                                        style={{ width: '100%'}}
                                        cover={<img alt="example" style={{ height:'700px'}} src="http://pic1.win4000.com/wallpaper/2018-08-24/5b7fa5a5c0104.jpg" />}
                                    >
                                    </Card>
                                </div>
                            </Carousel>
                        </Content>
                        <Sider width="20%" className="Content" style={{ background:this.state.themeColor}}>
                            <Layout style={{height:'100%'}}>
                                <Content style={{ height: '50%',background:this.state.themeColor}}>
                                    <img alt="example" style={{ margin:'10%',width:'80%',height:'80%'}} src="http://jzbka2015.oss-cn-beijing.aliyuncs.com/2018/1025/5356da1a0aad4612900050edb69fba41.jpg" />
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
                        <Sider width="10%" className="Content" style={{ background:this.state.baseColor }}></Sider>
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
