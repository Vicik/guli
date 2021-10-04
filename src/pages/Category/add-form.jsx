import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
const { Option } = Select;

export default class AddForm extends Component {
  form = React.createRef()
  static propTypes = {
    categories: PropTypes.array.isRequired,
    parentId: PropTypes.number.isRequired,
    setForm: PropTypes.func.isRequired
  }
  componentWillMount() {
    this.props.setForm(this.form)
  }
  render() {
    console.log(this.props.parentId)
    return (
      <Form name="control-ref" ref={this.form}>
        <Form.Item name="category" label="所属分类" rules={[{required: true}]} initialValue={this.props.parentId}>
          <Select onChange={this.onGenderChange} allowClear>
            <Option value={0}>一级分类</Option>
            {
              this.props.categories.map(category => {
                return (
                  <Option value={category.id} key={category.id}>{category.name}</Option>
                )
              })
            }
          </Select>
        </Form.Item>
        <Form.Item name="categoryName" label="分类名称" placeholder="请输入分类名称" rules={[{required: true,}]}>
          <Input />
        </Form.Item>
      </Form>
    )
  }
}
