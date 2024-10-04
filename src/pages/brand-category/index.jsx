import { EditOutlined, ArrowsAltOutlined, DeleteOutlined, LinkOutlined,   } from '@ant-design/icons';
import { Button, Tooltip, Space, Input, Form  } from 'antd';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalTable, ConfirmDelete } from '@components';
import { BrandCategory } from '@modal';
import {brandCategory} from '@service';


const Index = () => {
  const [total, setTotal] = useState([])
  const [data,setData] = useState([])
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState({})
  const [form] = Form.useForm();
  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  })
  const {search} = useLocation()
  const navigate = useNavigate()
  const getData = async () => {
   try {
    const res = await brandCategory.get(params)
    console.log(res, "brand category");
    
    setData(res?.data?.data?.brandCategories)
  
    // console.log(res?.data?.data?.brand, "check");
    
    setTotal(res?.data?.data?.count)
   } catch (error) {
    console.log(error);
   }                                                  
  }

  useEffect(()=> {
    getData()
  },[params])

  useEffect(()=> {
    const params = new URLSearchParams(search)
    let page = Number(params.get("page")) || 1
    let limit = Number(params.get("limit")) || 3
    let search_value = params.get("search") || ""
    setParams((prev)=> ({
      ...prev,
      page: page,
      limit: limit,
      search: search_value
    }))
  }, [search])


  const editItem = (item) => {
    console.log(item);
    setUpdate(item)
    setOpen(true)
    
  }

  // const deleteItem = (id) => {
  //   console.log(id);
    
  // }

  const handleTableChange = (pagination) => {
    const {current, pageSize} = pagination
    setParams((prev)=>({
      ...prev,
      limit: pageSize,
      page: current
    }))
    const params = new URLSearchParams(search)
    params.set('page', `${current}`)
    params.set('limit', `${pageSize}`)
    navigate(`?${params}`)
  }

  const handleCancel = ()=> {
    setOpen(false)
    setUpdate({})
    form.resetFields()
  }

  const handleDelete = async (id)=> {
    // console.log(id, 'id');
    // brand.delete()

    try {
      await brandCategory.delete(id)
      setData(data.filter((item) => item.id !== id))
      setTotal(total - 1)
    } catch (error) {
      console.log("Error deleting itme", error);
      
    }    
  }

  const handleSearch = (evt)=> {
    setParams((prev)=> ({
      ...prev,
      search: evt.target.value
    }))
    const search_params = new URLSearchParams(search)
    search_params.set("search", evt.target.value)
    navigate(`?${search_params}`)
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
              <ConfirmDelete id={record.id} deleteItem={handleDelete}/>
          </Tooltip>

          
        </Space>
      ),
    },
    
  ];
  return (
    <>
      <h3 className='pl-2 py-2 font-bold fs-4 text-center'>Brand Categories</h3>
      
      <BrandCategory open={open} handleCancel={handleCancel} update={update} getData={getData}/>
      
      <div className='flex justify-between items-center'>
      <Input  style={{width: "300px"}} value={params.search} placeholder="Search" onChange={handleSearch} />
      <Button type='primary' className='mb-3' onClick={()=> setOpen(true)}>Open modal</Button>
      </div>
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