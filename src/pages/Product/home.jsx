import React, { Component } from 'react';
import {Card,Select,Input,Button,Table} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqProducts, reqSearchProducts } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';
const { Option } = Select;
// Product的默认子路由组件
export default class Home extends Component {
  state = {
    products: [{
      key: '1',
      name: '胡彦斌',
      price: 32,
      desc: '西湖区湖底公园1号',
      status: 1
    },
    {
      key: '2',
      name: '胡彦祖',
      price: 42,
      desc: '西湖区湖底公园1号',
      status: 0
    }], // 商品的数组
    total: 0,
    searchName: '', // 关键字
    searchType: 'productName', // 根据哪个字段搜索
  }
  // 初始化table的列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price,
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'status',
        render: (status) => {
          return (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
              </span>
          )
        },
      },
      {
        title: '操作',
        width: 100,
        render: () => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        },
      },
    ]
  }
  // 获取指定页码的列表数据显示
  getProducts = async (pageNum) => {
    const { searchName, searchType } = this.state;
    let result = '';
    if(searchName) {
      result = await reqSearchProducts({
        pageNum, pageSize: PAGE_SIZE, searchName, searchType
      });
    }else{
      result = await reqProducts(pageNum, PAGE_SIZE);
    }
    if(result.status === 0) {
      const {total,list} = result.data
      this.setState({
        products: list,
        total
      })
    }
  }
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getProducts(1);
  }
  render() {
    const { products,total,searchType, searchName } = this.state
    const title = (
      <span>
        <Select value={searchType} style={{width: 150}} onChange={value => this.setState({searchType: value})}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" value={searchName} style={{width: 150,margin: '0 15px'}} onChange={e => this.setState({searchName: e.target.value})}/>
        <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type="primary"><PlusOutlined />添加商品</Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table rowKey="key" bordered dataSource={products} 
        columns={this.columns}
        pagination={
          {
            defaultPageSize: PAGE_SIZE,
            total: total, 
            onChange: this.getProducts}
        }
        ></Table>
      </Card>
    )
  }
}
