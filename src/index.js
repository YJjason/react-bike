import React from 'react';
import ReactDOM from 'react-dom';
// import Admin from './Admin';
// import Home from './pages/route-demo/route1/Home';
// import Router from './pages/route-demo/route2/router';
import Router from './router';

import {Provider} from "react-redux"; // 添加<Provider />项目根组件
import configureStore from "./redux/store/index";

const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>
    , document.getElementById('root'));
