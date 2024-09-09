import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Notification from "../../utils/notification";


const Index = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
  };
  
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (form.name === "admin") {
      navigate("/owner");
    } else if (form.name === "user") {
      navigate("/user");
    } else {
      // notifyError()
      Notification({title: "Xatolik mavjud", type: "error"})
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
              <form className="mt-4" onSubmit={handleSubmit} id="form">
                <TextField
                  fullWidth
                  label="Ismingizni kiriting"
                  name="name"
                  type="text"
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  margin="normal"
                  onChange={handleChange}
                />
              </form>
            </div>
            <div className="card-footer">
              <Button type='submit' 
                  variant='contained' 
                  color="success" 
                  form="form"
                  style={{marginTop: '12px'}} 
                  className='d-flex flex-column align-items-start'>
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
