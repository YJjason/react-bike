/**
 * +----------------------------------------------------------------------
 * | router | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

import React, {Component} from 'react';
import {HashRouter as Router, Route} from "react-router-dom";

import Main from './Main';
import Info from './Info';
import Topic from './../route1/Topic';
import About from './../route1/About';
import Home from './Home';

class IRouter extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Home>
                        <Route path="/main" render={()=>
                        <Main>
                            <Route path='/main/:id' component={Info}></Route>
                        </Main>
                        } />
                        <Route path="/about" exact component={About}/>
                        <Route path="/topics" exact component={Topic}/>
                    </Home>
                </div>
            </Router>
        );
    }

};
export default IRouter;
