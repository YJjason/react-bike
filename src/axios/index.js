/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import JsonP from 'jsonp';

import axios from 'axios';
import {Modal} from "antd";
import Utils from "./../utils/utils";

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status === 'success') {
                    resolve(response)
                } else {
                    reject(err)
                }
            })
        })
    }

    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = 'https://www.easy-mock.com/mock/5c7d3aaa2d0e9237c71cca2e/mockapi';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: "GET",
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {

                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code == 0) {
                        loading.style.display = 'none'
                        resolve(res)
                    } else {
                        Modal.info({
                            title: '错误提示',
                            message: res.msg
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }
    /*查询*/
    static requestList(_this,url,params){
        var data ={
            params:params
        }
        this.ajax({
            url:url,
            data
        }).then((data)=>{
            if (data&& data.result) {
                _this.setState({
                    list: data.result.item_list.map((item, index) => {
                        item.key = index;
                        return item
                    }),
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList()
                    })
                })
            }
        })
    }

}
