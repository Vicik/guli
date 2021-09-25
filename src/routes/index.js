const menuList = [
  {
    title: '首页',
    path: '/admin/home',
    icon: 'HomeOutlined',
  },
  {
    title: '商品',
    path: '/admin/products',
    icon: 'AppstoreOutlined',
    children: [
      {
        title: '品类管理',
        path: '/admin/category',
        icon: 'BarsOutlined',
      },
      {
        title: '商品管理',
        path: '/admin/product',
        icon: 'ToolOutlined',
      }
    ]
  },
  {
    title: '用户管理',
    path: '/admin/user',
    icon: 'UserOutlined',
  },
  {
    title: '角色管理',
    path: '/admin/role',
    icon: 'SafetyOutlined',
  },
  {
    title: '图形图表',
    path: '/admin/charts',
    icon: 'AreaChartOutlined',
    children: [
      {
        title: '柱形图',
        path: '/admin/bar',
        icon: 'BarsOutlined',
      },
      {
        title: '折线图',
        path: '/admin/line',
        icon: 'ToolOutlined',
      },
      {
        title: '饼状图',
        path: '/admin/pie',
        icon: 'ToolOutlined',
      }
    ]
  },
]
export default menuList