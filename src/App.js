/**
 * +----------------------------------------------------------------------
 * | App | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';

class App extends Component {
    componentDidMount() {
        console.log('123app',this.props.children)
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}

export default App;
