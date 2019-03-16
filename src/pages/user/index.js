/**+----------------------------------------------------------------------
 * | index
 *+----------------------------------------------------------------------
 * | Author: 1009239228@qq.com +----------------------------------------------------------------------
 */

import React, {Component} from 'react';

import {Card, Form, Button, Modal, Input, Radio, DatePicker, Select} from "antd";
import moment from 'moment';
import axios from './../../axios';
import Utils from './../../utils/utils';
import ETable from './../../components/ETable';


import BaseForm from './../../components/BaseForm';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

class User extends Component {

    componentDidMount() {
        this.requestList();
    }

    state = {
        isVisible: false
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            placeholder: '请输入用户名称',
            width: 100,
            filter: 'user_name',
        },
        {
            type: 'INPUT',
            label: '手机号',
            placeholder: '请输入手机号',
            width: 100,
            filter: 'user_mobile',
        },
        {
            type: 'DATE',
            label: '请选择入职如期',
            placeholder: '请选择日期',
            width: 100,
            filter: 'user_date',
        }
    ]

    handleFilter = (params) => {
        this.params = params;
        this.requestList()
    }

    requestList = () => {
        axios.requestList(this, '/user/list', this.params, true);
    };
    handleOperate = (type) => {

        let item = this.state.selectedItem;
        if (type === 'create') {
            this.setState({
                type,
                isVisible: true,
                title: '创建员工'
            })
        } else if (type === 'edit') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo: item
            })
        } else if (type === 'detail') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: item
            })
        } else if (type === 'delete') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return;
            }
            const _this = this;
            Modal.confirm({
                title: '确认删除',
                content: '是否要删除当前选中对象',
                onOk() {
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res) => {
                        if (res.code === 0) {
                            _this.setState({
                                isVisible: false
                            })
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }
    //创建员工提交按钮
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: type === 'create' ? '/user/add' : '/user/edit',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    isVisible: false
                })
                this.requestList();
                /*重置表格*/
                this.userForm.props.form.resetFields();
            }
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            }, {
                title: '用户名',
                dataIndex: 'username'
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女';
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': "咸🐟一条",
                        '2': '风华浪子',
                        '3': '北大才子一枚',
                        '4': '百度FE',
                        '5': '创业者',
                    };
                    return config[state];
                }
            }, {
                title: '爱好',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '🏊‍',
                        '2': '🏀',
                        '3': '⚽',
                        '4': '🏃',
                        '5': '🏔',
                        '6': '🚴',
                        '7': '🎱',
                        '8': '🎤',
                    };
                    return config[abc];
                }
            }, {
                title: '生日',
                dataIndex: 'birthday'
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time'
            },
        ];
        let footer = {};
        if (this.state.type === 'detail') {
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card title=''>
                    <BaseForm formList={this.formList}
                              filterSubmit={this.handleFilter}
                    />
                </Card>
                <Card>
                    <Button type="primary" icon="plus" onClick={() => {
                        this.handleOperate('create')
                    }} style={{marginLeft: 10}}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={() => {
                        this.handleOperate('edit')
                    }} style={{marginLeft: 10}}>编辑员工</Button>
                    <Button type="primary" icon="ellipsis" onClick={() => {
                        this.handleOperate('detail')
                    }} style={{marginLeft: 10}}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={() => {
                        this.handleOperate('delete')
                    }} style={{marginLeft: 10}}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>

                {/*模态框*/}
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        /*重置表格*/
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    {/*模态框嵌套表格*/}
                    <UserForm type={this.state.type}
                              wrappedComponentRef={(inst) => {
                                  this.userForm = inst;
                              }}
                              userInfo={this.state.userInfo}></UserForm>
                </Modal>
            </div>
        );
    }

}

export default User;

class UserForm extends Component {


    getState = (state) => {
        return {
            "1": '咸鱼一条',
            "2": '咸鱼二条',
            "3": '咸鱼三条',
            "4": '咸鱼四条',
            "5": '咸鱼五条',
        }[state]
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const type = this.props.type;
        const userInfo = this.props.userInfo || {};
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <div>
                <Form layout="horizontal">
                    <FormItem label="用户名" {...formItemLayout}>
                        {
                            type === 'detail' ? userInfo.username :
                                getFieldDecorator('user_name', {
                                    initialValue: userInfo.username
                                })(
                                    <Input type="text" placeholder="请输入用户名"/>
                                )
                        }
                    </FormItem>
                    <FormItem label="性别" {...formItemLayout}>
                        {
                            type === 'detail' ? userInfo.sex === 1 ? "男" : "女" :
                                getFieldDecorator('sex', {
                                    initialValue: userInfo.sex
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                        }
                    </FormItem>
                    <FormItem label="状态" {...formItemLayout}>
                        {
                            type === 'detail' ? this.getState(userInfo.state) :
                                getFieldDecorator('state', {
                                    initialValue: userInfo.state
                                })(
                                    <Select>
                                        <Option value={1}>天涯浪子</Option>
                                        <Option value={2}>弥补桥西</Option>
                                        <Option value={3}>城南旧事</Option>
                                        <Option value={4}>创业之</Option>
                                        <Option value={5}>k歌之王</Option>
                                    </Select>
                                )
                        }
                    </FormItem>
                    <FormItem label="生日" {...formItemLayout}>
                        {
                            type === 'detail' ? userInfo.birthday :
                                getFieldDecorator('birthday', {
                                    initialValue: moment(userInfo.birthday)
                                })(
                                    <DatePicker/>
                                )
                        }
                    </FormItem>
                    <FormItem label="联系地址" {...formItemLayout}>
                        {
                            type === 'detail' ? userInfo.address :
                                getFieldDecorator('address', {
                                    initialValue: userInfo.address
                                })(
                                    <TextArea rows={3} placeholder="请输入联系地址"/>
                                )
                        }
                    </FormItem>
                </Form>
            </div>
        );
    }
}

UserForm = Form.create({})(UserForm);
