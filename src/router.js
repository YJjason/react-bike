/**
 * +----------------------------------------------------------------------
 * | router | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {HashRouter, BrowserRouter, Route, Switch} from "react-router-dom";
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
            <HashRouter>
                <App>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/admin' render={() =>
                        <Admin>
                            <Switch>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/ui/buttons' component={Buttons}></Route>
                                <Route path='/admin/ui/modals' component={Modals}></Route>
                                <Route path='/admin/ui/loadings' component={Loading}></Route>
                                <Route path='/admin/ui/notification'component={Notification}></Route>
                                <Route path='/admin/ui/messages' component={Message}></Route>
                                <Route path='/admin/ui/tabs' component={Tabls}></Route>
                                <Route path='/admin/ui/gallery' component={Gallery}></Route>
                                <Route path='/admin/ui/carousel' component={Carousels}></Route>
                                <Route path='/admin/form/login' component={FormLogin}></Route>
                                <Route path='/admin/form/reg' component={Register}></Route>
                                <Route path='/admin/table/basic' component={BasicTable}></Route>
                                <Route path='/admin/table/high' component={HighTable}></Route>
                                <Route path='/admin/city' component={FilterForm}></Route>
                                <Route path='/admin/order' component={Order}></Route>
                                <Route path='/admin/permission' component={Permission}></Route>
                                <Route path='/admin/user' component={User}></Route>
                                <Route path='/admin/bikeMap' component={BickMap}></Route>
                                <Route path='/admin/charts/bar' component={Bar}></Route>
                                <Route path='/admin/charts/pie' component={Pie}></Route>
                                <Route path='/admin/charts/line' component={Line}></Route>
                                <Route path='/admin/rich' component={Rich}></Route>
                                <Route component={Nomatch}></Route>
                            </Switch>
                        </Admin>
                    }/>
                    <Route path='/common' render={() =>
                        <Common>
                            <Route path='/common/order/detail/:orderId' component={OrderDetail}></Route>
                        </Common>
                    }/>

                </App>
            </HashRouter>
        );
    }

}

export default Router;
