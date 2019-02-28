/**
 * +----------------------------------------------------------------------
 * | Home | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {HashRouter, Route, Link} from "react-router-dom";
import Main from './Main';
import About from './About';
import Topic from './Topic';

class Home extends Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>
                    <hr/>

                    <Route path="/" exact component={Main}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/topics" exact component={Topic}/>
                </div>
            </HashRouter>
        );

        /*        function About() {
                    return (
                        <div>
                            <h2>About</h2>
                        </div>
                    );
                }

                function Topics({match}) {
                    return (
                        <div>
                            <h2>Topics</h2>
                            <ul>
                                <li>
                                    <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                                </li>
                                <li>
                                    <Link to={`${match.url}/components`}>Components</Link>
                                </li>
                                <li>
                                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                                </li>
                            </ul>

                            <Route path={`${match.path}/:topicId`} component={Topic}/>
                            <Route
                                exact
                                path={match.path}
                                render={() => <h3>Please select a topic.</h3>}
                            />
                        </div>
                    );
                }

                function Topic({match}) {
                    return (
                        <div>
                            <h3>{match.params.topicId}</h3>
                        </div>
                    );
                }*/
    }

}

export default Home;
