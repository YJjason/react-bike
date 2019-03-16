/**+----------------------------------------------------------------------
 * | index
 *+----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 *+----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card, Table, Modal, Button, message, Badge} from 'antd';
// import axios from 'axios';
//使用封装的请求
import axios from './../../../axios'

class HighTable extends Component {
    state = {
        dataSource: []
    }

    params = {
        page: 1
    }

    componentDidMount() {
        this.request()
    }

    request = () => {
        axios.ajax({
            url: '/table/high',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource: res.result.list,
                })
            }
        })
    }
    handleChange = (pagination, filter, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    }
    handleDelete = (text,item) => {
        // let id = item.id;
        Modal.confirm({
            title: '确认',
            content: "确认删除",
            onOk: () => {
                message.success(`删除成功`);
                this.request()
            }
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: 75
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
                width: 75
            }, {
                title: '性别',
                dataIndex: 'sex',
                key: 'age',
                render(sex) {
                    return sex = 1 ? '男' : '女'
                },
                width: 75
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
                },
                width: 75
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
                },
                width: 75
            }, {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday',

                width: 75
            }, {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
                width: 120
            }, {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                width: 120
            }
        ];
        const columns1 = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id1',
                width: 75,
                fixed: 'left',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName1',
                fixed: 'left',
                width: 100,
            }, {
                title: '性别',
                dataIndex: 'sex',
                key: 'age1',
                render(sex) {
                    return sex = 1 ? '男' : '女'
                },
                width: 75
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state1',
                render(state) {
                    let config = {
                        '1': '城南',
                        '2': '盘门',
                        '3': '相门',
                        '4': '姑苏',
                        '5': '大闸蟹'
                    }
                    return config[state]
                },
                width: 75
            }, {
                title: '爱好',
                dataIndex: 'intrest',
                key: 'intrest1',
                render(intrest) {
                    let config = {
                        '1': '游泳',
                        '2': '篮球',
                        '3': '爬山',
                        '4': '音乐',
                        '5': '电影'
                    }
                    return config[intrest]
                },
                width: 75
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday1',

                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday11',

                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday12',

                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday13',

                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday14',

                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday15',

                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday16',

                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday17',

                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday18',

                width: 120
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address1',
                width: 120
            }, {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                width: 120
            }
        ];
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id2',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName2',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex2',
                render(sex) {
                    return sex = 1 ? '男' : '女'
                },
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age2',
                sorter: (a, b) => {
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state2',
                render(state) {
                    let config = {
                        '1': '城南',
                        '2': '盘门',
                        '3': '相门',
                        '4': '姑苏',
                        '5': '大闸蟹'
                    }
                    return config[state]
                },
            }, {
                title: '爱好',
                dataIndex: 'intrest',
                key: 'intrest2',
                render(intrest) {
                    let config = {
                        '1': '游泳',
                        '2': '篮球',
                        '3': '爬山',
                        '4': '音乐',
                        '5': '电影'
                    }
                    return config[intrest]
                },
            }, {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday2',
            }, {
                title: '地址',
                dataIndex: 'address',
                key: 'address2',
            }, {
                title: '时间',
                dataIndex: 'time',
                key: 'time2',
            }
        ];
        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id3',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName2',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex3',
                render(sex) {
                    return sex = 1 ? '男' : '女'
                },
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age3',
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state3',
                render(state) {
                    let config = {
                        '1': <Badge status='success' text='城南'/>,
                        '2': <Badge status='default' text='盘门'/>,
                        '3': <Badge status='processing' text='相门'/>,
                        '4': <Badge status='warning' text='姑苏'/>,
                        '5': <Badge status='error' text='大闸蟹'/>
                    }
                    return config[state]
                },
            }, {
                title: '爱好',
                dataIndex: 'intrest',
                key: 'intrest3',
                render(intrest) {
                    let config = {
                        '1': '游泳',
                        '2': '篮球',
                        '3': '爬山',
                        '4': '音乐',
                        '5': '电影'
                    }
                    return config[intrest]
                },
            }, {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday3',
            }, {
                title: '地址',
                dataIndex: 'address',
                key: 'address3',
            }, {
                title: '操作',
                key: 'time3',
                render:(text, item) =>{
                    return <Button size='small' onClick={(text,item) => {this.handleDelete(text,item)}}>删除</Button>
                }
            }
        ];
        return (
            <div>
                <Card title='表头固定' style={{marginBottom: 10}}>
                    <Table bordered
                           columns={columns}
                           pagination={false}
                           dataSource={this.state.dataSource}
                           scroll={{y: 240}}
                    />
                </Card>
                <Card title='左侧固定' style={{marginBottom: 10}}>
                    <Table bordered
                           columns={columns1}
                           pagination={false}
                           dataSource={this.state.dataSource}
                           scroll={{x: 1700}}
                    />
                </Card>
                <Card title='表格排序' style={{marginBottom: 10}}>
                    <Table bordered
                           columns={columns2}
                           pagination={false}
                           dataSource={this.state.dataSource}
                           onChange={this.handleChange}
                    />
                </Card>
                <Card title='操作按钮'>
                    <Table bordered
                           columns={columns3}
                           pagination={false}
                           dataSource={this.state.dataSource}
                    />
                </Card>

            </div>
        );
    }

}

export default HighTable
