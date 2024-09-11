import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from 'reactstrap';
import axios from 'axios';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({data, setData}) {
  const dataDelete = (id) => {
    axios.delete(`http://localhost:3000/teacher/${id}`).then(()=> {
      const new__data = data.filter(item => item.id !== id)
      setData(new__data)
    }).catch((error) => {
      console.log(error);
      
    })
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">№</TableCell>
            <TableCell align="center">Teacher Name</TableCell>
            <TableCell align="center">Course Name</TableCell>
            <TableCell align="center">Action</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,ind) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{ind + 1}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.course}</TableCell>
              <TableCell align="center">
                {/* <Button style={{marginRight: "10px",background: "orange", border: "none"}} >Edit</Button> */}
                <Button style={{background: "red", border: "none", width: "60px"}} onClick={()=>dataDelete(row.id)}>Del</Button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
