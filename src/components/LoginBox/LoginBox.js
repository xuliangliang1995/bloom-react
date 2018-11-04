import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Redirect,Link } from 'react-router-dom';
import $axios from '../../components/Axios/Axios';
const FormItem = Form.Item;


class NormalLoginForm extends React.Component {
    constructor(){
        super();
        this.state = {
            isLogin: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let _this = this;
        _this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $axios.get('/gardener',{
                    params: values
                })
                    .then(function(response) {
                        console.log(response.data);
                        console.log(response.status);
                        console.log(response.statusText);
                        console.log(response.headers);
                        console.log(response.config);
                        _this.setState({
                            isLogin:true
                        })
                    });
            }
        });
    }

    render() {
        if(this.state.isLogin){
            return (
                <Redirect to={"/home"}/>
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