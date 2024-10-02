import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Select, Upload,  } from "antd";
import { brands } from '@service';
import {UploadOutlined} from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea";


const Index = ({ open, handleCancel, update, getData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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
    console.log(values, "value hs");
    
    
   if (update.id) {
      setLoading(true)
      try {
        const res = await brands.update(update.id, values)
        console.log(res, 'res from edit');
        
        message.success("Brands updated succesfully")
       
      } catch (error) {
        console.log(error);
        message.error("Error updating brands")
        
      }

   }else {
    try {
      const res = await brands.create(values)
      console.log(res, "res from create");
      
      
      message.success("Brands created succesfully")
     
    } catch (error) {
      console.log(error);
        message.error("Error creating brands")
    }
   }
    getData()
    setLoading(false)
    handleCancel()
      
  }
  return (
    <>
      <Modal
        title={update && update.id ? "Edit Brand" : "Create Brand"}
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
            label="Brand name"
            name="name"
            rules={[{required: true, message: "Enter brand name"}]}
          >
           <Input size="large"/> 
          </Form.Item>

          <Form.Item
            label="Select Category"
            name="name"
            rules={[{required: true, message: "Select category name"}]}
          >
           <Select size="large"/> 
          </Form.Item>

          <Form.Item
            label="Select Category"
            name="name"
            rules={[{required: true, message: "Select category name"}]}
          >
            <Upload>
               <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Add Desc..."
            name="name"
            rules={[{required: true, message: "Add Description"}]}
          >
           <TextArea/> 
          </Form.Item>

          <Form.Item>
            <Button
                size="large"
                style={{width: "100%"}}
                type="primary"
                htmlType="submit"
                loading={loading}
            >
      
              {update && update.id ? "Update" : "Add"}
              
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Index;
