import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./index.less";
import { formateDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import menuList from "../../routes";
import { Modal } from "antd";
import { reqW } from '../../api';
import LinkButton from "../link-button";
const { confirm } = Modal;

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    weather: ''
  };
  getTitle = () => {
    const path = this.props.location.pathname;
    let title = "";
    menuList.forEach((item) => {
      if (item.path === path) {
        title = item.title;
      } else if (item.children) {
        const result = item.children.find((cItem) => cItem.path === path);
        if (result) {
          title = result.title;
        }
      }
    });
    return title;
  };
  logout = () => {
    confirm({
      title: "确定退出吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace("/login");
      },
    });
  };
  getWeather = async () => {
    const req = await reqW('北京')
    if(req.status === 1000) {
      this.setState({
        weather: req.data.forecast[0].type
      })
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
    this.getWeather()
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const title = this.getTitle();
    const { currentTime, weather } = this.state;
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{memoryUtils.user.name}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            {/* <img
              src="http://api.map.baidu.com/images/weather/night/duoyun.png"
              alt=""
            /> */}
            <span style={{marginLeft: '10px'}}>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
