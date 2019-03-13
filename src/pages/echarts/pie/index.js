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
import 'echarts/lib/chart/pie';
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
    getOption=()=>{
        let option={
            title:{
                text:"用户骑行订单",
                x:'center',
            },
            legend:{
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                orient:"vertical",
                right:10,
                top:20,
                bottom:20
            },
            tooltip:{
              trigger:'item',
              formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {
                            value:3080,
                            name:'周一'
                        },
                        {
                            value:3650,
                            name:'周二'
                        },
                        {
                            value:5000,
                            name:'周三'
                        },
                        {
                            value:2400,
                            name:'周四'
                        },
                        {
                            value:8500,
                            name:'周五'
                        },
                        {
                            value:5620,
                            name:'周六'
                        },
                        {
                            value:1120,
                            name:'周日'
                        },
                    ]
                }
            ]
        }
        return option
    }
    getOption2=()=>{
        let option={
            title:{
                text:"用户骑行订单",
                x:'center',
                y:'top'
            },
            legend:{
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                orient:"vertical",
                right:10,
                top:20,
                bottom:20
            },
            tooltip:{
              trigger:'item',
              formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    radius:['50%','60%'],
                    data:[
                        {
                            value:3080,
                            name:'周一'
                        },
                        {
                            value:3650,
                            name:'周二'
                        },
                        {
                            value:5000,
                            name:'周三'
                        },
                        {
                            value:2400,
                            name:'周四'
                        },
                        {
                            value:8500,
                            name:'周五'
                        },
                        {
                            value:5620,
                            name:'周六'
                        },
                        {
                            value:1120,
                            name:'周日'
                        },
                    ]
                }
            ]
        }
        return option
    }
    getOption3=()=>{
        let option={
            backgroundColor: '#2c343c',
            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:274, name:'联盟广告'},
                        {value:235, name:'视频广告'},
                        {value:400, name:'搜索引擎'}
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return option
    }


    render() {
        return (
            <div>
                <Card title="饼形图-1">
                    <ReactEcharts option={this.getOption()} theme='echartTheme'/>
                </Card>
                <Card title="饼形图-2" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption2()} theme='echartTheme'/>
                </Card>
                <Card title="饼形图-3" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption3()} theme='echartTheme'/>
                </Card>
            </div>
        );
    }

}
