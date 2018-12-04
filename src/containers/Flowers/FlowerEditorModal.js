import React from 'react';
import {Form, Input, Modal, message} from 'antd';
import Request from "../../components/Axios/Axios";
const FormItem = Form.Item;

class FlowerModal extends React.Component{
    constructor(props){
        super();
        this.state={
            flowerId:props.flowerId,
            name:'',
            moral:''
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            flowerId:nextProps.flowerId
        })
        if(nextProps.flowerId > 0){
            const path = '/gardener/'+this.props.gardenerId+'/flowers/'+nextProps.flowerId;
            Request.get(path)
                .then(res => {
                    this.setState({
                        name: res.data.name,
                        moral: res.data.moral
                    })
                })
        }
    }
    handleCancel = (e) =>{
        e.preventDefault()
        this.props.closeFlowerModal()
    }
    closeWithRefresh = () => {
        this.props.closeWithRefresh()
    }
    handleSubmit=(e) => {
        e.preventDefault();
        let _this = this;
        _this.props.form.validateFields((err, values) => {
            if (!err) {
                if(this.state.flowerId > 0){
                    const path = '/gardener/'+this.props.gardenerId+'/flowers/'+this.state.flowerId;
                    Request.put(path,values)
                        .then(() => {
                            message.info("修改成功！")
                            this.closeWithRefresh()
                        })
                        .catch(err => {
                            message.warning(err.response.data[0].message)
                        })
                }else{
                    const path = '/gardener/'+this.props.gardenerId+'/flowers';
                    Request.post(path,values)
                        .then(res => {
                            message.info("添加成功！")
                            this.closeWithRefresh(e)
                        })
                        .catch(err => {
                            message.warning(err.response.data[0].message)
                        })
                }
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title={ this.props.flowerId>0?'编辑':'添加'}
                    visible={ this.props.modalVisible }
                    onOk={this.handleSubmit.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <Form>
                        <FormItem>
                            {getFieldDecorator('name', {
                                rules: [{ required:true,message:'花名不能为空' }],
                                initialValue: this.state.name
                            })
                            (
                                <Input placeholder={ '花名' }/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('moral',{
                                rules:[{ required:true,message:'花语不能为空' }],
                                initialValue: this.state.moral
                            })
                            (
                                <Input placeholder={ '花语' }/>
                            )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const FlowerEditorModal = Form.create()(FlowerModal);

export default FlowerEditorModal;