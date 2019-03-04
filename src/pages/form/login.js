/**
 * +----------------------------------------------------------------------
 * | login | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Form, Icon, Input, Button, Card, message, Checkbox} from "antd";

const FormItem = Form.Item

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class FormLogin extends Component {
    componentDidMount() {
        // To disabled submit button at the beginning.

        // this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    /*********************************************************/
    handleSubmitBtn = (e) => {
        console.log(e)
        e.preventDefault();
        const userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            console.log(err)
            if (!err) {
                message.success(`${userInfo.username},登录成功，密码${userInfo.userPwd}`)
                console.log('Received values of form: ', values);
            }
        })
    }

    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <Card title='行内表单' style={{marginBottom: 10}}>
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder='请输入用户名'/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder='请输入密码'/>
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title='行内表单验证信息' style={{marginBottom: 10}}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item
                            validateStatus={userNameError ? 'error' : ''}
                            help={userNameError || ''}
                        >
                            {getFieldDecorator('userName', {
                                rules: [
                                    {
                                        // required: true,
                                        message: 'Please input your username!'
                                    }
                                ],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Username"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={passwordError ? 'error' : ''}
                            help={passwordError || ''}
                        >
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        // required: true,
                                        message: 'Please input your Password!'
                                    }
                                ],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Password"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title='登录水平表单'>
                    <Form style={{width: 300}}>
                        <FormItem>
                            {
                                getFieldDecorator('username', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }, {
                                            min: 5,
                                            max: 10,
                                            message: '长度不在范围内'
                                        }, {
                                            pattern: /^\w+$/g,
                                            message: '字符和数字'
                                        }
                                    ]
                                })(
                                    <Input placeholder='请输入用户名'
                                           prefix={<Icon type='user'/>}
                                    />
                                )

                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Input placeholder='请输入密码'
                                           type='password'
                                           prefix={<Icon type='lock'/>}
                                    />
                                )

                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remeber', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: []
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="javascript:void (0)" style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type='primary' onClick={this.handleSubmitBtn}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }

}

export default Form.create({name: 'horizontal_login'})(FormLogin);
;
