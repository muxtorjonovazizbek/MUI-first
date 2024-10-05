import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Select, Upload,  } from "antd";
import { product, category, brands, brandCategory } from '@service';
import {UploadOutlined} from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea";
import FormItem from "antd/es/form/FormItem";


const Index = ({ open, handleCancel, update, getData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [brandCategoryList, setBrandCatgoryList] = useState([])
  // const [edit, setEdit] = useState({
  
  //   name: "",
  //   brandId: "",
   
  // })
  // console.log(brandList, "brandList");
  // console.log(edit, "bu edit");
  
  const handleFileUpload = ({ file }) => {
    form.setFieldsValue({ file });
    return false; // Fayl avtomatik yuklanishidan to'xtatish
  };


  useEffect(()=> {
    if (update && update.id) {
        form.setFieldsValue({
            name: update.name,
            price: update.price,
            category_id: update.category_id,
            brand_id: update.brand_id,
            brand_category_id: update.brand_category_id,
           
           
        })
    } else {
        form.resetFields()
    }     
  },[update, form])


  useEffect(()=> {
    getCategory()
    getBrand()
    getbrandCategory()
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
  const getCategory = async () => {
    try {
      const res = await category.get()
      console.log(res, "get res brand ");
      
      setCategoryList(res?.data?.data?.categories)
      
    } catch (error) {
      console.log("Error", error);
      message.error("Error getting categories")
    }
  }
  const getbrandCategory = async () => {
    try {
      const res = await brandCategory.get()
      console.log(res, "get res brand ");
      
      setBrandCatgoryList(res?.data?.data?.brandCategories)
      
    } catch (error) {
      console.log("Error", error);
      message.error("Error getting brand-categories")
    }
  }
  
  
  const handleSubmit = async (values) => {
    // console.log(values, "val check");
    
    // setEdit({
    //   name: values.name,
    //   brandId: values.brand_id,
     
    // })
    
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("category_id", values.category_id)
    formData.append("brand_id", parseInt(values.brand_id))
    formData.append("brand_brand_id", parseInt(values.brand_brand_id))

    if (values.file && values.file.file) {
      formData.append("file", values.file.file)
    }
    
    setLoading(true)
   if (update && update.id) {
      try {
        const res = await product.update(update.id, formData)
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
      const res = await product.create(formData)
      // console.log(res, "res create");
      if (res.status === 201) {
        message.success("Product created succesfully")
        handleCancel()
        getData()
       
      }
      
      
    } catch (error) {
      console.log(error);
      message.error("Error creating product")
      setLoading(false)
    }
   }
    

      
  }
  return (
    <>
      <Modal
        title={update && update.id ? "Edit Product" : "Create Product"}
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
            label="Product name"
            name="name"
            rules={[{required: true, message: "Enter brand name"}]}
          >
           <Input size="large"/> 
          </Form.Item>

          <Form.Item
            label="Product price"
            name="price"
            
            rules={[{required: true, message: "Enter roduct price"}]}
          >
            <Input size="large" type="number" inputMode="numeric" pattern="\d*"/>
          </Form.Item>

          <Form.Item
            label="Select Category"
            name="category_id"
            rules={[{required: true, message: "Select category name"}]}
          >
           <Select size="large" placeholder="Select category">
           {
              categoryList.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                 {category.name}
                </Select.Option>
              ))}
            </Select> 
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

          <Form.Item
            label="Select brand-category"
            name="brand_category_id"
            rules={[{required: true, message: "Select brand-category name"}]}
          >
           <Select size="large" placeholder="Select brand-category">
           {
              brandCategoryList.map((brandCategory) => (
                <Select.Option key={brandCategory.id} value={brandCategory.id}>
                 {brandCategory.name}
                </Select.Option>
              ))}
            </Select> 
          </Form.Item>


          {
            !update.id && (
              <Form.Item
            label="Select File"
            name="file"
            rules={[{required: true, message: "Select category name"}]}
          >
            <Upload beforeUpload={handleFileUpload}>
               <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
            )
          }

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

