/**
 * +----------------------------------------------------------------------
 * | router | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {HashRouter, BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import App from './App';
import Common from './common'

import Login from './pages/login';
import Admin from './Admin';
import Home from './pages/home';

import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loading from './pages/ui/loading';
import Notification from './pages/ui/notification';
import Message from './pages/ui/message';
import Tabls from './pages/ui/tabs';
import Gallery from "./pages/ui/gallery";
import Carousels from "./pages/ui/carousel";

import Nomatch from "./pages/nomatch";
import FormLogin from "./pages/form/login";
import Register from "./pages/form/register";
//表格
import BasicTable from "./pages/table/basicTable";
import HighTable from "./pages/table/highTable";
/*城市管理*/
import FilterForm from './pages/city';
/*订单管理*/
import Order from './pages/order';
import OrderDetail from './pages/order/detail';
/*权限管理*/
import Permission from './pages/permission';

/*员工管理*/
import User from './pages/user';
/*车辆地图*/
import BickMap from './pages/map';

/*柱形图*/
import Bar from './pages/echarts/bar';
/*饼图*/
import Pie from './pages/echarts/pie';
/*折线图*/
import Line from './pages/echarts/line';
/*富文本*/
import Rich from './pages/rich';

class Router extends Component {

    render() {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/common' render={() =>
                            <Common>
                                <Route path='/common/order/detail/:orderId' component={OrderDetail}></Route>
                            </Common>
                        }/>
                        <Route path='/' render={() =>
                            <Admin>
                                <Switch>
                                    <Route path='/home' component={Home}></Route>
                                    <Route path='/ui/buttons' component={Buttons}></Route>
                                    <Route path='/ui/modals' component={Modals}></Route>
                                    <Route path='/ui/loadings' component={Loading}></Route>
                                    <Route path='/ui/notification' component={Notification}></Route>
                                    <Route path='/ui/messages' component={Message}></Route>
                                    <Route path='/ui/tabs' component={Tabls}></Route>
                                    <Route path='/ui/gallery' component={Gallery}></Route>
                                    <Route path='/ui/carousel' component={Carousels}></Route>
                                    <Route path='/form/login' component={FormLogin}></Route>
                                    <Route path='/form/reg' component={Register}></Route>
                                    <Route path='/table/basic' component={BasicTable}></Route>
                                    <Route path='/table/high' component={HighTable}></Route>
                                    <Route path='/city' component={FilterForm}></Route>
                                    <Route path='/order' component={Order}></Route>
                                    <Route path='/permission' component={Permission}></Route>
                                    <Route path='/user' component={User}></Route>
                                    <Route path='/bikeMap' component={BickMap}></Route>
                                    <Route path='/charts/bar' component={Bar}></Route>
                                    <Route path='/charts/pie' component={Pie}></Route>
                                    <Route path='/charts/line' component={Line}></Route>
                                    <Route path='/rich' component={Rich}></Route>
                                    <Redirect to='/home'/>
                                    <Route component={Nomatch}></Route>
                                </Switch>
                            </Admin>
                        }/>
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }

}

export default Router;
