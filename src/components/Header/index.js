/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import './index.less';

import Util from '../../utils/utils';
import axios from '../../axios';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usrename: '',
            sysTime: ''
        }
    }

    componentWillMount() {
        this.setState({
            userName: 'jason'
        });
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({sysTime})
        }, 1000);
        this.getWeatherAPIData();
    }

    getWeatherAPIData() {
        let city = '苏州'
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) => {
            console.log(1, res)
            if (res.status === 'success') {
                let data = res.results[0].weather_data[0];
                console.log(2, data)
                this.setState({
                    dayPicture: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })
    }

    render() {
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span={24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                        首页
                    </Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather-img'>
                            <img src={this.state.dayPicture} alt=""/>
                           </span>
                        <span className='weather-detail'>
                             {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default Header;
