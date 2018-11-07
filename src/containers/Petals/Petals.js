import React from 'react';
import { Table, Divider, Rate,Icon } from 'antd';
import Request from '../../components/Axios/Axios.js';
const { Column } = Table;

class Petals extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flowerId: props.match.params.flowerId
                ?props.match.params.flowerId
                :0,
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
        Request.get('/flowers/'+this.state.flowerId+'/petal',{
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
                    title="叶子"
                    dataIndex="name"
                    key="name"
                    render={(name) =>{
                        return (
                            <span>
                                <Icon type="file" theme="outlined" />&nbsp;
                                {name}
                            </span>
                        )
                    }}
                />
                <Column
                    title="备注"
                    dataIndex="note"
                    key="note"
                />
                <Column
                    title="创建时间"
                    dataIndex="ct"
                    key="ct"
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

export default Petals;