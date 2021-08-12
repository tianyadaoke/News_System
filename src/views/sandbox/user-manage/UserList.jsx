import React,{useState,useRef} from 'react'
import { Button, Modal, Form, Input,Select } from 'antd';

const {Option}=Select

export default function UserList() {
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [regionList, setRegionList] = useState([
    {id:1,value:'beijing',title:'北京'},
    {id:2,value:'hangzhou',title:'杭州'},
    {id:3,value:'shanghai',title:'上海'},
  ])
  const addForm=useRef(null)
  const roleList=[
    {id:1,roleName:'超级管理员'},
    {id:2,roleName:'一般管理员'},
    {id:3,roleName:'管理员'},
    {id:4,roleName:'普通用户'}
  ]
  return (
    <div>
      <Button type="primary" onClick={()=>{setIsAddVisible(true)}}>添加用户</Button>

      <Modal
        visible={isAddVisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={()=>{
          setIsAddVisible(false)
        }}
        onOk={() => {
          
         addForm.current.validateFields().then(value => {
           addForm.current.resetFields()
           setIsAddVisible(false)
           //发送axios请求value

         })
         .catch(err=>{
           console.log(err)
           setIsAddVisible(false)
         })
        }}
      >
        <Form
          ref={addForm}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '用户名必填' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '密码必填' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="region"
            label="区域"
            rules={[{ required: true, message: '区域必填' }]}
          >
           <Select>
             {
               regionList.map(item=>
                 <Option value={item.value} key={item.id}>{item.title}</Option>
               )
             }
           </Select>
          </Form.Item>
          <Form.Item
            name="roleId"
            label="角色"
            rules={[{ required: true, message: '角色必填' }]}
          >
            <Select>
             {
               roleList.map(item=>
                 <Option value={item.id} key={item.id}>{item.roleName}</Option>
               )
             }
           </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
