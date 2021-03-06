/**
 * +----------------------------------------------------------------------
 * | detail | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card} from 'antd';
import axios from './../../axios/index';
import './detail.less'

class Order extends Component {
    state = {}
    map=''
    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.requestList(orderId)
        }
    }

    requestList = (orderId) => {
        axios.ajax({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap(res.result)
            }

        })
    }
    /*初始化地图*/
    renderMap = (result) => {
        // 创建地图实例
        this.map = new window.BMap.Map("orderDetailMap");
        // 创建点坐标
        // let point = new window.BMap.Point(116.404, 39.915);
        // 初始化地图，设置中心点坐标和地图级别
        // this.map.centerAndZoom(point,11) // 15 缩放等级
        this.map.enableScrollWheelZoom();
        this.drawBikeRoute(result.position_list)
        //服务区绘制方法
        this.drawServiceArea(result.area)
    }
    /*添加地图控件*/
    addMapControl = () => {
        let map = this.map;
        /*anchor 控件位置*/
        map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_LEFT}));
        map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
    }
    /*绘制行驶路线*/
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0]
            let last = positionList[positionList.length - 1];
            /*初始起始坐标点及图表*/
            //1.起始点
            startPoint = new window.BMap.Point(first.lon, first.lat);
            let startIcon = new window.BMap.Icon(
                '/assets/start_point.png',
                new window.BMap.Size(36, 42), {
                    imageSize: new window.BMap.Size(36, 42),
                    anchor: new window.BMap.Size(18, 42)
                })
            let startMarker = new window.BMap.Marker(startPoint, {
                icon: startIcon
            })
            map.addOverlay(startMarker)
            //终止点
            endPoint = new window.BMap.Point(last.lon, last.lat);
            let endIcon = new window.BMap.Icon(
                '/assets/end_point.png',
                new window.BMap.Size(36, 42), {
                    imageSize: new window.BMap.Size(36, 42),
                    anchor: new window.BMap.Size(18, 42)
                })
            let endMarker = new window.BMap.Marker(endPoint, {
                icon: endIcon
            })
            map.addOverlay(endMarker);
            this.map.centerAndZoom(endPoint,11)
            //连接路线图
            let trackPoint = [];
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat))
            }
            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeWeight: '2',//折线的宽度，以像素为单位
                strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
                strokeColor: "#ef4136" //折线颜色
            });
            map.addOverlay(polyline)
        }

    }
    //绘制服务区
    drawServiceArea = (areaList) => {
        let map =this.map;
        let trackPoint = [];
        for (let i = 0; i < areaList.length; i++) {
            let point = areaList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat))
        }
        let polygon = new window.BMap.Polygon(trackPoint, {
            fillColor: '#ff8605',
            fillOpacity:0.4,
            strokeWeight: '8',//折线的宽度，以像素为单位
            strokeOpacity: 0.5,//折线的透明度，取值范围0 - 1
            strokeColor: "#18a45b" //折线颜色
        });
        map.addOverlay(polygon);
    }


    render() {
        const info = this.state.orderInfo || {}
        return (
            <div>
                <Card>
                    <div id='orderDetailMap' className='order-map'>
                    </div>
                    <div className='detail-items '>
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li className="clearfix">
                                <div className="detail-form-left">用车模式:</div>
                                <div className="detail-form-content">{info.modal == 1 ? "服务区" : "停车点"}</div>
                            </li>
                            <li className="clearfix">
                                <div className="detail-form-left">订单编号:</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li className="clearfix">
                                <div className="detail-form-left">车辆编号:</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li className="clearfix">
                                <div className="detail-form-left">用户姓名:</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li className="clearfix">
                                <div className="detail-form-left">手机号码:</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className='detail-items '>
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li className="clearfix">
                                <div className="detail-form-left">行程起点:</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li className="clearfix">
                                <div className="detail-form-left">行程终点:</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li className="clearfix">
                                <div className="detail-form-left">行驶里程:</div>
                                <div className="detail-form-content">{info.distance / 1000} 公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }

}

export default Order;
