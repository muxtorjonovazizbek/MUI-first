import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Select, Upload,  } from "antd";
import { product, category, brands, brandCategory } from '@service';
import {UploadOutlined} from "@ant-design/icons"


const Index = ({ open, handleCancel, update, getData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [brandCategoryList, setBrandCatgoryList] = useState([])
  const [edit, setEdit] = useState({})
  
  const handleFileUpload = ({ file }) => {
    form.setFieldsValue({ file });
    return false;
  };


  useEffect(()=> {
    if (update.id) {
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
  },[]) 


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
 

  const handleSubmit = async (values) => {

    setEdit({
      name: values.name,
      prie: values.price,
      category_id:  parseInt(values.category_id),
      brand_id: values.brand_id,
      brand_category_id: values.brand_category_id
    })
    
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("price", values.price)
    formData.append("category_id", parseInt(values.category_id))
    formData.append("brand_id", values.brand_id)
    formData.append("brand_category_id", values.brand_category_id)

    if (values.file && values.file.file) {
      formData.append("file", values.file.file)
    }
    
    // setLoading(true)
   if (update.id) {
      try {
        const res = await product.update(update.id, edit)
        if (res.status === 200) {
          
          message.success("Brand Category updated succesfully")
          handleCancel()
          getData()
          // setLoading(false)
        }
        
      } catch (error) {
        console.log(error);
        message.error("Error updating brand category")
        // setLoading(false)
        
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
      // setLoading(false)
    }
   }
    

      
  }

  const handleChange = async (value, InputName) => {
    if (InputName === "category_id") {
      const res = await brands.getBrandCategoryId(value)
      if (res.status === 200) {
        // console.log(, 'brand id');
        setBrandList(res?.data?.data?.brands)
        
      }
    }
    if (InputName === "brand_id") {
        const res = await brandCategory.getBrandCategoryId(value)
        if (res.status === 200) {
          // console.log(res, "bc ID");
          setBrandCatgoryList(res?.data?.data?.brandCategories)
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
          name="productForm"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={ handleSubmit }
          layout="vertical"
        >
         <div className="d-flex gap-3 ml-3">
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
         </div>

        <div className="flex gap-3 ml-3 w-full">
        <Form.Item
            label="Select Category"
            name="category_id"
            rules={[{required: true, message: "Select category name"}]}
          >
           <Select onChange={(value) => handleChange(value,"category_id" )} size="large" placeholder="Select category" style={{width: "205px"}}>
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
           <Select onChange={(value)=> handleChange(value,"brand_id" )} size="large" placeholder="Select brand" style={{width: "205px"}}>
           {
              brandList.map((brand) => (
                <Select.Option key={brand.id} value={brand.id}>
                 {brand.name}
                </Select.Option>
              ))}
            </Select> 
          </Form.Item>
        </div>

          <div className="d-flex gap-3 ml-3">
          <Form.Item
            label="Select brand-category"
            name="brand_category_id"
            rules={[{required: true, message: "Select brand-category name"}]}
          >
           <Select size="large" placeholder="Select brand-category" style={{width: "205px"}}>
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
            name="files"
            rules={[{required: true, message: "Select category name"}]}
          >
            <Upload  beforeUpload={handleFileUpload} >
               <Button size="large" style={{width: "205px"}} icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
            )
          }
          </div>

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

