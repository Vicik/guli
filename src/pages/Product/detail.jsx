import React, { Component } from 'react';
import { Card,List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategory } from '../../api';
const {Item} = List;

// Product的详情子路由组件
export default class Detail extends Component {
  state = {
    cName1: '', // 一级分类名称
    cName2: '' // 二级分类名称
  }
  async componentDidMount() {
    const {pCategoryId, categoryId} = this.props.location.state;
    if(pCategoryId === 0) { // 一级分类下的商品
      const result = await reqCategory(categoryId);
      this.setState({
        cName1: result.data.name
      })
    }else{
      const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
      this.setState({
        cName1: results[0].data.name,
        cName2: results[1].data.name
      })
    }
  }
  render() {
    const product = this.props.location.state;
    const {cName1, cName2 } = this.state;
    const title = (
      <span>
        <LinkButton style={{marginRight: 5}} onClick={() => this.props.history.goBack()}>
          <ArrowLeftOutlined/>
        </LinkButton>
        <span>商品详情</span>
      </span>     
    )
    return (
      <Card title = {title} className="product-detail">
        <List>
          <Item style={{justifyContent: 'start'}}>
            <span className="left">商品名称：</span>
            <span>{product.name}</span>
          </Item>
          <Item style={{justifyContent: 'start'}}>
            <span className="left">商品描述：</span>
            <span>{product.desc}</span>
          </Item>
          <Item style={{justifyContent: 'start'}}>
            <span className="left">商品价格：</span>
            <span>{product.price}</span>
          </Item>
          <Item style={{justifyContent: 'start'}}>
            <span className="left">所属分类：</span>
            <span>{cName1} {cName2 ? '--> ' + cName2 : ''}</span>
          </Item>
          <Item style={{justifyContent: 'start'}}>
            <span className="left">商品图片：</span>
            <div>
            {product.imgs.map(img => {
              return (
                <img src={img} alt="" className="product-img" key={img}/>
              )
            })}
            </div>
          </Item>
          <Item style={{justifyContent: 'start'}}>
            <span className="left">商品详情：</span>
            <div dangerouslySetInnerHTML={{__html: product.detail}}></div>
          </Item>
        </List>
      </Card>
    )
  }
}
