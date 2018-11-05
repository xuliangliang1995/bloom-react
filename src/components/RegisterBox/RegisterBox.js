import React from 'react';
import { Form, Input, Tooltip, Icon, Button, message } from 'antd';
import $axios from '../../components/Axios/Axios';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let _this = this;
        _this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $axios.post('/gardener',values)
                .then(function(response){
                    console.log(response.data);
                    console.log(response.status);
                    if(_this.props.registerSuccess){
                        message.success("注册成功！");
                        _this.props.registerSuccess();
                    }
                })
                .catch(error => {
                    message.warning(error.response.data[0].message);
                })
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致！');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            昵称&nbsp;
                            <Tooltip title="你想让系统怎么称呼您呢?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickName', {
                        rules: [{ required: true, message: '请输入昵称！', whitespace: true },
                            {min:2,max:7,message:'昵称请保持2至7个字之间！'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户名:"
                >
                    {getFieldDecorator('username',{
                        rules:[{
                            required: true, message:'请输入用户名！'
                        },{
                            min:5,max:12,message:'用户名长度请保持5至12之间！'
                        }]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码:"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码！',
                        },{
                            min:8,max:20,message:'密码长度请保持在8至20之间！'
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码确认:"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            邮箱&nbsp;
                            <Tooltip title="重置密码所需要的信息，请认真填写！">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式有误！',
                        }, {
                            required: true, message: '请输入邮箱！',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>


                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">注册</Button>
                </FormItem>
            </Form>
        );
    }
}

const RegisterBox = Form.create()(RegistrationForm);

export default RegisterBox;