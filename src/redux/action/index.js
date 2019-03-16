/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
/*actino 类型*/
export const type = {
    SWITCH_MENU:'SWITCH_MENU',
    SWITCH_USERS:'SWITCH_USERS'
}

//菜单点击切换,修改面包屑名称
export function switchMenu(menuName) {
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}
export function switchUsers(userName) {
    return{
        type:type.SWITCH_USERS,
        userName
    }
}
