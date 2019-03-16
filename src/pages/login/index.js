/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

import React, {Component} from 'react';
import {Card, Form, Button, Input} from "antd";
import './index.less'

import {connect} from "react-redux";
import {switchUsers} from './../../redux/action'

const FormItem = Form.Item;

class Login extends Component {
    state = {
        errorMsg: true
    }
    loginReq = params => {
        const {dispatch} = this.props;
        dispatch(switchUsers(params.username))
        window.location.href = '/';
    };

    render() {
        return (
            <div className="login-page">
                <div className="login-header">
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt=""/>
                        React 全家桶+AntD 项目后台管理系统
                    </div>
                </div>
                <div className="login-content-wrap">
                    <div className="login-content">
                        <div className="word">xxxx <br/>dddddd</div>
                        <div className="login-box">
                            {/*   <div className="error-msg-wrap">
                                <div
                                    className={this.state.errorMsg ? "show" : ""}
                                >
                                    {this.state.errorMsg}
                                </div>
                            </div>*/}
                            <LoginForm ref="login" loginSubmit={this.loginReq}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect()(Login);

class LoginForm extends Component {
    state = {}
    checkUsername = (rule, value, callback) => {
        let reg = /^\w+$/;
        if (!value) {
            callback('请输入用户名')
        } else if (!reg.test(value)) {
            callback('用户名只允许输入英文字母')
        } else {
            callback()
        }
    }
    checkPassword = (rule, value, callback) => {
        if (!value) {
            callback('请输入密码')
        } else {
            callback()
        }
    }
    loginSubmit = (e) => {
        e && e.preventDefault();
        const _this = this;
        this.props.form.validateFieldsAndScroll((err, valus) => {
            if (!err) {
                let formValue = this.props.form.getFieldsValue();
                _this.props.loginSubmit({
                    username: formValue.username,
                    password: formValue.password
                })
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form className="login-form">
                <FormItem>
                    {
                        getFieldDecorator("username", {
                            initialValue: '',
                            rules: [{validator: this.checkUsername}]
                        })(
                            <Input placeholder="用户名"/>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator("password", {
                            initialValue: '',
                            rules: [{validator: this.checkPassword}]
                        })(
                            <Input placeholder="密码" type="password" wrappedcomponentref={(inst) => this.pwd = inst}/>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.loginSubmit} className="login-form-button">登录</Button>
                </FormItem>

            </Form>
        );
    }

}

LoginForm = Form.create({})(LoginForm);
