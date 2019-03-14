/**+----------------------------------------------------------------------
 * | index
 *+----------------------------------------------------------------------
 * | Author: 1009239228@qq.com +----------------------------------------------------------------------
 */

import React, {Component} from 'react';
import {Card, Button, Modal} from "antd";
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/*获取文本*/
import draftjs from 'draftjs-to-html';

export default class RichText extends Component {
    state = {
        showRichText: false,
        editorState: ''
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    }
    handleClearContent = () => {
        this.setState({
            editorState: ""
        })
    }
    handleGetText = () => {
        this.setState({
            showRichText: true
        })
    }
    onEidtorChange = (contentState) => {
        this.setState({
            contentState
        })
    }

    render() {
        const {editorState} = this.state
        return (
            <div>
                <Card title="富文本编辑器">
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card style={{marginTop: 10}}>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="eidtorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onEidtorChange}
                    />
                </Card>
                <Modal
                    title='富文本'
                    visible={this.state.showRichText}
                    onCancel={() => {
                        this.setState({
                            showRichText: false
                        })
                    }}
                    footer={null}
                >
                    {

                        draftjs(this.state.contentState)
                    }
                </Modal>
            </div>
        );
    }

}
