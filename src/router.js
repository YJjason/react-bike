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
import OrderDetail from './pages/order/detail'

class Router extends Component {

    render() {
        return (
            <BrowserRouter>
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
            </BrowserRouter>
        );
    }

}

export default Router;
