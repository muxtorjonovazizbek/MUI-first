import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signInValidationScheme } from "@utils/validations";
import Notification from "../../utils/notification";
import { auth } from "@service";
import axios from "axios";


const Index = () => {
  // const [form, setForm] = useState({});
  const navigate = useNavigate();

  // const handleChange = (evt) => {
  //   const { name, value } = evt.target;
  //   setForm({ ...form, [name]: value });
  // };
  
  const initialValues = {
    phone_number: "",
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
      const res = await auth.sign_in(value)
      // console.log(res);
      let access_token = res.data.data.tokens.access_token
      localStorage.setItem("access_token", access_token)
      console.log(access_token);
      navigate("/owner")
      
      // if (access_token.status === 200) {
      //   Notification({ title: "Successfully signed in", type: "success" });
      // }
      
      
    } catch (error) {
      console.log(error);
      Notification({title: "Password or Phone number is wrong!", type: "error"})
    }
  };

  return (
    <div style={{ textAlign: "center" }} className="container">
      <ToastContainer />
      <div className="row mt-4">
        <div className="col-md-6 offset-3">
          <div className="card">
            <div className="card-header">
              <Typography variant="h3">Material UI Design</Typography>
            </div>
            <div className="card-body">
             <Formik 
              initialValues={initialValues} 
              onSubmit={handleSubmit}
              validationSchema={signInValidationScheme}
             > 
                <Form id="sign-in">
                  <Field
                    name="phone_number"
                    as={TextField}
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Phone number"
                    helperText={
                      <ErrorMessage
                        name="phone_number"
                        component="p"
                        className="fs-4, text-danger"
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
                  form="sign-in"
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
