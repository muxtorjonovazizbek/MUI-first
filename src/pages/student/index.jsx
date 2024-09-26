import { EditOutlined, ArrowsAltOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { category } from '@service';
import { GlobalTable } from '@components';
import { Category } from '@modal';

const Index = () => {
  const [total, setTotal] = useState([])
  const [data,setData] = useState([])
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState({})
  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  })
  const getData = async () => {
   try {
    const res = await category.get([params])
    setData(res?.data?.data?.categories)
    setTotal(res?.data?.data?.count)
   } catch (error) {
    console.log(error);
    // Notification({title: "Error", type: "danger"})
   }
  }

  useEffect(()=> {
    getData(params)
  },[])

  const editItem = (item) => {
    console.log(item);
    setUpdate(item)
    setOpen(true)
    
  }

  const deleteItem = (id) => {
    console.log(id);
    
  }

  const handleTableChange = (pagination) => {
    const {current, pageSize} = pagination
    setParams((prev)=>({
      ...prev,
      limit: pageSize,
      page: current
    }))
    console.log(pagination); 
  }

  const handleCancel = ()=> {
    setOpen(false)
    setUpdate({})
  }


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
              <Button type="default" onClick={()=> editItem(record)} icon={<EditOutlined/>}/>
          </Tooltip>
          <Tooltip title="Delete">
              <Button type="default" onClick={()=> deleteItem(record.id)} icon={<DeleteOutlined/>}/>
          </Tooltip>
        </Space>
      ),
    },
    
  ];
  return (
    <>
      <h3 className='pl-2 py-2 font-bold fs-4 text-center'>Category</h3>
      <Category open={open} handleCancel={handleCancel} category={update}/>
      <Button type='primary' className='mb-3 ml-[570px]' onClick={()=> setOpen(true)}>Open modal</Button>
      <GlobalTable
       columns={columns} 
       data={data}
       pagination={{
        current: params.page,
        pageSize: params.limit,
        total: total,
        showSizeChanger: true,
        pageSizeOptions: ['2', '5', '7', '10','12']
       }}
       handleChange={handleTableChange}
      />
    </>
  )
}

export default Index