import React, { useState } from 'react'
import { Table, Tag, Button, Modal, Popover,Switch } from 'antd'
import axios from 'axios';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal
export default function RightList() {
  const d1 = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '3',
      name: 'test3',
      age: 12,
      address: '西湖区湖底公园1号',
    },
    {
      key: '4',
      name: 'test4',
      age: 11,
      address: '西湖区湖底公园1号',
    },
  ];
  const [dataSource, setDataSource] = useState(d1)
  // 通过axios得到真实数据
  // useEffect(() => {
  //   axios.get("http://localhost/5000/rights").then(res=>{
  //     setDataSource(res.data)
  //   }) 
  // }, [])
  const confirmMethod = (item) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        // console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  const deleteMethod = (item) => {
    console.log("delete", item)
    // 当前页面同步状态+后端同步
    setDataSource(dataSource.filter(data => data.key !== item.key))
    axios.delete(`http://localhost:5000/rights/${item.id}`)

  }
  const switchMethod=(item)=>{
    console.log('改变状态：',item)
    //并且发送axios请求
  }
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <b>{name}</b>
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      render: (add) => <Tag color="orange">{add}</Tag>
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
           <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)} />
          
          <Popover content={<div style={{textAlign:'center'}}>
            <Switch checked={true} onChange={()=>switchMethod(item)}></Switch>
          </div>}
            title="页面配置项"
            trigger="click">
           <Button type="primary" shape="circle" icon={<EditOutlined />} />
          </Popover>
        </div>
      }
    }
  ]

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{
        pageSize: 2
      }} />
    </div>
  )
}
