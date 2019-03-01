/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

import React,{Component} from 'react';
import {Card,Spin,Icon,Alert,Switch} from "antd";
import './../ui.less'
class Loading extends Component{
    state = { loading: false }

    toggle = (value) => {
        this.setState({ loading: value });
    }

    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        return (
            <div>
                <Card title='spin 用法' className=' spin-wrap'>
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                    <Spin indicator={antIcon}/>
                </Card>
                <Card title='内容遮罩' className='card-wrap'>
                    <Spin spinning={this.state.loading}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                        />
                    </Spin>
                    <div style={{ marginTop: 16 }}>
                        Loading state：<Switch checked={this.state.loading} onChange={this.toggle} />
                    </div>
                    <Spin tip="Loading...">
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }

}
export default Loading;
