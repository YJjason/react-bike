/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

import React, {Component} from 'react';
import {Card, Table, Form, DatePicker, Modal, Button, Select,} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
//封装组件
import BaseForm from './../../components/BaseForm'

const FormItem = Form.Item;
const Option = Select.Option;

class Order extends Component {

    state = {
        list: []
    }
    params = {
        page: 1
    }
    //form 表单封装初始化
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            placeholder: '全部',
            initialValue: '1',
            width: 100,
            filter:'city_id',
            list: [
                {
                    id: '0',
                    name: '全部'
                },
                {
                    id: '1',
                    name: '北京'
                },
                {
                    id: '2',
                    name: '天津'
                },
                {
                    id: '3',
                    name: '上海'
                }
            ]
        },
        {
            type:'TIME_SEARCH',

        },
        {
            type: 'SELECT',
            label: '订单状态',
            placeholder: '全部',
            initialValue: '1',
            filter:'order_status',
            width: 100,
            list: [
                {
                    id: '0',
                    name: '全部'
                },
                {
                    id: '1',
                    name: '进行中'
                },
                {
                    id: '2',
                    name: '结束订单'
                }
            ]
        },
    ]

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    list: res.result.item_list.map((item, index) => {
                        item.key = index;
                        return item
                    }),
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.requestList()
                    })
                })
            }
        })
    }
    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单'
            })
            return
        }
        window.open(`/common/order/detail/${item.id}`, '_blank')
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        console.log(1, record)
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    onSelectChange = (selectedRowKeys, selectedItem) => {
        const record = selectedItem[0];
        this.setState({
            selectedRowKeys,
            selectedItem: record
        })
    }
    handleFilter=(params)=>{
        this.params=params;
        this.requestList(params)
    }

    render() {

        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            }, {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            }, {
                title: '用户名',
                dataIndex: 'user_name',
            }, {
                title: '手机号',
                dataIndex: 'mobile',
            }, {
                title: '历程',
                dataIndex: 'distance'
            },
            {
                title: '形式时常',
                dataIndex: 'total_time',
            },
            {
                title: '状态',
                dataIndex: 'status',
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            },
        ];
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChang: this.onSelectChange
        }
        return (
            <div>
                <Card title="城市管理">
                    {/*<FilterForm ></FilterForm>*/}
                    <BaseForm formList ={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop: 10}}>
                    <Button onClick={this.openOrderDetail}>订单详情</Button>
                    <Button>结束订单</Button>
                </Card>
                <div className='content-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                    />
                </div>
            </div>
        );
    }

}

export default Order;

/*子组件1  提取封装公共组件*/
/*
class FilterForm extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{width: 100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker></DatePicker>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker></DatePicker>
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('order_status')(
                            <Select
                                style={{width: 80}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

FilterForm = Form.create({})(FilterForm);
*/
