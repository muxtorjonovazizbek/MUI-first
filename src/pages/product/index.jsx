import { EditOutlined, ArrowsAltOutlined, DeleteOutlined, LinkOutlined,   } from '@ant-design/icons';
import { Button, Tooltip, Space, Input, Form  } from 'antd';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalTable, ConfirmDelete } from '@components';
import { Product } from '@modal'; 
import {product} from '@service';



const Index = () => {
  const [total, setTotal] = useState(0)
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
    const res = await product.get(params)
    console.log(res, "products");
    
    setData(res?.data?.data?.products || [])
    setTotal(res?.data?.data?.count  || 0)
  
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
    let limit = Number(params.get("limit")) || 2
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

  const deleteItem = async (id) => {
    const res = await product.delete(id)
    if (res.status === 200) {
      getData()
    }
    
  }

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

  // const handleDelete = async (id)=> {
  //   // console.log(id, 'id');
  //   // brand.delete()

  //   try {
  //     const res = await product.delete(id)
  //     setData(data.filter((item) => item.id !== id))
  //     setTotal(total - 1)
  //   } catch (error) {
  //     console.log("Error deleting itme", error);
      
  //   }    
  // }

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
      title: "№",
      render: (_, __, ind) => {
        if (params?.page && params?.limit) {
         return (params.page - 1) * params.limit + ind + 1;
        }
        return ind + 1;
      }
    },
  
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
              <ConfirmDelete onConfirm={()=> deleteItem(record.id)} icon={<DeleteOutlined/>} />
              
          </Tooltip>
        

          
        </Space>
      ),
    },
    
  ];
  return (
    <>
      <h3 className='pl-2 py-2 font-bold fs-4 text-center'>Product</h3>
      
      <Product open={open} handleCancel={handleCancel} update={update} getData={getData}/>
      
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