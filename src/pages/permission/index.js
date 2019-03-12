/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Form, Card, Button, Modal, Input, Select, message, Tree, Transfer} from "antd";
import Utils from './../../utils/utils'
import axios from './../../axios'
import ETable from './../../components/ETable'

import menuConfig from './../../config/menuConfig'

const FormItem = Form.Item;
const Option = Select.Option;
const {TreeNode} = Tree;

/*子组件1，角色绑定*/

export default class PermissionUser extends Component {

    state = {
        isRoleVisible: false
    };
/*    params = {
        page: 1
    }*/

    componentDidMount() {
        this.requestList(this, '/role/list', {});
    }

    requestList = () => {
        axios.requestList(this, '/role/list', {})
    }
    // 增加角色弹窗
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    //角色提交
    handleRoleSubmit = () => {
        const data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: '/role/create',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isRoleVisible: false
                });
                message.success('创建角色成功')
                this.roleForm.props.form.resetFields();//调用表单重置
                this.requestList();// 刷新列表
            } else {
                message.error(res)
            }

        })
    }
    //权限设置
    handlePermisson=()=>{
        let item =this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'温馨提示',
                content:'请选择一个角色'
            });
            return
        }
        this.setState({
            isPermVisible:true,
            detailInfo:item,
            menuInfo:item.menus
        })
    }
    handlePermEditSubmit=()=>{
        // 获取表单的值 ,添加wrappedComponentRef属性
        let data = this.permForm.props.form.getFieldsValue();
        data.role_id=this.state.selectedItem.id;
        data.munus = this.state.menuInfo
        // 将数据传入接口
        axios.ajax({
            url:'permission/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code== 0){
                this.setState({
                    isPermVisible:false
                });
                this.requestList()
            }
        })
    }

    // 用户授权
    handleUserAuth = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '温馨提示',
                content: '请选择一个角色'
            });
            return;
        }
        this.setState({
            isUserVisible:true,
            detailInfo:item
        })
        // 获取目标数据
        this.getRoleUserList(item.id)
    };

    // 获取用户角色列表
    getRoleUserList = (id) => {
        // id: 角色id , 获取角色id
        axios.ajax({
            url: '/role/user_list',
            data: {
                params: {
                    id
                }
            }
        }).then((res) => {
            console.log(res)
            if (res) { //如何请求成功

                this.getAuthUserList(res.result);
            }
        });
    };

    // 筛选目标用户
    getAuthUserList = (dataSource) => {
        // 将数据(目标用户,全量用户)进行过滤的方法
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length > 0) {
            // 有数据
            for (let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title:dataSource[i].user_name,
                    status:dataSource[i].status
                };

                if (data.status == 1) { // 如果status是1 说明是目标用户,加到targetKeys数组
                    targetKeys.push(data.key)
                }
                // 否则 说明是全量数据, 加入全量数组列表
                mockData.push(data)
            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    };
/*用户授权提交*/
    handleUserSubmit=()=>{
        let data ={}
        data.user_ids=this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code ==0){
                this.setState({
                    isUserVisible:false
                })
                this.requestList()
            }
        })

    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '角色名称',
                dataIndex: 'role_name',
                key: 'role_name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                id: 'create_time',
                render: Utils.formateDate
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                key: 'status',
                render(status) {
                    return status == 1 ? '停用' : '启用';
                }
            },
            {
                title: '授权时间',
                dataIndex: 'authorize_time',
                key: 'authorize_time',
                render: Utils.FormateDate
            },
            {
                title: '授权人',
                dataIndex: 'authorize_user_name',
                id: 'authorize_user_name'
            }
        ]
        return (
            <div>
                <Card>
                    <Button type="priamry" onClick={this.handleRole}>创建角色</Button>
                    <Button type="priamry" style={{marginLeft: 10, marginRight: 10}} onClick={this.handlePermisson}>权限设置</Button>
                    <Button type="priamry" onClick={this.handleUserAuth}>用户设置</Button>
                </Card>
                <div className='content-wrap'>
                    <ETable
                        columns={columns}
                        dataSource={this.state.list}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();// 表单重置
                        this.setState({
                            isRoleVisible: false,
                        })
                    }}
                >
                    <RoleForm
                        wrappedComponentRef={(inst) => {  //获取嵌套表格内容
                            this.roleForm = inst
                        }}
                    />

                </Modal>
                <Modal title='设置权限'
                       visible={this.state.isPermVisible}
                       width={600}
                       onOk={this.handlePermEditSubmit}
                       onCancel={() => {
                           this.setState({
                               isPermVisible: false,
                           })
                       }}
                >
                    <PermEditForm
                        wrappedComponentRef={(inst) => {
                            this.permForm = inst
                        }}
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal title='用户授权'
                       visible={this.state.isUserVisible}
                       width={800}
                       onOk={this.handleUserSubmit}
                       onCancel={() => {
                           this.setState({
                               isUserVisible: false,
                           })
                       }}
                >
                    <RoleAuthForm
                        wrappedComponentRef={(inst) => {
                            this.userAuthForm = inst
                        }}
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo = {(targetKeys)=>{
                            this.setState({
                                targetKeys
                            })
                        }}
                    />

                </Modal>
            </div>
        );
    }

};

// 子组件1
class RoleForm extends Component {
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout='horizontal'>
                <FormItem label='角色名称' {...formItemLayout}>
                    {
                        getFieldDecorator("role_name")(
                            <Input type='text' placeholder='请输入角色名字'/>
                        )
                    }
                </FormItem>
                <FormItem label="转态" {...formItemLayout}>
                    {
                        getFieldDecorator("state")(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={2}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>

        );
    }

}

RoleForm = Form.create({})(RoleForm)

// 子组件2
class PermEditForm extends Component {
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            } else {
                return <TreeNode {...item}></TreeNode>
            }
        })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        const {getFieldDecorator} = this.props.form;
        const detail_info = this.props.detailInfo;
        const menu_info = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name}/>
                </FormItem>
                <FormItem label='状态' {...formItemLayout}>
                    {
                        getFieldDecorator("status", {
                            initialValue: (detail_info.status + 1) + ""
                        })(
                            <Select>
                                <Option value='1'>启用</Option>
                                <Option value='2'>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menu_info}
                >
                    <TreeNode title='平台权限' key='playform_all'>
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>

                </Tree>
            </Form>
        );
    }

}

PermEditForm = Form.create({})(PermEditForm)

// 子组件3 用户权限
class RoleAuthForm extends Component {
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    }
    filterOption = (inputValue,option)=>{
        return option.title.indexOf(inputValue)>-1
    }
    handleChange=(targetKeys)=>{
        this.props.patchUserInfo(targetKeys)
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        const {getFieldDecorator} = this.props.form;
        const detail_info = this.props.detailInfo;
        const menu_info = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name}/>
                </FormItem>
               <FormItem  label="选择用户" {...formItemLayout}>
                   <Transfer
                       listStyle={{width:200 ,height:400}}
                       dataSource={this.props.mockData}
                       titles={['待选择用户','已选择用户']}
                       showSearch
                       searchPlaceholder="请输入用户名"
                       filterOption={this.filterOption}
                       targetKeys={this.props.targetKeys}
                       render={item =>item.title}
                       onChange={this.handleChange}
                   />
               </FormItem>
            </Form>

        );
    }

}

RoleAuthForm = Form.create({})(RoleAuthForm)

