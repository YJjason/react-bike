/**
 * +----------------------------------------------------------------------
 * | common | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

import React, {Component,Fragment} from 'react';
import {Row, Col} from 'antd';

import Header from './components/Header';

import './style/common.less';


class Common extends Component {
    render() {
        return (
            <Fragment>
                <Row className='simple-page'>
                    <Col span={24} className='main'>
                        <Header menuType='second'/>
                    </Col>
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
            </Fragment>
        );
    }

}

export default Common;
