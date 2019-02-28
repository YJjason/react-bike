/**
 * +----------------------------------------------------------------------
 * | About | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';

class Info extends Component {


    render() {
        return (
            <div>
                动态匹配路由：{this.props.match.params.id}
            </div>
        );
    }

}

export default Info
