import React, {Component} from 'react';
import {Card, Button, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import './index.less';

class Category extends Component {
  state = {
    top: 'topLeft',
    bottom: 'bottomRight',
  };
  render(){
    const title = '一级分类列表';
    const extra = (
      <Button type="primary"><PlusOutlined />添加</Button>
    )
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
    const columns = [
      {
        title: '一级分类列表',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        key: 'action',
        width: 300,
        render: (text, record) => (
          <Space size="middle">
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </Space>
        ),
      },
    ];
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table columns={columns} dataSource={data} bordered rowKey='key'/>
        </Card>
      </div>
    )
  }
}

export default Category;