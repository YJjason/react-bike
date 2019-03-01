/**
 * +----------------------------------------------------------------------
 * | login | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import { Form, Icon, Input, Button,Card } from "antd";

const FormItem=Form.Item
export default class FormLogin extends Component{

    render() {
        return (
            <div>
                <Card title='行内表单'>
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
                <Card title='水平表单'>
                    <Form >
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

            </div>
        );
    }

}
