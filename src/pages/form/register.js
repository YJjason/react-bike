/**
 * +----------------------------------------------------------------------
 * | register | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {
    Form,
    Icon,
    Input,
    Card,
    Upload,
    Checkbox,
    Radio,
    Select,
    Switch,
    DatePicker,
    TimePicker,
    InputNumber,
} from "antd";
import moment from 'moment';

const FormItem = Form.Item


class Register extends Component {
    state = {
        loading: false,
    };

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log(1,info.file.originFileObj)

            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 10},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <Card title='注册表单'>
                    <Form layout='horizontal'>
                        <FormItem label='用户名' {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: 'json',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder='请输入用户名'/>
                                )
                            }
                        </FormItem>
                        <FormItem label='密码' {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '12313',
                                })(
                                    <Input placeholder='请输入密码' type='password'/>
                                )
                            }
                        </FormItem>
                        <FormItem label='性别' {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1',
                                })(
                                    <Radio.Group>
                                        <Radio value='1'>男</Radio>
                                        <Radio value='2'>女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        <FormItem label='年龄' {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: '18',
                                })(
                                    <InputNumber></InputNumber>
                                )
                            }
                        </FormItem>
                        <FormItem label='当前状态' {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '1',
                                })(
                                    <Select>
                                        <Select.Option value='1'>城南茶馆</Select.Option>
                                        <Select.Option value='2'>骆驼祥子</Select.Option>
                                        <Select.Option value='3'>无人区</Select.Option>
                                        <Select.Option value='4'>LadyGaGa</Select.Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='爱好' {...formItemLayout}>
                            {
                                getFieldDecorator('intrest', {
                                    initialValue: ['2', '4'],
                                })(
                                    <Select mode='multiple'>
                                        <Select.Option value='1'>跑步</Select.Option>
                                        <Select.Option value='2'>登山</Select.Option>
                                        <Select.Option value='3'>骑行</Select.Option>
                                        <Select.Option value='4'>旅游</Select.Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='是否已婚' {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Switch showtime='true'
                                            format='YYYY-MM-DD HH:mm:ss'
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label='生日' {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2019-03-02'),
                                })(
                                    <DatePicker></DatePicker>
                                )
                            }
                        </FormItem>
                        <FormItem label='联系地址' {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '江苏省苏州市',
                                })(
                                    <Input.TextArea autosize={{minRows: 4, maxRows: 6}}/>
                                )
                            }
                        </FormItem>
                        <FormItem label='时间' {...formItemLayout}>
                            {
                                getFieldDecorator('time', {
                                    initialValue: moment('12:08:23', 'HH:mm:ss'),
                                })(
                                    <TimePicker showtime='true'
                                                format='HH:mm:ss'
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label='头像' {...formItemLayout}>
                            {
                                getFieldDecorator('userImg', {
                                    initialValue: ''
                                })(
                                    <Upload
                                        listType='picture-card'
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar"/> : uploadButton}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem  {...tailFormItemLayout}>
                            {
                                getFieldDecorator('protocal', {
                                    initialValue: ''
                                })(
                                    <Checkbox>我已阅读
                                        <a href="javascript:void(0)">《xxx协议》</a>
                                    </Checkbox>
                                )
                            }
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(Register);
