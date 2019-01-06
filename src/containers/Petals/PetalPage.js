import React from 'react';
import { Spin } from 'antd';
import Request from '../../components/Axios/Axios';

export default class PetalPage extends  React.Component{
    constructor(props){
        super();
        this.state = {
            flowerId: props.match.params.flowerId,
            petalId: props.match.params.petalId,
            loading: true,
            petalVariety: 0,
            src: "",
            srcDoc: "",
            title: ""
        }
    }
    componentDidMount(){
        const path = '/flowers/'+this.state.flowerId+'/petal/'+this.state.petalId;
        Request.get(path)
            .then(res => {
                let variety = res.data.petalVarietyId;
                this.setState({
                    title: res.data.name
                })
                switch (variety) {
                    case 1 :
                        Request.get(path+'/text').then(res => this.setState({
                            srcDoc: res.data.text,
                            petalVariety: 1,
                            loading: false
                        })).catch(err => this.setState({
                            loading: false
                        }))
                        break;
                    case 2:
                        Request.get(path+'/link').then(res => this.setState({
                            src: res.data.link,
                            petalVariety: 2,
                            loading: false
                        })).catch(err => this.setState({
                            loading: false
                        }))
                        break;
                }
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }
    htmlContent = () => {
        return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 5px 5px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body style="height:100%">
          <div class="container" style="height:100%" min-height="500px">${this.state.srcDoc}</div>
        </body>
      </html>`
    }
    render(){
        if(this.state.loading){
            let example = {
                textAlign: 'center',
                background: 'rgba(0,0,0,0.05)',
                borderRadius: '4px',
                marginBottom: '20px',
                padding: '30px 50px',
                margin: '20px 0'
            }
            return (
                <div style={ example }>
                    <Spin />
                </div>
            )
        }else{
            if(this.state.petalVariety == 2){
                return (
                    <a href={ this.state.src } target={ '_blank' }>{ this.state.title }</a>
                )
            }else if(this.state.petalVariety == 1){
                return (
                    <div style={{height:'100%',overflow:'auto'}} dangerouslySetInnerHTML={{ __html:this.htmlContent() }}>
                    </div>
                )
            }else{
                return (
                    <div style={{ height:'100%',width:'100%'}}>
                        404
                    </div>
                )
            }

        }
    }
}

