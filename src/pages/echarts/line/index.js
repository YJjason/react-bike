/**+----------------------------------------------------------------------
 * | index
 *+----------------------------------------------------------------------
 * | Author: 1009239228@qq.com +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card} from "antd";
//主题
import echartTheme from './../echartTheme';
// import echarts from 'echarts';// 所有的图标

// 按需加载
import echarts from 'echarts/lib/echarts';
//导入饼图
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {

    componentWillMount() {
        //注册主题
        echarts.registerTheme('Imooc', echartTheme)
    }

    getOption = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000, 2365, 2584, 3658, 1226, 8429, 8312
                    ]
                }
            ]
        }
        return option
    }
    getOption2 = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['OFO订单量', '摩拜订单量']
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [
                        1000, 2365, 2584, 3658, 1226, 8429, 8312
                    ]
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [
                        5955, 2659, 3589, 1587, 9845, 126, 15874
                    ]
                },
            ],
        }
        return option
    }
    getOption3 = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000, 2365, 2584, 3658, 1226, 8429, 8312
                    ],
                    areaStyle:{}
                }
            ]
        }
        return option
    }


    render() {
        return (
            <div>
                <Card title="折线图-1">
                    <ReactEcharts option={this.getOption()} theme='echartTheme'/>
                </Card>
                <Card title="折线图-2" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption2()} theme='echartTheme'/>
                </Card>
                <Card title="折线图-3" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption3()} theme='echartTheme'/>
                </Card>
            </div>
        );
    }
}
