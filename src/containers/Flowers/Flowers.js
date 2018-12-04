import React from 'react';
import {Table, Divider, Rate, Icon, Popconfirm, message} from 'antd';
import { Link } from 'react-router-dom';
import Request from '../../components/Axios/Axios.js';
import FlowerEditorModal from '../../containers/Flowers/FlowerEditorModal';
const { Column } = Table;

class Flowers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gardenerId: props.gardenerId?props.gardenerId:0,
            data: [],
            pagination: {
                current: 1,
                defaultCurrent: 1,
                defaultPageSize: 10,
                pageSize: 10,
                total: 0
            },
            loading: false,
            modalHandleFlowerId:0,
            modalVisible: false
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
        Request.get('/gardener/'+this.state.gardenerId+'/flowers',{
            params: params
        })
            .then(function(response){
                const pagination = { ..._this.state.pagination };
                pagination.total = response.data.total;
                _this.setState({
                    loading: false,
                    data: response.data.content,
                    pagination
                })
            })
    }

    componentDidMount() {
        this.fetch();
    }
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return;
        }
    }
    addOrEditFlower=(flowerId,e)=>{
        e.preventDefault()
        this.setState({
            modalHandleFlowerId: flowerId,
            modalVisible: true
        })
    }
    closeFlowerModal=() => {
        this.setState({
            modalHandleFlowerId:0,
            modalVisible: false
        })
    }
    closeFlowerModalAndRefresh=() => {
        this.setState({
            modalHandleFlowerId:0,
            modalVisible: false
        })
        this.handleTableChange(this.state.pagination)
    }
    deleteConfirm = (petalId,e) => {
        e.preventDefault()
        const path = '/gardener/'+this.state.gardenerId+'/flowers/'+petalId;
        Request.delete(path).then(res => {
            message.info(res.data);
            this.handleTableChange(this.state.pagination);
        }).catch(err => {
            console.log(err)
        })
    }
    render(){
        return (
            <div>
                <FlowerEditorModal
                    gardenerId={ this.state.gardenerId }
                    flowerId={ this.state.modalHandleFlowerId }
                    modalVisible={ this.state.modalVisible }
                    closeFlowerModal={ this.closeFlowerModal }
                    closeWithRefresh={ this.closeFlowerModalAndRefresh }
                />
                <Table dataSource={this.state.data}
                       rowKey={record => record.id}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange}
                >
                    <Column
                        title={<Icon type="plus" onClick={ this.addOrEditFlower.bind(this,0) }/>}
                        dataIndex="id"
                        key="id"
                        render={(text,record,index)=>{
                            return parseInt((this.state.pagination.current-1)*this.state.pagination.pageSize+index+1)
                        }}
                    />
                    <Column
                        title="花名"
                        dataIndex="name"
                        key="name"
                        render={(text,record)=>{
                            let  path = "/flowers/"+record.id+"/petals";
                            return (
                                <span>
                                    <Icon type="folder-open" theme="outlined" />&nbsp;
                                    <Link to={path}>{text}</Link>
                                </span>
                            )
                        }}
                    />
                    <Column
                        title="花语"
                        dataIndex="moral"
                        key="moral"
                    />
                    <Column
                        title="星级"
                        dataIndex="star"
                        key="star"
                        render={star => (
                            <span>
                              <Rate disabled defaultValue={star} />
                            </span>
                        )}
                    />
                    <Column
                        title="操作"
                        key="action"
                        render={(record) => (
                            <span>
                              <a href="javascript:" onClick={ this.addOrEditFlower.bind(this,record.id) }>编辑</a>
                              <Divider type="vertical" />
                              <Popconfirm title="确认删除?" onConfirm={this.deleteConfirm.bind(this, record.id)}
                                          okText="是" cancelText="否">
                                  <a href="#">删除</a>
                              </Popconfirm>
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}

export default Flowers;