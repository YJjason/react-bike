/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card, notification, Button} from "antd";
import './../ui.less'

class Notification extends Component {


    render() {
        const openNotification = () => {
            notification.open({
                message: 'Notification Title',
                description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        };

        const openNotificationWithIcon = (type) => {
            notification[type]({
                message: 'Notification Title',
                description: 'This is the content of the notification. This is the content of the notification. '
            })
        }
        return (
            <div>
                <Card title='通知提醒框' className='card-wrap'>
                    <Button type="primary" onClick={openNotification}>Open the notification box</Button>
                </Card>
                <Card title='带有图标通知'>
                    <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
                    <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
                    <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
                    <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
                </Card>
            </div>
        );
    }

}

export default Notification;
