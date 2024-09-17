import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signUpValidationScheme } from "@utils/validations";
import Notification from "../../utils/notification";
import axios from "axios";


const Index = () => {
  // const [form, setForm] = useState({});
  const navigate = useNavigate();

  // const handleChange = (evt) => {
  //   const { name, value } = evt.target;
  //   setForm({ ...form, [name]: value });
  // };
  
  const initialValues = {
    first_name:"",
    last_name:"",
    phone_number:"",
    email:"",
    password: ""
  };

 

  const handleSubmit = async (value) => {
    console.log(value);
    
    // value.preventDefault();

    // if (value.name === "admin") {
    //   navigate("/owner");
    // } else if (value.name === "user") {
    //   navigate("/user");
    // } else {
    //   // notifyError()
    //   Notification({title: "Xatolik mavjud", type: "error"})
    // }

    try {
      const res = await axios.post("https://texnoark.ilyosbekdev.uz/auth/admin/sign-up", value)
      console.log(res);

      if (res.status === 201) {
          navigate('/')
      }
      
    } catch (error) {
      console.log(error);
      Notification({title: "Error has found", type: "error"})
    }
    
  };

  return (
    <div style={{ textAlign: "center" }} className="container">
      <ToastContainer />
      <div className="row mt-4">
        <div className="col-md-6 offset-3">
          <div className="card">
            <div className="card-header">
              <Typography variant="h3">Sign Up</Typography>
            </div>
            <div className="card-body">
             <Formik 
              initialValues={initialValues} 
              onSubmit={handleSubmit} 
              validationSchema={signUpValidationScheme}
             > 
                <Form id="sign-up">
                  <Field
                    name="first_name"
                    as={TextField}
                    type="text"
                    fullWidth
                    // margin="normal"
                    variant="outlined"
                    label="First name"
                    helperText={
                      <ErrorMessage
                        name="first_name"
                        component="p"
                        className="fs-4 text-danger"
                      />
                    }
                  />
                  <Field
                    name="last_name"
                    as={TextField}
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Last name"
                    helperText={
                      <ErrorMessage
                        name="last_name"
                        component="p"
                        className="fs-4 text-danger"
                      />
                    }
                  />
                  <Field
                    name="phone_number"
                    as={TextField}
                    type="text"
                    fullWidth
                    // margin="normal"
                    variant="outlined"
                    label="Phone number"
                    helperText={
                      <ErrorMessage
                        name="phone_number"
                        component="p"
                        className="fs-4 text-danger"
                      />
                    }
                  />
                  <Field
                    name="email"
                    as={TextField}
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Email"
                    helperText={
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="fs-4 text-danger"
                      />
                    }
                  />
                  <Field
                    name="password"
                    as={TextField}
                    type="password"
                    fullWidth
                    variant="outlined"
                    label="Password"
                    helperText={
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="fs-4, text-danger"
                      />
                    }
                  />

                </Form>
             </Formik>
            </div>
            <div className="card-footer">
              <Button 
                  type='submit' 
                  variant='contained' 
                  color="success" 
                  form="sign-up"
                  style={{marginTop: '12px'}} 
                  className='d-flex flex-column align-items-start'
              >
                  Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
