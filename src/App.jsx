// 应用的根组件
import React, {Component} from 'react';
import { BrowserRouter as Router,Route,Redirect,Switch } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';

class App extends Component {
  render(){ 
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Redirect to="/admin" />
        </Switch>
      </Router>
    )
  }
}

export default App;