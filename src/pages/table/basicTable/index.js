/**
 * +----------------------------------------------------------------------
 * | index
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

import React, {Component} from 'react';
import {Card, Table, Modal, Button, message} from 'antd';
// import axios from 'axios';
//使用封装的请求
import axios from './../../../axios'
import Utils from './../../../utils/utils.js'

class BasicTable extends Component {

    state = {
        dataSource2: [],
        dataSource3: [],
        selectedRowKeys: []
    }
    params={
        page:1
    }

    componentDidMount() {
        this.request();
        const dataSource = [
            {
                id: '0',
                userName: 'jack',
                sex: '1',
                state: '1',
                intrest: '1',
                birthday: '2019-03-04',
                address: '江苏',
                time: '22:14'
            },
            {
                id: '1',
                userName: 'leo',
                sex: '1',
                state: '1',
                intrest: '1',
                birthday: '2019-03-04',
                address: '江苏',
                time: '22:14'
            },
            {
                id: '2',
                userName: 'jason',
                sex: '1',
                state: '1',
                intrest: '1',
                birthday: '2019-03-04',
                address: '江苏',
                time: '22:14'
            },
        ]
        dataSource.map((item, index) => {
            item.key = index
        })

        this.setState({
            dataSource
        })
        //初始化调用
        this.request();
    }

    /*动态获取mock 数据*/

    request = () => {
        let _this =this;

        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource2: res.result.list,
                    dataSource3: res.result.list,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page=current;
                        this.request()
                    })
                })
            }
        })
    }
    selectRow = (record, index) => {
        Modal.info({
            title: '选中信息',
            content: `用户名：${record.userName},地址：${record.address}`
        })
        const selectedRowKeys = [...this.state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
            selectedRowKeys.push(record.key)
        }
        this.setState({selectedRowKeys});
    }
    onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys, selectedRows)
        this.setState({selectedRowKeys, selectedRows})
    }

    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            ids.push(item)
        })
        Modal.confirm({
            title: '删除提示',
            content: `确定要删除选中数据`,
            onOk: () => {
                message.success("删除成功");
                this.request();
                /*删除选中，刷新数据*/
                this.setState({
                    selectedRowKeys: [],
                    selectedRows: null
                })
            }
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            }, {
                title: '性别',
                dataIndex: 'sex',
                key: 'age',
                render(sex) {
                    return sex = 1 ? '男' : '女'
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render(state) {
                    let config = {
                        '1': '城南',
                        '2': '盘门',
                        '3': '相门',
                        '4': '姑苏',
                        '5': '大闸蟹'
                    }
                    return config[state]
                }
            }, {
                title: '爱好',
                dataIndex: 'intrest',
                key: 'intrest',
                render(intrest) {
                    let config = {
                        '1': '游泳',
                        '2': '篮球',
                        '3': '爬山',
                        '4': '音乐',
                        '5': '电影'
                    }
                    return config[intrest]
                }
            }, {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday'
            }, {
                title: '地址',
                dataIndex: 'address',
                key: 'address'
            }, {
                title: '时间',
                dataIndex: 'time',
                key: 'time'
            }
        ];
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            // type:'radio',//default  checkbox 多选  radio  单选
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        };

        return (
            <div>
                <Card title='基础表格' style={{marginBottom: 10}}>
                    <Table columns={columns}
                           dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title='动态mock数据渲染表格'>
                    <Table columns={columns}
                           dataSource={this.state.dataSource2}
                    />
                </Card>
                <Card title='mock 单选表格' style={{marginBottom: 10}}>
                    <Button onClick={this.handleDelete} style={{marginBottom: 5}}>删除</Button>
                    <Table bordered
                           pagination={false}
                           columns={columns}
                           rowSelection={rowSelection}
                           dataSource={this.state.dataSource2}
                           onRow={(record, index) => ({
                               onClick: () => {
                                   this.selectRow(record, index)
                               }
                           })}
                    />
                </Card>
                <Card title='mock 分页表格'>
                    <Table bordered
                           columns={columns}
                           dataSource={this.state.dataSource3}
                           pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }

}

export default BasicTable;
