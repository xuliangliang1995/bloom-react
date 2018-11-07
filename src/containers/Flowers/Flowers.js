import React from 'react';
import { Table, Divider, Rate,Icon } from 'antd';
import { Link } from 'react-router-dom';
import Request from '../../components/Axios/Axios.js';
const { Column } = Table;

class Flowers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gardenerId: props.gardenerId?props.gardenerId:0,
            data: [],
            pagination: {},
            loading: false
        }
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            page_size: pagination.pageSize,
            page_no: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
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
    render(){
        return (
            <Table dataSource={this.state.data}
                   rowKey={record => record.id}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
                   onChange={this.handleTableChange}
            >
                <Column
                    title="ID"
                    dataIndex="id"
                    key="id"
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
                    render={() => (
                        <span>
                      <a href="javascript:;">编辑</a>
                      <Divider type="vertical" />
                      <a href="javascript:;">删除</a>
                    </span>
                    )}
                />
            </Table>
        )
    }
}

export default Flowers;