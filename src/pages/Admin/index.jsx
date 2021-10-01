import React, {Component} from 'react';
import { Layout } from 'antd';
import {Redirect,Route,Switch} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Headers from '../../components/header';
import Home from '../Home';
import Category from '../Category';
import Product from '../Product';
import Role from '../Role';
import User from '../User';
import Bar from '../Charts/bar';
import Line from '../Charts/line';
import Pie from '../Charts/pie';
const { Footer, Sider, Content } = Layout;


// 后台管理的路由页面
class Admin extends Component {
  render(){
    const user = memoryUtils.user;
    if(!user || !user._id) {
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Headers></Headers>
          <Content style={{margin: 20,backgroundColor: '#fff'}}>
            <Switch>
              <Route path='/admin/home' component={Home} />
              <Route path='/admin/category' component={Category} />
              <Route path='/admin/product' component={Product} />
              <Route path='/admin/role' component={Role} />
              <Route path='/admin/user' component={User} />
              <Route path='/admin/bar' component={Bar} />
              <Route path='/admin/line' component={Line} />
              <Route path='/admin/pie' component={Pie} />
              <Redirect to='/admin/home' />
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center',color: '#999'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin;