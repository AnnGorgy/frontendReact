import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";



import DownloadIcon from '@material-ui/icons/GetAppSharp';
import DeleteIcon from '@material-ui/icons/DeleteOutlineSharp';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(File_Name,Size, Type_ID , Material_ID) {
  return {File_Name,Size, Type_ID , Material_ID };
}

const rows = [
  createData('txt', 159, 6.0),
  createData('pdf', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];
const classes = useStyles();
export class MaterialTable extends React.component {


  constructor() {
    super()
    this.state = {materials :[]}
}
 
  componentDidMount()
  {
    axios.get("http://localhost:32733/api/Materials/GetFiles")
    .then(res =>{
      this.setState ({
        materials : res.data 
      }) 
    })
  }
  render() {
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Type</TableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.File_Name}
              </TableCell>
              <TableCell align="right">{row.Size}</TableCell>
              <TableCell align="right">{row.Type_ID}</TableCell>
              
              <TableCell align="right">
                <Button size="small">
                  <DownloadIcon
                    onClick={() => console.log(`Download ${row.id || index}`)}
                  />
                </Button>
                <Button size="small">
                  <DeleteIcon
                    onClick={() => console.log(`Delete ${row.id || index}`)}
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}}