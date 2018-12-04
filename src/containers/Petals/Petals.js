import React from 'react';
import { Table, Divider,Icon,Modal,Button,message,Radio,Popconfirm  } from 'antd';
import Request from '../../components/Axios/Axios.js';
import { Link,Redirect } from 'react-router-dom';
const { Column } = Table;

class Petals extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flowerId: props.match.params.flowerId
                ?props.match.params.flowerId
                :0,
            data: [],
            pagination: {
                current: 1,
                defaultCurrent: 1,
                defaultPageSize: 10,
                pageSize: 10,
                total: 0
            },
            loading: false,
            addPetal:false,
            modal:null
        }
    }
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            page_size: pagination.pageSize,
            page_no: pagination.current
        });
    }
    fetch = (params = {}) => {
        let _this = this;
        _this.setState({ loading: true });
        Request.get('/flowers/'+this.state.flowerId+'/petal',{
            params: params
        })
            .then(function(response){
                const pagination = { ..._this.state.pagination };
                pagination.total = response.data.total;
                _this.setState({
                    loading: false,
                    data: response.data.content,
                    pagination: pagination
                })
            })
    }

    componentDidMount() {
        this.fetch();
    }

    addPetals=()=>{
        if(this.state.modal){
            this.state.modal.destroy()
        }
        this.setState({
            addPetal: true
        })
    }
    choosePetalVariety = () => {
        this.setState({
            modal: Modal.info({
                title:'请选择一个类型',
                content: (
                    <div style={{ width:'100%'}}>
                        <Radio.Group style={{ marginLeft:'auto',marginRight:'auto',width:'100%' }}>
                            <Radio.Button
                                onClick = { this.addPetals }
                                style={{ width:'50%',textAlign:'center'}}
                            >富文本</Radio.Button>
                            <Radio.Button
                                onClick={ () => {
                                    message.info("暂不支持该选择！")
                                }}
                                style={{ width:'50%',textAlign:'center'}}
                            >链接</Radio.Button>
                        </Radio.Group>
                    </div>
                ),
                okText: '取消'
            })
        })
    }
    deleteConfirm = (petalId,e) => {
        e.preventDefault()
        const path = '/flowers/'+this.state.flowerId+'/petal/'+petalId;
        Request.delete(path).then(res => {
            message.info(res.data);
            this.handleTableChange(this.state.pagination);
        }).catch(err => {
            console.log(err)
        })
    }
    render(){
        if(this.state.addPetal){
            return (
                <Redirect to={ "/flowers/"+this.state.flowerId+"/petals/0/editor" }/>
            )
        }
        return (
            <div>
                <Table dataSource={this.state.data}
                       rowKey={record => record.id}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange}
                >
                    <Column
                        title={<Icon type="plus" onClick={ this.choosePetalVariety }/>}
                        dataIndex="id"
                        key="id"
                        render = {(text,record,index) => {
                            return parseInt(index+1+(this.state.pagination.current-1)*this.state.pagination.pageSize);
                        }}
                    />
                    <Column
                        title="叶子"
                        dataIndex="name"
                        key="name"
                        render={(name,record) =>{
                            let path = "/flowers/"+this.state.flowerId+"/petals/"+record.id;
                            return (
                                <span>
                                    <Icon type="file" theme="outlined" />&nbsp;
                                    <Link to={ path }>{ name }</Link>
                                </span>
                            )
                        }}
                    />
                    <Column
                        title="创建时间"
                        dataIndex="ct"
                        key="ct"
                    />
                    <Column
                        title="操作"
                        key="action"
                        render={(text,record) => {
                            switch (record.petalVarietyId) {
                                case 1:
                                    return (
                                        <span>
                                            <Link to={"/flowers/" + this.state.flowerId + "/petals/" + record.id + "/editor"}>编辑</Link>
                                            <Divider type="vertical"/>
                                            <Popconfirm title="确认删除?" onConfirm={this.deleteConfirm.bind(this, record.id)}
                                                        okText="是" cancelText="否">
                                                <a href="#">删除</a>
                                            </Popconfirm>
                                        </span>
                                    )
                                case 2:
                                    return (
                                        <span>
                                            <Link to={"/flowers/" + this.state.flowerId + "/petals/" + record.id + "/editor"} disabled>编辑</Link>
                                            <Divider type="vertical"/>
                                            <Popconfirm title="确认删除?" onConfirm={this.deleteConfirm.bind(this, record.id)}
                                                        okText="是" cancelText="否">
                                                <a href="#">删除</a>
                                            </Popconfirm>
                                        </span>
                                    )
                            }
                        }}
                    />
                </Table>
            </div>
        )
    }
}

export default Petals;