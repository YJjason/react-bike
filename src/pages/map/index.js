/**+----------------------------------------------------------------------
 * | index
 *+----------------------------------------------------------------------
 * | Author: 1009239228@qq.com +----------------------------------------------------------------------
 */
import React, {Component} from 'react';

import {Card, Form, Button, Modal, Input, Radio, DatePicker, Select} from "antd";
import moment from 'moment';
import axios from './../../axios';
import Utils from './../../utils/utils';
import ETable from './../../components/ETable';
import BaseForm from './../../components/BaseForm'


export default class BikeMap extends Component {

    state={}
    fomrList = [
        {
            type: '城市'
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '2', name: '行程结束'}]
        }

    ];
    componentDidMount() {
        this.requestList();
    }

    handleFilterSubmit = (FilterParams) => {
        this.params = FilterParams;
        this.requestList()
    }
    requestList=()=>{
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            console.log(1221,res)
            if(res.code==0){
                this.setState({
                    total_count:res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }
    //渲染地图
    renderMap=(res)=>{
        let list =res.result.route_list; //行驶路线
        this.map=new window.BMap.Map('container');
        let gps1 =list[0].split(','); //开始点
        let gps2 =list[list.length-1].split(',');//结束点
        let startPoint =new window.BMap.Point(gps1[0],gps1[1]) // 开始经纬度
        let endPoint =new window.BMap.Point(gps2[0],gps2[1]) //终点经纬度
        this.map.centerAndZoom(endPoint,13)
    }

    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.fomrList} filterSubmit={this.handleFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{this.state.total_count}辆</div>
                    <div id="container" style={{height: 500}}></div>
                </Card>
            </div>
        );
    }

}
