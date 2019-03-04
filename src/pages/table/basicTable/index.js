/**
 * +----------------------------------------------------------------------
 * | index
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

import React, {Component} from 'react';
import {Card, Table} from 'antd';
import axios from 'axios';

class BasicTable extends Component {

    state = {dataSource2: []}

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

        this.setState({
            dataSource
        })
    }

    /*动态获取mock 数据*/

    request = () => {
        let baseUrl = 'https://www.easy-mock.com/mock/5c7d3aaa2d0e9237c71cca2e/mockapi'
        axios.get(baseUrl + '/table/list').then((res) => {
            console.log(res);
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
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state'
            }, {
                title: '爱好',
                dataIndex: 'intrest',
                key: 'intrest',
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
        ]

        return (
            <div>
                <Card title='基础表格' style={{marginBottom: 10}}>
                    <Table columns={columns}
                           dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title='动态数据渲染表格'>
                    <Table columns={columns}
                           dataSource={this.state.dataSource2}
                    />
                </Card>
            </div>
        );
    }

}

export default BasicTable;
