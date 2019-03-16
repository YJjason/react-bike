/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Menu} from 'antd';
import MenuConfig from "../../config/menuConfig";

import {NavLink} from "react-router-dom";
import './index.less';

import {connect} from 'react-redux';
import {switchMenu} from './../../redux/action'

const SubMenu = Menu.SubMenu;

// const MenuItemGroup = Menu.ItemGroup;


class NavLeft extends Component {
    state = {
        currentKey: ''
    }

    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.pathname
        this.setState({
            menuTreeNode,
            currentKey
        });
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
            return <Menu.Item key={item.key} title={item.title}>
                <NavLink to={item.key}>
                    {item.title}
                </NavLink>
            </Menu.Item>
        })
    }
    handleClick = ({item,key}) => {
        //派发事件
        const {dispatch} = this.props;
        console.log(1122,item.props)
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey:key
        })
    }

    render() {
        return (
            <div>
                <div className='logo'>
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme='dark'
                      selectedKeys={this.state.currentKey}
                      onClick={this.handleClick}
                >
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

export default connect(null,null)(NavLeft);
