import React from 'react';

export default class Iframe extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        /*iFrameHeight()*/
    }
    render(){
        return (
            <iframe
                    style={{ padding:'0px',margin:'0px',minHeight:'500px'}}
                    frameBorder={0}
                    marginHeight={'0px'}
                    marginWidth={'0px'}
                    width={'100%'}
                    srcDoc={this.props.document}/>
        )
    }

}
