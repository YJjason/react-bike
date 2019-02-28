/**
 * +----------------------------------------------------------------------
 * | Main | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Main extends Component {


    render() {

        return (
            <div>
                this is main page
                <Link to='/main/a'>嵌套路由</Link>

                {this.props.children}
            </div>
        );
    }

}

export default Main
