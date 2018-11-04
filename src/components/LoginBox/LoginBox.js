import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Redirect,Link } from 'react-router-dom';
import Request from '../../components/Axios/Axios';
const FormItem = Form.Item;


class NormalLoginForm extends React.Component {
    constructor(){
        super();
        this.state = {
            gardenerId: 0
        }
    }
    componentDidMount(){
        this.loginCheck()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let _this = this;
        _this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                Request.get('/gardener',{
                    params: values
                })
                    .then(function(response) {
                        _this.setState({
                            gardenerId:response.data.id
                        })
                    });
            }
        });
    }
    loginCheck = () => {
        Request.get('/gardener/loginInfo')
            .then((res) => this.setState({
                gardenerId: res.data
            }))
    }

    render() {
        if(this.state.gardenerId > 0){
            return (
                <Redirect to={{
                    pathname: "/home",
                    state: {
                        gardenerId: this.state.gardenerId
                    }
                }}/>
            )
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox style={{ float:'left'}}>记住账户</Checkbox>
                    )}
                    <a style={{ float:'right'}} className="login-form-forgot" href="">忘记密码</a>
                    <Button style={{ width:'100%'}} type="default" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <Link to={"/register"}>现在去注册！</Link>
                    {/*<a href="">现在去注册！</a>*/}
                </FormItem>
            </Form>
        );
    }
}

const LoginBox = Form.create()(NormalLoginForm);


export default LoginBox;