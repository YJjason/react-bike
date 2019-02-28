/**
 * +----------------------------------------------------------------------
 * | App | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';

class App extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}

export default App;
