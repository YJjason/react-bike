/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
/*数据处理*/
import {type} from './../action'

const initialState = {
    menuName: '首页'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state, // 旧值
                menuName: action.menuName // 新值
            }

        default:
            return {
                ...state
            }
    }
}
