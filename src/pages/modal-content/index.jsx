import React, { useState } from 'react'
import GlobalModal from '../home/index'


const ModalContent = () => {
  const [data,setData] = useState([])
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState({})

  const deleteData = (id) => {
    let new_data = data.filter(val => val.id !== id)
    setData([...new_data])
  }

  const updateData = (val) => {
    setUpdate(val)
    setOpen(true)
  }

  const toggle = () => {
    setOpen(false)
    setUpdate({})

  }
  return (
    <div className='container mt-5'>
      <GlobalModal open={open} toggle={toggle} update={update} data={data} setData={setData}/>
      <div className="row my-3">
        <div className="col-md-3 offset-2">
          <button  className='btn btn-success' onClick={()=>setOpen(true)}>Open Modal</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-2">
          <table className='table table-bordered table-hover'>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                    data.map((val,ind) => (
                     <tr key={ind }>
                        <td>{ind + 1}</td>
                        <td>{val.name}</td>
                        <td>{val.age}</td>
                        <td>{val.phone}</td>
                        <td>{val.address}</td>
                        <td>
                          <button className='btn btn-danger mx-3' onClick={()=>deleteData(val.id)}>Del</button>
                          <button className='btn btn-info' onClick={()=>updateData(val)}>Edit</button>
                        </td>
                      </tr>
                    ))
                  }
              </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ModalContent