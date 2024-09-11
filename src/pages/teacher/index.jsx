import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TeacherTable, TeacherModal } from '../../components'
import { Button } from 'reactstrap'

const Index = () => {
  const [data,setData] = useState([])
  const [open,setOpen] = useState(false)
  const [course, setCourse] = useState([])
  useEffect(()=> {
    axios.get("http://localhost:3000/teacher").then( res => {
      setData(res?.data)
      
    })
  }, [])

  const handleClose = () => {
    setOpen(false)    
  }

  const openModal = async() => {
    await axios.get('http://localhost:3000/course').then(res => {
      setCourse(res?.data)
    })
    setOpen(true)
  }
  return (
    <div>
      <TeacherModal data={data} setData={setData} open={open} setOpen={setOpen} handleClose={handleClose} course={course}/>  
      <Button style={{marginBottom: "15px"}} color='primary' onClick={openModal}>Open Modal</Button>
     
      <TeacherTable data={data} setData={setData}/>
    </div>
  )
}

export default Index