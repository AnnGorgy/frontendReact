import React from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

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

import DownloadIcon from "@material-ui/icons/GetAppSharp";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";

function createData(File_Name, Size, Type_ID, Material_ID) {
  return { File_Name, Size, Type_ID, Material_ID };
}

const rows = [
  createData("txt", 159, 6.0),
  createData("pdf", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0)
];

export default class MaterialTable extends React.Component {
  constructor() {
    super();
    this.state = { materials: [] };
  }

  componentDidMount() {
    axios.post("/api/Materials/GetFiles").then(res => {
      this.setState({
        materials: res.data
      });
    });
  }
  render() {
    return (
      <TableContainer component={Paper}>
        <Table
          style={{
            minWidth: 650
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.materials.map(material => (
              <TableRow key={material.id}>
                <TableCell component="th" scope="row">
                  {material.Name}
                </TableCell>
                <TableCell align="right">{material.Size}</TableCell>
                <TableCell align="right">{material.type}</TableCell>

                <TableCell align="right">
                  <Button size="small">
                    <DownloadIcon
                      onClick={() => console.log(`Download ${material.id}`)}
                    />
                  </Button>
                  <Button size="small">
                    <DeleteIcon
                      onClick={() => {
                      
                        axios
                          .get("/api/Materials/delete", {
                            params: { fileId: material.id }
                          })
                          .then(res => console.log(res));
                      }}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
