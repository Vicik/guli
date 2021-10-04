import React, {Component} from 'react';
import {Card, Button, Table, Space, message,Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import AddForm from './add-form';
import UpdateForm from './update-form';
import './index.less';
import { reqCategories,reqAddCategory,reqUpdateCategory } from '../../api'


class Category extends Component {
  state = {
    categories: [{
      name:'家用电器',
      id: 9
    }], // 一级分类列表
    parentId: 0,
    parentName: '',
    subCategories: [], // 二级分类列表
    showStatus: 0, // 标识添加/更新的确认框是否显示 0：都不显示  1：显示添加  2：显示更新
  };
  // 初始化Table所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        key: 'action',
        width: 300,
        render: (category) => (
          <Space size="middle">
            <LinkButton onClick={()=> this.showUpdate(category)}>修改分类</LinkButton>
            {
              this.state.parentId === 0? <LinkButton onClick={() => this.showSubCategories(category)}>查看子分类</LinkButton>: null
            }
          </Space>
        ),
      },
    ];
  }
  // 异步获取一级/二级分类列表显示
  // parentId: 如果没有指定根据状态中的parentId请求，如果指定了根据指定的Id请求
  getCategories = async (parentId) => {
    parentId = parentId === 0? parentId: this.state.parentId;
    const result = await reqCategories(parentId);
    if(result.status === 0) {
      if(parentId === 0) {
        this.setState({categories: result.data});
      }else{
        this.setState({subCategories: result.data});
      }
    }else{
      message.error('获取分类列表失败');
    }
  }
  // 显示二级分类列表
  showSubCategories = (category) => {
    const { id,name } = category;
    this.setState({parentId: id,parentName: name}, () => { // 状态封信且重新render()执行
      this.getCategories();
    });
  }
  // 显示一级分类列表
  showCategories = () => {
    this.setState({
      parentId: 0,
      parentName: '',
      subCategories: []
    })
  }
  // 关闭添加/更新确认框
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }
  // 显示添加
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  // 添加
  addCategory = () => {
    const form = this.addObj.current;
    form.validateFields()
    .then(async values => {
      const { category, categoryName} = values;
      const result = await reqAddCategory({
        parentId: category,
        categoryName: categoryName, 
      });
      if(result.status === 0) {
        this.handleCancel();
        if(category === this.state.parentId) {
          this.getCategories();
        }else if(category === 0) { // 在二级分类中添加一级分类，需重新获取数据
          this.getCategories(0);
        }
      }
    })
    .catch(errorInfo => {
      console.log(errorInfo)
    })
    
  }
  // 显示更新
  showUpdate = (category) => {
    // 保存分类对象
    this.category = category;
    this.setState({
      showStatus: 2
    })
  }
  // 更新
  updateCategory = () => {
    const form = this.addObj.current;
    form.validateFields()
    .then(async values => {
      const result = await reqUpdateCategory({
        categoryId: this.category.id,
        categoryName: values.categoryName
      });
      if(result.status === 0) {
        this.handleCancel();
        this.getCategories();
      }
    })
    .catch(errorInfo => {
      console.log(errorInfo)
    })
  }
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getCategories();
  }
  render(){
    const extra = (
      <Button type="primary" onClick={this.showAdd}><PlusOutlined />添加</Button>
    )
    const category = this.category || {name: ''}
    const {categories,subCategories,parentName,parentId, showStatus} = this.state ;
    const categoryArr = categories || []
    const title = parentId === 0?'一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategories}>一级分类列表</LinkButton>
        <ArrowRightOutlined style={{margin: 5}}/>
        <span>{parentName}</span>
      </span>
    );
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table rowKey='id' columns={this.columns} dataSource={parentId === 0?categories : subCategories} bordered/>
          <Modal title="添加分类" visible={showStatus===1} onOk={this.addCategory} onCancel={this.handleCancel}>
            <AddForm ref categories={categoryArr} parentId={parentId} setForm = {(obj) => this.addObj=obj}/>
          </Modal>
          <Modal title="更新分类" visible={showStatus===2} onOk={this.updateCategory} onCancel={this.handleCancel}>
            <UpdateForm categoryName={category.name} setForm = {(obj) => this.addObj = obj}/>
          </Modal>        
        </Card>
      </div>
    )
  }
}
export default Category;