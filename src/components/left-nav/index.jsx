import React, {Component} from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';

import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../routes';
// import Item from 'antd/lib/list/Item';
const { SubMenu } = Menu;

class LeftNav extends Component {
  getMenuNodes = () => {
    const path = this.props.location.pathname
    return menuList.map(menu => {
      let icon = ''
      if(!menu.children) {
        icon = React.createElement(Icon[menu.icon])
        return <Menu.Item key={menu.path} icon={icon}>
          <Link to={menu.path}>{menu.title}</Link>
        </Menu.Item>
      }else{
        // 查找一个与当前请求路径匹配的子Item
        const cItem = menu.children.find(cItem => path.indexOf(cItem.path) == 0)
        // 如果存在，说明当前menu的子列表需要展开
        if(cItem) {
          this.openKey = menu.path
        }
        let subMenu = menu.children.map(child => {
          icon = React.createElement(Icon[child.icon])
          return <Menu.Item key={child.path} icon={icon}>
            <Link to={child.path}>{child.title}</Link>
          </Menu.Item>
        })
        let parentIcon = React.createElement(Icon[menu.icon])
        return (
          <SubMenu key={menu.path} icon={parentIcon} title={menu.title}>
            {subMenu}
          </SubMenu>
        )
      }
    })
  }
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes()
  }
  render(){
    // 得到当前请求的路由路径
    let path = this.props.location.pathname;
    if(path.indexOf('/admin/product') === 0) { // 说明当前页面是商品或商品子路由
      path = '/admin/product';
    }
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to="/home" className="left-nav-header">
          <img src={logo} alt="" className="logo"/>
          <h1 className="title">硅谷后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
      
    )
  }
}

export default withRouter(LeftNav)