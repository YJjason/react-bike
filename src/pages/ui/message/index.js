/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card, message, Button} from "antd";
import './../ui.less'

class Message extends Component {
    success = () => {
        message.success('This is a message of success')
    }
    error = () => {
        message.error('This is a message of error');
    };

    warning = () => {
        message.warning('This is message of warning');
    };
    handleDuration=()=>{
        message.success('This is a prompt message for success, and it will disappear in 5 seconds',5)
    };
    handleCllback=()=>{
        message.loading('Action in progress..', 2.5)
            .then(() => message.success('Loading finished', 2.5))
            .then(() => message.info('Loading finished is finished', 2.5));
    }

    render() {
        return (
            <div>
                <Card title='全局提示' className='card-wrap'>
                    <Button onClick={this.success}>Success</Button>
                    <Button onClick={this.error}>Error</Button>
                    <Button onClick={this.warning}>Warning</Button>
                    <Button onClick={this.handleDuration}>duration</Button>
                    <Button onClick={this.handleCllback}> callback</Button>
                </Card>
            </div>
        );
    }

}

export default Message;
