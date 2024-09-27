import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const Index = ({id, deleteItem}) => {
    const handleDelete = ()=> {
        deleteItem(id)
    }
  return (
    <>
        <Popconfirm
    title="Delete the category"
    description="Are you sure to delete this category?"
    okText="Yes"
    cancelText="No"
    onConfirm={handleDelete}
  >
    <Button  icon={<DeleteOutlined/>}></Button>
  </Popconfirm>
    </>
  )
};
export default Index;