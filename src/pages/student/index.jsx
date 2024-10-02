  import { EditOutlined, ArrowsAltOutlined, DeleteOutlined, LinkOutlined,   } from '@ant-design/icons';
  import { Button, Tooltip, Space, Input, message } from 'antd';
  import React, { useEffect, useState } from 'react'
  import { useLocation, useNavigate } from 'react-router-dom';
  import { category } from '@service';
  import { GlobalTable, ConfirmDelete } from '@components';
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
    const {search} = useLocation()
    const navigate = useNavigate()
    const getData = async () => {
    try {  
      const res = await category.get(params)
      console.log(res);
      
      setData(res?.data?.data?.categories)
      setTotal(res?.data?.data?.count)
    } catch (error) {
      console.log(error);
      // Notification({title: "Error", type: "danger"})
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
      console.log(item,"item edit");
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
      const params = new URLSearchParams(search)
      params.set('page', `${current}`)
      params.set('limit', `${pageSize}`)
      navigate(`?${params}`)
    }

    const handleCancel = ()=> {
      setOpen(false)
      setUpdate({})
      
    }

   
    // const createCategory = async (data) => {
    //   console.log(data);
      
    //   // try {
    //   //   const res = await category.create(data);
    //   //   console.log(res, "create");
        
    //   //   if (res.status === 201) {
    //   //     setData([...data, res.data.data ]); 
    //   //     setTotal((prev) => prev + 1); 
    //   //     message.success("Category successfully created");
    //   //   }
       
    //   // } catch (error) {
    //   //   console.log("Error creating category:", error);
    //   //   message.error("This category is already exist");
    //   // }
    // };

   
    // const updateCategory = async (data) => {
    //   try {
    //     const res = await category.update(data);
    //     console.log(res, "update");
        
    //     if (res.status === 200) { 
    //       setData((prev) => prev.map((item) => (item.id === data.id ? { ...item, ...data } : item))); 
    //       message.success("Category successfully updated"); 
    //     }
    //     handleCancel(); // Modalni yopish
    //   } catch (error) {
    //     console.log("Error updating category:", error);
    //     message.error("Error found");
    //   }
    // };

    const handleDelete = async (id)=> {
      try {
       const res =  await category.delete(id)
        setData(data.filter((item) => item.id !== id))
        setTotal(total - 1)
        message.success("Category successfully deleted");
      } catch (error) {
        console.log("Error deleting itme", error);
        message.error("Error deleting the category");
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
                {/* <Button type="default" onClick={()=> deleteItem(record.id)} icon={<DeleteOutlined/>}/> */}
                <ConfirmDelete id={record.id} deleteItem={handleDelete}/>
            </Tooltip>

            <Tooltip title="Link">
                <Button type="default" onClick={()=> navigate(`/owner/sub-category/${record.id}`)} icon={<LinkOutlined />}/>
              
            </Tooltip>
          </Space>
        ),
      },
      
    ];
    return (
      <>
        <h3 className='pl-2 py-2 font-bold fs-4 text-center'>Category</h3>
        
        <Category open={open} handleCancel={handleCancel} update={update} setUpdate={setUpdate} setData={setData} getData={getData}/>
        
        <div className='flex justify-between items-center'>
        <Input  style={{width: "300px"}} value={params.search} placeholder="Basic usage" onChange={handleSearch} />
        <Button type='primary' className='mb-3' onClick={()=> setOpen(true)}>Create...</Button>
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