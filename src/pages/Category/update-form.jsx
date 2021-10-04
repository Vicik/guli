import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
const { Option } = Select;

export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }
  form = React.createRef()
  componentWillMount() {
    this.props.setForm(this.form)
  }
  render() {
    const { categoryName } = this.props;
    return (
      <Form name="control-ref" ref={this.form}>
        <Form.Item name="categoryName" placeholder="请输入分类名称" initialValue={categoryName} rules={[{required: true}]}>
          <Input/>
        </Form.Item>
      </Form>
    )
  }
}
