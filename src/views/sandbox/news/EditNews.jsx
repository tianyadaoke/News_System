import React, { useState,useRef } from 'react'
import { Steps, Button, Form, Input, Select, message, notification } from 'antd';
import NewsEditor from '../../../components/newseditor/NewsEditor'
import style from './EditNews.module.css'
import axios from '../../../util/http';

const { Step } = Steps;
const { Option } = Select

export default function EditNews(props) {
  const [current, setCurrent] = useState(0)
  const [formInfo, setFormInfo] = useState({})
  const [content, setContent] = useState("")
  const user =  JSON.parse(localStorage.getItem("token"))
  const handleSave=(auditState)=>{
    axios.post("/news",{
      "content":content,
      ...formInfo,
      user,
      "auditState":auditState
    }).then(res=>{
      notification.info({
        message:'通知',
        description:'保存/发布成功',
        placement:"bottomRight"
      })
      props.history.push('/home')
    }).catch(error=>{
      notification.info({
        message:'通知',
        description:'保存/发布失败',
        placement:"bottomRight"
      })
      props.history.push('/home')
    })
  }
  const handleNext = () => {
    if(current===0){
      NewsForm.current.validateFields().then(res=>{
        setFormInfo(res)
        setCurrent(current + 1)
      }).catch(error=>{
        console.log(error)
      })
    } else{
      if(content===""||content.trim()==="<p></p>"){
        message.error('新闻内容不能为空')
      } else{ 
        setCurrent(current + 1)
      }
    }
    
  }
  const handlePre = () => {
    setCurrent(current - 1)
  }
  const categoryList=[
    {id:1,title:'体育'},
    {id:2,title:'军事'},
    {id:3,title:'编码'},
    {id:4,title:'财经'}
  ]
   const NewsForm  = useRef(null)
  return (
    <div>
      <Steps current={current}>
        <Step title="基本信息" description="新闻标题，分类" />
        <Step title="新闻内容" description="新闻内容主题" />
        <Step title="新闻提交" description="保存草稿或提交审核" />
      </Steps>


      <div style={{ marginTop: '50px' }}>
        <div className={current === 0 ? '' : style.hidden}>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            ref={NewsForm}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Select>
              {
                categoryList.map(item=>{
                  return <Option value={item.id} key={item.id}>{item.title}</Option>
                })
              }

              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current === 1 ? '' : style.hidden}>
          <NewsEditor getContent={(value)=>{
            setContent(value)
          }}></NewsEditor>
        </div>
        <div className={current === 2 ? '' : style.hidden}>
        
        </div>

      </div>
      <div style={{ marginTop: '50px' }}>
        {
          current === 2 && <span>
            <Button type="primary" onClick={()=>{handleSave(0)}}>保存草稿箱</Button>
            <Button type="danger"  onClick={()=>{handleSave(1)}}>提交审核</Button>
            </span>
        }
        {
          current < 2 && <Button type="primary" onClick={handleNext}>下一步</Button>
        }
        {
          current > 0 && <Button onClick={handlePre}>上一步</Button>
        }
      </div>
    </div>
  )
}
