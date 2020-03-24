import React, { useState, useEffect } from "react";
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
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';

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

// export default class MaterialTable extends React.Component {
//   constructor() {
//     super();
//     this.state = { materials: [] };
//   }

//   componentDidMount() {
//     axios.post("/api/Materials/GetFiles").then(res => {
//       this.setState({
//         materials: res.data
//       });
//     });
//   }
//   render() {
//     return (
//       <React.Component>
//         <Button onClick={() => }> Add another home crumb </Button>
//         <TableContainer component={Paper}>
//           <Table
//             style={{
//               minWidth: 650
//             }}
//             size="small"
//             aria-label="a dense table"
//           >
//             <TableHead>
//               <TableRow>
//                 <TableCell>File Name</TableCell>
//                 <TableCell align="right">Size</TableCell>
//                 <TableCell align="right">Type</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {this.state.materials.map(material => (
//                 <TableRow key={material.id}>
//                   <TableCell component="th" scope="row">
//                     {material.Name}
//                   </TableCell>
//                   <TableCell align="right">{material.Size}</TableCell>
//                   <TableCell align="right">{material.type}</TableCell>

//                   <TableCell align="right">
//                     <Button size="small">
//                       <DownloadIcon
//                         onClick={() => {
//                           axios
//                             .get("/api/Materials/download", {
//                               params: { fileId: material.id },
//                               responseType: "blob"
//                             })

//                             .then(response => {
//                               var fileURL = window.URL.createObjectURL(
//                                 new Blob([response.data])
//                               );
//                               var fileLink = document.createElement("a");

//                               fileLink.href = fileURL;
//                               fileLink.setAttribute("download", material.Name);
//                               document.body.appendChild(fileLink);

//                               fileLink.click();
//                             });
//                         }}
//                       />
//                     </Button>
//                     <Button size="small">
//                       <DeleteIcon
//                         onClick={() => {
//                           axios
//                             .get("/api/Materials/delete", {
//                               params: { fileId: material.id }
//                             })
//                             .then(res => console.log(res));

//                           window.location.reload();
//                         }}
//                       />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </React.Component>
//     );
//   }
// }
const MaterialTable = ({ setCrumbs, mainFolderId }) => {
  const allMaterialsFromAPI = [
    { id: 0, label: "Home", type: "Folder", parentId: null, content: null },
    { id: 1, label: "A", type: "Folder", parentId: 0, content: null },
    {
      id: 2,
      label: "B",
      type: "File",
      parentId: 0,
      content: { size: 5000, url: "www.google.com", extension: ".png" }
    },
    { id: 3, label: "C", type: "Folder", parentId: 1, content: null },
    {
      id: 4,
      label: "D",
      type: "File",
      parentId: 1,
      content: { size: 500130, url: "www.google.com", extension: ".exe" }
    },
    {
      id: 5,
      label: "E",
      type: "File",
      parentId: 0,
      content: { size: 512000, url: "www.google.com", extension: ".sln" }
    }
  ];

  const [currentFolderId, setCurrentFolderId] = useState(0);
  const [displayedMaterials, setDisplayedMaterials] = useState(
    allMaterialsFromAPI
  );
  useEffect(() => {
    setCrumbs([
      { label: "Home", onClick: () => {setCurrentFolderId(0);
        setCrumbs(prevState => [...prevState.slice(0, 1)]);
      }, Icon: FolderIcon }
    ]);
  }, []);

  useEffect(() => {
    setDisplayedMaterials(
      allMaterialsFromAPI.filter(
        material => material.parentId === currentFolderId
      )
    );
  }, [currentFolderId]);

  return (
    <Grid container direction="column">
      {displayedMaterials?.map(material =>
        material.type === "Folder" ? (
          <Button
            onClick={() => {
              setCurrentFolderId(material.id);
              setCrumbs(prevCrumbs => [
                ...prevCrumbs,
                {
                  label: `${material.label} id: ${material.id}`,
                  Icon: FolderIcon,
                  onClick: () => {
                    setCurrentFolderId(material.id);
                    setCrumbs(prevState => [
                      ...prevState.slice(0, prevState.length - 1)
                    ]);
                  }
                }
              ]);
            }}
          >
            {`${material.label} ${material.id}`}
          </Button>
        ) : (
          <Typography> {`file ${material.label}`} </Typography>
        )
      )}
    </Grid>
  );
};

export default MaterialTable;
