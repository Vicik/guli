import React, {Component} from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';
import Home from './home';
import AddUpdate from './add-update';
import Detail from './detail';
import './index.less';

class Product extends Component {
  render(){
    return (
      <div>
        <Switch>
          <Route path='/admin/product' component={Home} exact/>
          <Route path='/admin/product/addUpdate' component={AddUpdate}/>
          <Route path='/admin/product/detail' component={Detail}/>
          <Redirect to='/admin/product'/>
        </Switch>
      </div>
    )
  }
}

export default Product;