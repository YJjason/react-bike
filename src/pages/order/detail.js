/**
 * +----------------------------------------------------------------------
 * | detail | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card, Table, Form, DatePicker, Modal, Button, Select,} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import './detail.less'

class Order extends Component {

    render() {
        return (
            <div>
                <Card >
                    <div id='orderDetailMap'>
                    </div>
                    <div className='detail-items '>
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li className="clearfix">
                                <div className="detail-form-left">用车模式:</div>
                                <div className="detail-form-content"></div>
                            </li>
                            <li className="clearfix">
                                <div className="detail-form-left">订单编号:</div>
                                <div className="detail-form-content"></div>
                            </li>
                            <li className="clearfix">
                                <div className="detail-form-left">车辆编号:</div>
                                <div className="detail-form-content"></div>
                            </li>
                            <li className="clearfix">
                                <div className="detail-form-left">用户姓名:</div>
                                <div className="detail-form-content"></div>
                            </li>
                            <li className="clearfix">
                                <div className="detail-form-left">手机号码:</div>
                                <div className="detail-form-content"></div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }

}

export default Order
