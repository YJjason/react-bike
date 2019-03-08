/**
 * +----------------------------------------------------------------------
 * | utils | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

import React from 'react';
import {Select} from "antd";

const Option = Select.Option;

export default {
    //时间转换
    formateDate(time) {
        if (!time) return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    },

    //分页
    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total,
            showTotal: () => {
                return `共${data.result.total}条`
            },
            showQuickJumper: true
        }
    },

//
    getOptionList(data) {
        console.log(111,data)
        if (!data) {
            return []
        }
        let options=[];
        data.map((item) => {
            options.push(<Option value={item.id} key={item.name}>{item.name}</Option>)
        })
        return options
    }

}
