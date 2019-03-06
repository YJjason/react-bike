/**
 * +----------------------------------------------------------------------
 * | index
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

import React, {Component} from 'react';
import {Card, Table} from 'antd';
// import axios from 'axios';
//使用封装的请求
import axios from './../../../axios'

class BasicTable extends Component {

    state = {
        dataSource2: [],
        selectedRowKeys: []
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
        /* let baseUrl = 'https://www.easy-mock.com/mock/5c7d3aaa2d0e9237c71cca2e/mockapi'*/
        /*封裝請求*/
        /*    axios.get(baseUrl + '/table/list').then((res) => {
                if (res.status === 200 && res.data.code === 0) {
                    this.setState({
                        dataSource2: res.data.result
                    })
                }
            })*/

        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: 1
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource2: res.result
                })
            }
        })
    }
    selectRow = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
            selectedRowKeys.push(record.key)
        }
        this.setState({selectedRowKeys});
    }
    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys})
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
            // type:'checkbox',//default
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
                <Card title='mock 单选表格'>
                    <Table columns={columns}
                           rowSelection={rowSelection}
                           dataSource={this.state.dataSource2}
                           onRow={(record) => ({
                               onClick: () => {
                                   this.selectRow(record)
                               }
                           })}
                    />
                </Card>
            </div>
        );
    }

}

export default BasicTable;
