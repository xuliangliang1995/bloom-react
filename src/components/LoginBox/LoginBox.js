import React from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import Request from '../../components/Axios/Axios';
const FormItem = Form.Item;


class NormalLoginForm extends React.Component {
    constructor(){
        super();
        this.state = {
            gardenerId: -1
        }
    }
    //登录成功
    loginSuccess=(gardnerId)=>{
        this.props.loginSuccess(gardnerId);
    }
    //展示注册框
    showRegisterBox=(e) => {
        this.props.showDrawer()
    }
    //提交表单
    handleSubmit = (e) => {
        e.preventDefault();
        let _this = this;
        _this.props.form.validateFields((err, values) => {
            if (!err) {
                Request.get('/gardener',{
                    params: values
                })
                    .then(response => {
                        message.success("登录成功！");
                        this.loginSuccess(response.data.id)
                    })
                    .catch(error => {
                        message.warning(error.response.data[0].message);
                    })
            }
        });
    }
    render() {
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
                    <a onClick={this.showRegisterBox}>现在去注册！</a>
                   {/* <Link to={"/register"}>现在去注册！</Link>*/}
                    {/*<a href="">现在去注册！</a>*/}
                </FormItem>
            </Form>
        );
    }
}

const LoginBox = Form.create()(NormalLoginForm);


export default LoginBox;