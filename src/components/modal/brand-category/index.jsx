import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Select, Upload,  } from "antd";
import { brandCategory, brands } from '@service';
import {UploadOutlined} from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea";


const Index = ({ open, handleCancel, update, getData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [brandList, setBrandList] = useState([])
  const [edit, setEdit] = useState({
  
    name: "",
    brandId: "",
   
  })
  // console.log(categoryList, "categoryLIsy");
  console.log(edit, "bu edit");
  

  useEffect(()=> {
    if (update.id) {
        form.setFieldsValue({
            name: update.name,
            brand_id: update.brand_id,
           
        })
    } else {
        form.resetFields()
    }     
  },[update, form])


  useEffect(()=> {
    getBrand()
  },[]) 

  const getBrand = async () => {
    try {
      const res = await brands.get()
      console.log(res, "get res brand ");
      
      setBrandList(res?.data?.data?.brands)
      
    } catch (error) {
      console.log("Error", error);
      message.error("Error getting brand-category")
    }
  }
  
  
  const handleSubmit = async (values) => {
    
    setEdit({
      name: values.name,
      brandId: parseInt(values.brand_id),
     
    })
    
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("brand_id", parseInt(values.brand_id))
    
    

    
   if (update.id) {
      setLoading(true)
      try {
        const res = await brandCategory.update(update.id, formData)
        if (res.status === 200) {
          
          message.success("Brand Category updated succesfully")
          handleCancel()
          getData()
          setLoading(false)
        }
        
      } catch (error) {
        console.log(error);
        message.error("Error updating brand category")
        setLoading(false)
        
      }

   }else {
   
    try {
      const res = await brandCategory.create(formData)
      if (res.status === 201) {
        message.success("Brand category created succesfully")
        handleCancel()
        getData()
        setLoading(false)
      }
      console.log(res, "res from create");
      
      
    } catch (error) {
      console.log(error);
      message.error("Error creating brand category")
      setLoading(false)
    }
   }
    

      
  }
  return (
    <>
      <Modal
        title={update && update.id ? "Edit Brand Category" : "Create Brand Category"}
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
            label="Select Brand"
            name="brand_id"
            rules={[{required: true, message: "Select category name"}]}
          >
           <Select size="large" placeholder="Select brand">
           {
              brandList.map((brand) => (
                <Select.Option key={brand.id} value={brand.id}>
                 {brand.name}
                </Select.Option>
              ))}
            </Select> 
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

