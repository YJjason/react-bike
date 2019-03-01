/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card, Button, Icon, Radio} from "antd";

import './../ui.less'

class Buttons extends Component {

    state = {
        loading: false,
        iconLoading: false,
        size: 'default'
    }

    enterLoading = () => {
        this.setState({loading: true});
    }
    enterIconLoading = () => {
        this.setState({loading: false});
    }
    handleChange = (e) => {
        this.setState({size: e.target.value})
    }

    render() {
        return (
            <div>
                <Card title='基础按钮'>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button disabled>disabled</Button>
                </Card>
                <Card title='图形按钮' className='card-wrap'>
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape='circle'/>
                    <Button icon="search">搜索</Button>
                    <Button icon="download">下载</Button>
                </Card>
                <Card title='loading按钮' className='card-wrap'>
                    <Button type="primary" loading>
                        确认
                    </Button>
                    <Button type="primary" shape='circle' loading/>
                    <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                        点击加载
                    </Button>
                    <Button shape='circle' loading></Button>
                    <Button type="primary" icon="poweroff" onClick={this.enterIconLoading}>
                        Click me!
                    </Button>
                </Card>
                <Card title='按钮组' className='card-wrap'>
                    <Button.Group>
                        <Button type="primary">
                            <Icon type="left"/>Go back
                        </Button>
                        <Button type="primary">
                            Go forward<Icon type="right"/>
                        </Button>
                    </Button.Group>
                </Card>
                <Card title='按钮尺寸' className='card-wrap'>
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value='small'>L</Radio>
                        <Radio value='default'>M</Radio>
                        <Radio value='large'>R</Radio>
                    </Radio.Group>
                    <Button size={this.state.size}>按钮尺寸</Button>
                    <Button size={this.state.size}>按钮尺寸</Button>
                    <Button size={this.state.size}>按钮尺寸</Button>
                </Card>
            </div>
        );
    }

}

export default Buttons;
