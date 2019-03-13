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

    state = {}
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
    requestList = () => {
        axios.ajax({
            url: '/map/bike_list',
            data: {
                params: this.params
            }
        }).then((res) => {
            console.log(1221, res)
            if (res.code == 0) {
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }
    //渲染地图
    renderMap = (res) => {
        let list = res.result.route_list; //行驶路线
        this.map = new window.BMap.Map('container');
        this.map.enableScrollWheelZoom();
        let gps1 = list[0].split(','); //开始点
        let gps2 = list[list.length - 1].split(',');//结束点
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]) // 开始经纬度
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]) //终点经纬度
        this.map.centerAndZoom(endPoint, 11)
        let startPointIcon = new window.BMap.Icon(
            '/assets/start_point.png',
            new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })
        //覆盖物
        let bikeMarkerStart = new window.BMap.Marker(startPoint, {Icon: startPointIcon})
        this.map.addOverlay(bikeMarkerStart)
        let endPointIcon = new window.BMap.Icon(
            '/assets/end_point.png',
            new window.BMap.Size(36, 42),
            {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42),
            }
        )
        let bikeMarkerEnd = new window.BMap.Marker(startPoint, {Icon: endPointIcon})
        this.map.addOverlay(bikeMarkerEnd);
        //绘制行程路线
        let routeList = [];
        list.forEach((item) => {
            let p = item.split(',');
            //添加坐标点
            routeList.push(new window.BMap.Point(p[0], p[1]));

        })
        let polyLine = new window.BMap.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokerOpacity: 1
        })
        this.map.addOverlay(polyLine);

        /*服务区*/
        let servicePointList = [];
        let serviceList = res.result.service_list;
        serviceList.forEach((item) => {
            servicePointList.push(new window.BMap.Point(item.lng, item.lat))
        })
        let polySeviceLine = new window.BMap.Polyline(servicePointList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokerOpacity: 1
        })
        this.map.addOverlay(polySeviceLine);
        //电动车分布情况
        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMap.Icon(
            '/assets/bike.jpg',
            new window.BMap.Size(36, 42),
            {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42),
            })

        bikeList.forEach((item)=>{
            let p= item.split(',');
            let point =new window.BMap.Point(p[0],p[1]);
            let bikeMarke = new window.BMap.Marker(point,{icon:bikeIcon})
            this.map.addOverlay(bikeMarke);
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.fomrList} filterSubmit={this.handleFilterSubmit}/>
                </Card>
                <Card style={{marginTop: 10}}>
                    <div>共{this.state.total_count}辆</div>
                    <div id="container" style={{height: 800}}></div>
                </Card>
            </div>
        );
    }

}
