/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Row, Col, Modal} from 'antd';
import './index.less';

import Util from '../../utils/utils';
import axios from '../../axios';

import {connect} from "react-redux";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            usrename: '',
            sysTime: ''
        }
    }

    componentWillMount() {
        this.setState({
            userName: 'admin'
        });
        this.timer = setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({sysTime})
        }, 1000);
        this.getWeatherAPIData();
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    getWeatherAPIData() {
        let city = '苏州'
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=9V2s9fGPqXjHlImsKB21FQTEC6n0Wio5'
        }).then((res) => {
            if (res.status === 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPicture: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })
    }

    handleExit = () => {
        Modal.confirm({
            title: '是否确认要退出系统?',
            onOk() {
                window.location.href = '/login'
            },
            onCancel() {
                console.log(11)
            }
        })

    }

    render() {
        const menuType = this.props.menuType;
        return (
            <div className='header'>
                <Row className='header-top'>
                    {
                        menuType ?
                            <Col span={4} className='img-logo'>
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span>xxx后台管理系统</span>
                            </Col> : ''
                    }
                    <Col span={menuType ? 20 : 24}>
                        <span>欢迎，{this.props.userName|| this.state.userName }</span>
                        <a href="javascript:void (0)" onClick={this.handleExit}>退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' : <Row className='breadcrumb'>
                        <Col span={4} className='breadcrumb-title'>
                            {this.props.menuName}
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
                }

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        menuName: state.menuName,
        userName: state.userName
    }
}
export default connect(mapStateToProps, null)(Header);
