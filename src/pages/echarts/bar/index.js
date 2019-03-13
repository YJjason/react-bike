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
//导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {

    componentWillMount() {
        //注册主题
        echarts.registerTheme('Imooc', echartTheme)
    }

    getOption = () => {
        let option = {
            title: {text: '用户骑行订单'},
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };
        return option
    }
    getOption2 = () => {
        let option = {
            title: {text: '用户骑行订单'},
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [1000, 5200, 2000, 3340, 3900, 3300, 2200]
                },
                {
                    name: '膜拜',
                    type: 'bar',
                    data: [1075, 5362, 6200, 8334, 3420, 300, 2200]
                },
                {
                    name: '大黄蜂',
                    type: 'bar',
                    data: [8910, 5852, 2700, 3384, 7890, 9330, 2220]
                },
            ]
        };
        return option
    }


    render() {
        return (
            <div>
                <Card title="柱形图-1">
                    <ReactEcharts option={this.getOption()} theme='echartTheme'/>
                </Card>
                <Card title="柱形图-2" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption2()} theme='echartTheme'/>
                </Card>
            </div>
        );
    }

}
