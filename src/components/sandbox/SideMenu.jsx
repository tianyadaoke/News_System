import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {
  UserOutlined
} from '@ant-design/icons';
import './index.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios'


const { Sider } = Layout;
const { SubMenu } = Menu;
const menuList = [
  {
    key: '/home',
    title: '首页',
    icon: <UserOutlined />
  },
  {
    key: '/user-manage',
    title: '用户管理',
    icon: <UserOutlined />,
    children: [
      {
        key: '/user-manage/list',
        title: '用户列表',
        icon: <UserOutlined />
      }
    ]
  },
  {
    key: '/right-manage',
    title: '权限管理',
    icon: <UserOutlined />,
    children: [
      {
        key: '/right-manage/role/list',
        title: '角色列表',
        icon: <UserOutlined />
      },
      {
        key: '/right-manage/right/list',
        title: '权限列表',
        icon: <UserOutlined />
      }
    ]
  },
  {
    key: '/edit-news',
    title: '编辑新闻',
    icon: <UserOutlined />
  },

]
function SideMenu(props) {
  // 真实案例中根据axios渲染列表
  // const [menu, setMenu] = useState([])
  // useEffect(() => {
  //   axios.get("http://localhost:9000/rights?_embed=children").then(
  //     res => {
  //       console.log(res.data)
  //       setMenu(res.data)
  //     },
  //     error => {
  //       console.log(error.message)
  //     }
  //   )
  // }, [])
  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children) {
        return <SubMenu key={item.key} icon={item.icon} title={item.title}>
          {renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item
        key={item.key}
        icon={item.icon}
        onClick={() => { props.history.push(item.key) }}>
        {item.title}
      </Menu.Item>
    })
  }
  const selectKeys=[props.location.pathname]
  const openKeys=["/"+props.location.pathname.split("/")[1]]
  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed} >
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="logo" >全球新闻发布管理系统</div>
        <div style={{flex:1,overflow:'auto'}}>
          <Menu theme="dark" mode="inline" selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
            {
              renderMenu(menuList)
            }
          </Menu>
        </div>
      </div>

    </Sider>

  )
}
const mapStateToProps=(state)=>{
  const {isCollapsed} = state.CollapsedReducer
  return {
    isCollapsed
  }
}
export default connect(mapStateToProps)(withRouter(SideMenu))