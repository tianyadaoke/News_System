import React from 'react'
import { Layout, Dropdown, Menu,Avatar } from 'antd';
import {withRouter} from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import {connect} from 'react-redux'

const { Header } = Layout;

function TopHeader(props) {
  // const [collapsed, setCollapsed] = useState(false)
  const changeCollapsed = () => {
   props.changeCollapsed()
  }
  const menu = (
    <Menu>
      <Menu.Item key="1">超级管理员</Menu.Item>
      <Menu.Item key="2" danger onClick={()=>{
        localStorage.removeItem('token')
        // console.log(props.history)
        props.history.replace("/login ")
      }}>退出</Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {
        props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
      }
      <div style={{ float: 'right' }}>
        <span>欢迎admin回来</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>,
      </div>
    </Header>
  )
}
const mapStateToProps = (state)=>{
  const {isCollapsed} = state.CollapsedReducer
  return {
    isCollapsed
  }
}
const mapDispatchToProps = {
  changeCollapsed(){
    return {
      type:"change_collapsed"
      // payload
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TopHeader))