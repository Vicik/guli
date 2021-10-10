import React, { Component } from 'react';
import {Card,Form, Input, Cascader, Upload, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
const { Item } = Form;
const { TextArea } = Input;

// Product的添加和更新的子路由组件
export default class AddUpdate extends Component {
  onFinish = (values) => {
    console.log(values)
  }
  render() {
    const title = (
      <span>
        <LinkButton style={{marginRight: 5}} onClick={() => this.props.history.goBack()}>
          <ArrowLeftOutlined/>
        </LinkButton>
        <span>添加商品</span>
      </span>     
    )
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 10}
    }
    return (
      <Card title = {title} className="product-detail">
        <Form {...formItemLayout} onFinish={this.onFinish}>
          <Item label="商品名称" name="name" rules={[
            {
              required: true,
              message: '请输入商品名称',
            }
          ]}>
            <Input placeholder="商品名称"/>
          </Item>
          <Item label="商品描述" name="desc" rules={[
            {
              required: true,
              message: '请输入商品描述',
            }
          ]}>
            <TextArea placeholder="商品描述"/>
          </Item>
          <Item label="商品价格" name="price" rules={[
            {
              required: true,
              message: '请输入商品价格',
            },
            ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('price') * 1 > 0) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('商品价格必须大于0'));
            },
          }),
          ]}>
            <Input placeholder="商品价格" type="number" addonAfter="元"/>
          </Item>
          <Item label="商品分类" name="category" rules={[
            {
              required: true,
              message: '请输入商品分类',
            }
          ]}>
            <Input placeholder="商品名称"/>
          </Item>
          <Item label="商品图片">
            <Input placeholder="商品名称"/>
          </Item>
          <Item label="商品详情">
            <Input placeholder="商品名称"/>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
