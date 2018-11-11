import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
import { Select,Drawer } from 'antd';
// 引入Petals表单
import PetalsEditorForm from '../../components/PetalEditorForm/PetalEditorForm';
// 引入编辑器样式
import 'braft-editor/dist/index.css'
const Option = Select.Option;
function fetchEditorContent(){
    return (
        <div>明月衣我以华裳</div>
    )
}

export default class PetalsEditor extends React.Component {

    constructor(props){
        super()
        this.state = {
            variety: props.variety?props.variety:1,
            // 创建一个空的editorState作为初始值
            editorState: BraftEditor.createEditorState(null),
            visible: false,
            flowerId: props.match.params.flowerId,
            petalId: 0
        }
    }

    async componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        const htmlContent = await fetchEditorContent()
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        this.setState({
            editorState: BraftEditor.createEditorState(htmlContent)
        })
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    submitContent = async (editorState) => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        this.setState({editorState})
        const htmlContent = this.state.editorState.toHTML()
        this.showDrawer()
    }
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    buildPreviewHtml = ()=>{
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
              width: 1000px;
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
          <div class="container" style="height:100%" min-height="500px">${this.state.editorState.toHTML()}</div>
        </body>
      </html>`
    }
    render () {
        return (
            <div style={{ height:'100%'}}>
                <BraftEditor
                    value={ this.state.editorState }
                    onChange={ this.handleEditorChange }
                    onSave={ this.submitContent }
                    style={{ height:'100%'}}
                />
                <Drawer
                    title={"基本信息完善"}
                    placement="right"
                    width={ '30%' }
                    closable={ false }
                    onClose={ this.onClose }
                    visible={ this.state.visible }
                    style={{ padding:'0px' }}
                    getContainer={'.grass-body'}
                    style={{ height:'100%'}}
                >
                    <PetalsEditorForm editorState={ this.state.editorState }
                                      buildPreviewHtml={ this.buildPreviewHtml }
                                      style={{ height:'100%'}}
                                      onClose={ this.onClose }
                                      petalId = { this.state.petalId }
                                      flowerId = { this.state.flowerId }
                    />
                </Drawer>
            </div>
        )

    }

}
