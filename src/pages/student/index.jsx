import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { category } from '@service';
import { GlobalTable } from '@components';

const Index = () => {
  const [data,setData] = useState([])
  const getData = async () => {
   try {
    const res = await category.get()
    setData(res?.data?.data?.categories)
   } catch (error) {
    console.log(error);
    // Notification({title: "Error", type: "danger"})
   }
  }

  useEffect(()=> {
    getData()
  },[])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];
  // const createCategory = async () => {
  //   // try {
  //   //   const payload = {name: "new category-1"}
  //   //   const access_token = localStorage.getItem("access_token")
  //   //   const res = await axios.post("https://texnoark.ilyosbekdev.uz/category/create", payload, {
  //   //     headers: {
  //   //       Authorization:  `Bearer ${access_token}`
  //   //     }
  //   //   })
  //   // } catch (error) {
  //   //   console.log(error);
  //   //   Notification();
  //   // }
    
  // }
  return (
    <div>
      <h3 className='pl-2 py-2 font-bold fs-4 text-center'>Category</h3>
      <GlobalTable columns={columns} data={data}/>
    </div>
  )
}

export default Index