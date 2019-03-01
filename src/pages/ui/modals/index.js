/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

import React, {Component} from 'react';

import {Modal, Button, Card} from "antd";

import './../ui.less';

class Modals extends Component {

    state = {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false,
    }

    handleOpen=(type)=>{
        this.setState({[type]:true})
    }
    handleOk = (e) => {
        // console.log(e);
        this.setState({
            visible1: false,
        });
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible1: false,
        });
    }
    handleConfirm=()=>{
        Modal.confirm({
            title: 'Do you Want to delete these items?',
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    handleInfo =()=>{
        Modal.info({
            title:'this is a notification meassage',
            content:(
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
            onOk(){},
        })
    }
    handleSuccess=()=>{
        Modal.success({
            title:'This is a success message',
            content:'some messages..'
        })
    }
    handleWarning=()=>{
        Modal.warning({
            title: 'This is a warning message',
            content: 'some messages...some messages...',
        })
    }

    render() {
        return (
            <div>
                <Card title='基础模态框'>
                    <Button type="primary" onClick={()=>this.handleOpen('visible1')}>
                        Open Modal
                    </Button>
                    <Button type="primary" onClick={()=>this.handleOpen('visible2')}>
                        自定义页脚
                    </Button>
                    <Button type="primary" onClick={()=>this.handleOpen('visible3')}>
                        顶部20px弹框
                    </Button>
                    <Button type="primary" onClick={()=>this.handleOpen('visible4')}>
                        水平垂直居中
                    </Button>
                </Card>
                <Card title='信息确认框' className='card-wrap'>
                    <Button type="primary" onClick={this.handleConfirm}>
                        Confirm
                    </Button>
                    <Button type="primary" onClick={this.handleInfo}>
                       Info
                    </Button>
                    <Button type="primary" onClick={this.handleSuccess}>
                        Success
                    </Button>
                    <Button type="primary" onClick={this.handleWarning}>
                        Warning
                    </Button>
                </Card>
                <Modal title='open modal'
                       visible={this.state.visible1}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                </Modal>
                <Modal title='自定义页脚'
                       visible={this.state.visible2}
                       okText='好的'
                       cancelText='算了'
                       onOk={()=>{
                           this.setState({
                               visible2:false
                           })
                       }}
                       onCancel={()=>{
                           this.setState({
                               visible2:false
                           })
                       }}
                >
                    <p>自定义页脚</p>
                </Modal>
                <Modal title='顶部20px'
                       style={{top:20}}
                       visible={this.state.visible3}
                       onOk={()=>{
                           this.setState({visible3:false})
                       }}
                       onCancel={()=>{
                           this.setState({visible3:false})
                       }}
                >
                    <p>顶部20px</p>
                </Modal>
                <Modal
                    title="水平居中"
                    centered
                    visible={this.state.visible4}
                    onOk={() => {
                        this.setState({
                            visible4:false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible4:false
                        })
                    }}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </div>
        );
    }

}

export default Modals;
