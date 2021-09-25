import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './index.less';
import logo from '../../assets/images/logo.png';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

// 登录管理的路由页面
class Login extends Component {

  onFinish = async (values) => {
    const {username, password} = values;
    const res = await reqLogin(username, password);
    if(res.status === 0) {
      message.success('登录成功');
      memoryUtils.user = res.data;
      storageUtils.saveUser(res.data);
      this.props.history.replace('/');
    }else{
      message.error(res.msg);
    }
  }

  render(){
    const user = memoryUtils.user;
    if(user._id) {
      return <Redirect to="/admin" />
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt=""/>
          <h1 className="unitName">React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2 className="title">用户登陆</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true,}}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {required: true,message: '请输入账号!'},
                {min: 4,message: '账号不能少于4位!'},
                {max: 12,message: '账号不能多于12位!'},
                {pattern: /^[a-zA-Z0-9_]+$/,message: '账号必须是由应为、数字或下划线组成!'},
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{required: true,message: '请输入密码!'}]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="#2">
                忘记密码
              </a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default Login;