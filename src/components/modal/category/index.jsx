import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";


const Index = ({ open, handleCancel, category }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(()=> {
    if (category) {
        form.setFieldsValue({
            name: category.name
        })
    } else {
        form.resetFields()
    }
  },[category, form])

  const handleSubmit = (values) => {
    setLoading(true)
    if (category.id) {
        console.log(values, "update");
        
    } else {
        console.log(values, 'create');
        
    }
    console.log(values);
    setLoading(false)
    handleCancel()
      
  }
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title={category ? "Create Category" : "Edit Category"}
        open={open}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          name="categoryForm"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={ handleSubmit }
          layout="vertical"
        >
          <Form.Item
            label="Category name"
            name="name"
            rules={[{required: true, message: "Enter category name"}]}
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

                Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Index;
