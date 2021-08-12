import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Particles from 'react-particles-js';
import './Login.css'
export default function Login(props) {
  const onFinish = (value) => {
    console.log(value)
    // 发送axios请求到服务器
    localStorage.setItem('token','112233')
    props.history.push('/')
  }
  return (
    <div style={{ backgroundColor: "rgb(35,39,65)", height: "100%" ,overflow:'hidden'}}>
       <Particles 
       height={document.documentElement.clientHeight}/>
      <div className="formContainer">
        <div className="loginTitle">登陆系统</div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
