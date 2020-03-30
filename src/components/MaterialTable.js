import React, { useState, useEffect } from "react";
import { post, get } from "axios";

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
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/DescriptionOutlined";

import DownloadIcon from "@material-ui/icons/GetAppSharp";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";

const MaterialTable = ({ setCrumbs, reloadMaterials, setReloadMaterials }) => {
  const listMaterials = async () => {
    const url = `Materials/GetFiles`;
    const { data } = await post(url, null);
    setAllMaterials(data);
  };

  const [allMaterials, setAllMaterials] = useState();
  const [currentFolderId, setCurrentFolderId] = useState();
  const [displayedMaterials, setDisplayedMaterials] = useState();

  useEffect(() => {
    if(reloadMaterials === true) {
      listMaterials();
      setReloadMaterials(false);
    }
  }, [reloadMaterials]);

  useEffect(() => {
    if (allMaterials && currentFolderId === undefined) {
      const rootFolder = allMaterials.filter(
        material => material.parent_ID === null
      )[0];
      setCurrentFolderId(rootFolder.id);
      setCrumbs([
        {
          label: rootFolder.Name,
          id: rootFolder.id,
          onClick: () => {
            setCurrentFolderId(rootFolder.id);
            setCrumbs(prevState => [...prevState.slice(0, 1)]);
          },
          Icon: FolderIcon
        }
      ]);
    }
  }, [allMaterials]);

  useEffect(() => {
    if (allMaterials) {
      setDisplayedMaterials(
        allMaterials.filter(material => material.parent_ID === currentFolderId)
      );
    }
  }, [currentFolderId, allMaterials]);

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
          {displayedMaterials?.map(material => (
            <TableRow
              key={material.id}
              onClick={() => {
                if (material.type === "folder"){ 
                  setCurrentFolderId(material.id);
                  setCrumbs(prevCrumbs => [
                    ...prevCrumbs,
                    {
                      label: material.Name,
                      id: material.id,
                      Icon: FolderIcon,
                      onClick: () => {
                        setCurrentFolderId(material.id);
                        setCrumbs(prevState => [
                          ...prevState.slice(0, prevState.length - 1)
                        ]);
                      }
                    }
                  ]);
                }
              }}
            >
              <TableCell component="th" scope="row">
                <Grid container>
                  <Grid item>
                    {material.type === "folder" ? <FolderIcon /> : <FileIcon />}
                  </Grid>
                  <Grid item>
                    <Typography>{material.Name}</Typography>
                  </Grid>
                </Grid>
              </TableCell>

              <TableCell align="right">
                {material.type === "folder"
                  ? `${
                      allMaterials.filter(
                        current => current.parent_ID === material.id
                      ).length
                    } files`
                  : `${Math.ceil(material.Size / 1024)} KB`}
              </TableCell>
              <TableCell align="right">{material.type}</TableCell>
              {material.type === "folder" ? (
                <TableCell align="right">{}</TableCell>
              ) : (
                <TableCell align="right">
                  <Button size="small">
                    {/* add folder kda fl database */}
                    {material.type === "file" && (
                      <DownloadIcon
                        onClick={() => {
                          get("/Materials/download", {
                            params: { fileId: material.id },
                            responseType: "blob"
                          }).then(response => {
                            var fileURL = window.URL.createObjectURL(
                              new Blob([response.data])
                            );
                            var fileLink = document.createElement("a");

                            fileLink.href = fileURL;
                            fileLink.setAttribute("download", material.Name);
                            document.body.appendChild(fileLink);

                            fileLink.click();
                          });
                        }}
                      />
                    )}
                  </Button>
                  <Button size="small">
                    <DeleteIcon
                      onClick={() => {
                        get("/Materials/delete_File_and_Folder", {
                          params: { fileId: material.id }
                        })
                          .then(() => window.location.reload())
                          .catch(err => console.error(err));
                      }}
                    />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
