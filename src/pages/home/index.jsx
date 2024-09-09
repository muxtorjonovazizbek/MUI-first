import React, { useState } from 'react'
import { nanoid } from 'nanoid'
// import { Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const GlobalModal = (props) => {
    const {open, toggle,data,setData, update} = props
    const [form, setForm] = useState({
        name: '',
        age: '',
        phone: '',
        address: ''
    })
    
    const handleChange = (evt) => {
        const {name, value} = evt.target
        setForm({...form, [name]:value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (update.id) {
            data.forEach(element => {
                if (element.id === update.id) {
                    element.name = form.name 
                    element.age = form.age 
                    element.phone = form.phone 
                    element.address = form.address 
                }
            });
        }else {
            let payload = {...form, id: nanoid()}
            let new_data = [...data, {...payload}]
            setData ([...new_data])
        }
        toggle()
    } 
  return (
    <Modal isOpen={open} toggle={toggle}>
        <h1>salom</h1>
        <ModalHeader>
            <h3 className='text-center'>Add User</h3>
        </ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit} id='form'>
                <input defaultValue={update?.name} name="name" type="text" onChange={handleChange} placeholder='name' className='form-control my-2'/>
                <input defaultValue={update?.age} name="age" type="number" onChange={handleChange} placeholder='age' className='form-control my-2'/>
                <input defaultValue={update?.phone} name="phone" type="text" onChange={handleChange} placeholder='phone' className='form-control my-2'/>
                <input defaultValue={update?.address} name="address" type="text" onChange={handleChange} placeholder='address' className='form-control my-2'/>
            </form>
        </ModalBody>
        <ModalFooter>
            <button type='submit' form='form' className='btn btn-success'>Save</button>
        </ModalFooter>
    </Modal>
  )
}

export default GlobalModal