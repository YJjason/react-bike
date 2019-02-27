/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import MenuConfig from "../../resource/menuConfig";
import './index.less';

const SubMenu = Menu.SubMenu;

// const MenuItemGroup = Menu.ItemGroup;


class NavLeft extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({menuTreeNode});
    }

    /*渲染左侧菜单列表 递归*/
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title}>{item.title}</Menu.Item>
        })
    }

    render() {
        return (
            <div>
                <div className='logo'>
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme='dark'>
                    {/*<SubMenu key="sub1" title={<span><Icon type="mail"/>
                    <span>Navigation One</span></span>}>
                        <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </SubMenu>*/}
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }

}

export default NavLeft;
