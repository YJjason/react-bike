/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Input, Form, Select, Button, DatePicker} from "antd";

import Utils from './../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component {
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        console.log(1,fieldsValue)
        this.props.filterSubmit(fieldsValue)
    }
    reset = () => {
        this.props.form.resetFields();
    }
    /*初始化*/
    initFormList = () => {
        const {getFieldDecorator} = this.props.form;
        const formList = this.props.formList;
        const formListItem = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, index) => {
                let label = item.label;
                let field = item.filter;
                let initialValue = item.initialValue;
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === 'TIME_SEARCH') {
                    const begin_time = <FormItem label="订单时间" key={field}>
                        {
                            getFieldDecorator("begin_time", {
                                initialValue: initialValue
                            })(
                                <DatePicker showTime={true} placeholder="选择开始时间" fromat="YYYY-MM-DD HH-mm-ss"/>
                            )
                        }
                    </FormItem>
                    formListItem.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {
                            getFieldDecorator("end_time", {})(
                                <DatePicker showTime={true} placeholder="选择结束时间" fromat="YYYY-MM-DD HH-mm-ss"/>
                            )
                        }
                    </FormItem>
                    formListItem.push(end_time)
                } else if (item.type === 'INPUT') {
                    const INPUT = <FormItem label={label} colon={false} key={field}>
                        {
                            getFieldDecorator([field], {})(
                                <Input type="text" placeholder={placeholder}/>
                            )
                        }
                    </FormItem>
                    formListItem.push(INPUT)
                } else if (item.type === 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{width: width}}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(item.list)}

                                </Select>
                            )
                        }
                    </FormItem>
                    formListItem.push(SELECT)
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checked',
                                initialValue: initialValue //true false,
                            })(
                                <checkbox
                                    placeholder={placeholder}
                                >
                                    {label}
                                </checkbox>
                            )
                        }
                    </FormItem>
                    formListItem.push(CHECKBOX);
                }
            })
        }
        return formListItem
    }

    render() {
        return (
            <Form layout='inline'>
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }

}

export default Form.create({})(FilterForm);
