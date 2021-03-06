import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
import ColorPicker from 'braft-extensions/dist/color-picker'
import Table from 'braft-extensions/dist/table'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'

import { ContentUtils } from 'braft-utils'
import { Drawer,Alert,message,Upload,Icon,Spin } from 'antd';

// 引入Petals表单
import PetalsEditorForm from '../../components/PetalEditorForm/PetalEditorForm';

import Request from '../../components/Axios/Axios';

// 引入编辑器样式
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/color-picker.css'
import 'braft-extensions/dist/table.css'
import 'braft-extensions/dist/code-highlighter.css'

import './PetalEditor.css'


BraftEditor.use(Table({
    includeEditors: ['editor-petal'],
    defaultColumns: 3,
    defaultRows: 3
}))
BraftEditor.use(ColorPicker({
    includeEditors: ['editor-petal'],
    theme: 'light'
}))
BraftEditor.use(CodeHighlighter({
    includeEditors: ['editor-petal'],
    syntaxs: [
        {
            name: 'Java',
            syntax: 'java',
        }, {
            name: 'JavaScript',
            syntax: 'javascript'
        }, {
            name: 'HTML',
            syntax: 'html'
        }, {
            name: 'CSS',
            syntax: 'css'
        }, {
            name: 'PHP',
            syntax: 'php'
        }
    ]
}))


export default class PetalsEditor extends React.Component {

    constructor(props){
        super()
        this.state = {
            variety: props.variety?props.variety:1,
            // 创建一个空的editorState作为初始值
            editorState: BraftEditor.createEditorState(null),
            visible: false,
            flowerId: props.match.params.flowerId,
            petalId: props.match.params.petalId,
            readOnly:props.match.params.petalId>0,
            spinning: false
        }
    }

    componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        if(this.state.petalId > 0){
            this.fetchEditorContent()
        }else {
            this.setState({
                editorState: BraftEditor.createEditorState(null)
            })
        }
    }
    fetchEditorContent = () => {
        const path = '/flowers/'+this.state.flowerId+'/petal/'+this.state.petalId+'/text';
        Request.get(path)
            .then(res => {
                // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState
                this.setState({
                    editorState: BraftEditor.createEditorState(res.data.raw),
                    readOnly: false
                })
            })
            .catch(err => {
                message.error(err.response.data[0].message)
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
        this.showDrawer()
    }
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    onChange = (info) => {
        const status = info.file.status;
        if (status === 'uploading') {
            this.setState({
                spinning: true
            })
            return;
        }
        if (status === 'done') {
            let imgUrl = info.file.response;
            this.setState({
                editorState: ContentUtils.insertMedias(this.state.editorState, [{
                    type: 'IMAGE',
                    url: imgUrl
                }]),
                spinning: false
            })
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            this.setState({
                spinning: false
            })
        }
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
        const controls = ['font-size', 'bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'emoji',
            'undo','blockquote', 'code', 'hr', 'table'];
        const extendControls = [
            {
                key: 'antd-uploader',
                type: 'component',
                component: (
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        action = { "/aliyun/oss/upload/image" }
                        onChange={ this.onChange }
                    >
                        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                        <button type="button" className="control-item button upload-button" data-title="插入图片">
                            <Icon type="picture" theme="filled" />
                        </button>
                    </Upload>
                )
            }
        ]
        return (
            <div style={{ height:'100%'}}>
                <Alert message="保存命令: Ctr + S" type="info" closable showIcon />
                <Spin tip="uploading..." spinning = { this.state.spinning }>
                    <div className="editor-container">
                        <BraftEditor
                            id = "editor-petal"
                            controls = { controls }
                            extendControls={ extendControls }
                            value={ this.state.editorState }
                            onChange={ this.handleEditorChange }
                            onSave={ this.submitContent }
                            style={{ height:'100%',minHeight:'800px'}}
                            contentStyle={{ fontSize:16}}
                            stripPastedStyles={ true }
                        />
                    </div>
                </Spin>
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
                                      contentStyle = {{}}
                                      onClose={ this.onClose }
                                      petalId = { this.state.petalId }
                                      flowerId = { this.state.flowerId }
                    />
                </Drawer>
            </div>
        )

    }

}
