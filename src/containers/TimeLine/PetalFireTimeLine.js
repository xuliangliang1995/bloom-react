import React from 'react';
import { Timeline,Card,Avatar,message,Button,Icon,DatePicker  } from 'antd';
import { Link } from 'react-router-dom';
import Request from '../../components/Axios/Axios';
import moment from 'moment';

const { Meta } = Card;
const {  RangePicker } = DatePicker;

class PetalFireTimeLine extends React.Component{
    constructor(){
        super()
        this.state={
            cards:[],
            startDate:moment(),
            endDate:moment(),
            tip: '数据加载中',
            tipIcon:<Icon type="loading" />
        }
    }
    async componentDidMount() {
        await this.fetch();
    }
    fetch=() => {
        this.setState({
            tip: '数据加载中',
            tipIcon: <Icon type="loading" />
        })
        const gardenerId = this.props.gardenerId;
        const path = '/gardener/' + gardenerId + '/petalProgress';
        Request.get(path,{
            params:{
                start_date: this.state.startDate.format('YYYY-MM-DD 00:00:00'),
                end_date: this.state.endDate.format('YYYY-MM-DD 23:59:59')
            }
        })
            .then(res => {
                this.setState({
                    cards: res.data.content,
                    tip:'加载完毕',
                    tipIcon: <Icon type="twitter" />
                })
            })
            .catch(err => {
                message.error(err.response.data[0].message)
            })
    }
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return;
        }
    }
    forwardDay=()=>{
        let startDate = this.state.startDate.add(1,'days');
        let endDate = this.state.endDate.add(1,'days');
        this.setState({
            startDate: startDate,
            endDate: endDate
        })
        this.fetch()
    }
    backwardDay=()=>{
        let startDate = this.state.startDate.subtract(1,'days');
        let endDate = this.state.endDate.subtract(1,'days');
        this.setState({
            startDate: startDate,
            endDate: endDate
        })
        this.fetch()
    }
    /*onChange=(date, dateString)=> {
        console.log(date, dateString);
    }*/
    render(){
        let cards = this.state.cards.map((card,index) => {
            const path = '/flowers/'+card.petal.flowerId+'/petals/'+card.petalId;
            return (
                <Timeline.Item key={ card.id }>
                    <Card
                        title= { card.fireTime }
                        extra={<Link to={ path }>查看</Link>}
                        style={
                            index % 2 == 0
                                ? {width: '50%'}
                                : {width: '50%', marginLeft: '50%'}
                        }
                    >
                        <Meta
                            avatar={<Avatar src="https://grasswort.oss-cn-hangzhou.aliyuncs.com/logo/grasswort.jpg_compress" />}
                            title={ card.petal.name }
                            description={ card.petal.note }
                            style={{ textAlign:'left'}}
                        />
                    </Card>
                </Timeline.Item>
            )
        });
        return (
            <div>
                <Button.Group>
                    <Button type="default"
                        onClick={ this.backwardDay }
                    >
                        <Icon type="left" />前一天
                    </Button>
                    {/*<RangePicker
                        locale={ locale }
                        format={ 'YYYY-MM-DD'}
                        defaultValue={[
                            moment(),
                            moment()
                        ]}
                        onChange={ this.onChange } />*/}
                    <Button type="default"
                        onClick={ this.forwardDay }
                    >
                        后一天<Icon type="right" />
                    </Button>
                </Button.Group>
                <Timeline mode="alternate" style={{ height:'100%' }}
                          pending={ this.state.tip }
                          pendingDot={ this.state.tipIcon }

                >
                    { cards }
                </Timeline>
            </div>
        )
    }
}

export default PetalFireTimeLine;