import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useParams } from "react-router-dom";
import { subCategory } from '@service';


const Index = ({ open, handleCancel, update, getData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {id} = useParams()
  // const [categories, setCategories] = useState()

  useEffect(()=> {
    if (update) {
        form.setFieldsValue({
            name: update.name
        })
    } else {
        form.resetFields()
    }
  },[update, form])

  const handleSubmit = async (values) => {
    
    const newData = {
      name: values.name,
      parent_category_id: +id
    }
   if (update.id) {
      setLoading(true)
      try {
        const res = await subCategory.update(update.id, newData)
        message.success("Sub-category updated succesfully")
       
      } catch (error) {
        console.log(error);
        message.error("Error updating sub-category")
        
      }

   }else {
    try {
      const res = await subCategory.create(newData)
      message.success("Sub-category created succesfully")
     
    } catch (error) {
      console.log(error);
        message.error("Error creating sub-category")
    }
   }
    getData()
    setLoading(false)
    handleCancel()
      
  }
  return (
    <>
      <Modal
        title={update && update.id ? "Edit Sub-category" : "Create Sub-category"}
        open={open}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          name="subCategoryForm"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={ handleSubmit }
          layout="vertical"
        >
          <Form.Item
            label="Sub-category name"
            name="name"
            rules={[{required: true, message: "Enter sub-category name"}]}
          >
           <Input size="large"/> 
          </Form.Item>

          <Form.Item>
            <Button
                size="large"
                style={{width: "100%"}}
                type="primary"
                htmlType="submit"
                loading={loading}
            >
                {/* {category ? "Update" : "Add"} */}
                {/* {category.id ? "Update" : "Add"} */}
                {/* Add */}
                {update && update.id ? "Update" : "Add"}
              
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Index;
