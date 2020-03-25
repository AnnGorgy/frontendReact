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

const Assignment = ({ setCrumbs, mainFolderId }) => {
  const listAssignments = async () => {
    const url = `Materials/GetFiles`;
    const { data } = await post(url, null);
    setAllAssignments(data);
  };

  const [allAssignments, setAllAssignments] = useState();
  const [currentFolderId, setCurrentFolderId] = useState(0);
  const [displayedAssignments, setDisplayedAssignments] = useState();

  useEffect(() => {
    listAssignments();
  }, []);

  useEffect(() => {
    if (allAssignments) {
      const rootFolder = allAssignments.filter(
        assignment => assignment.parent_ID === null
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
  }, [allAssignments]);

  useEffect(() => {
    if (allAssignments) {
      setDisplayedAssignments(
        allAssignments.filter(assignment => assignment.parent_ID === currentFolderId)
      );
    }
  }, [currentFolderId]);

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
          {displayedAssignments?.map(assignment => (
            <TableRow
              key={assignment.id}
              onClick={() => {
                if (assignment.type === "folder") {
                  setCurrentFolderId(assignment.id);
                  setCrumbs(prevCrumbs => [
                    ...prevCrumbs,
                    {
                      label: assignment.Name,
                      id: assignment.id,
                      Icon: FolderIcon,
                      onClick: () => {
                        setCurrentFolderId(assignment.id);
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
                    {assignment.type === "folder" ? <FolderIcon /> : <FileIcon />}
                  </Grid>
                  <Grid item>
                    <Typography>{assignment.Name}</Typography>
                  </Grid>
                </Grid>
              </TableCell>

              <TableCell align="right">
                {assignment.type === "folder"
                  ? `${
                      allAssignments.filter(
                        current => current.parent_ID === assignment.id
                      ).length
                    } files`
                  : `${Math.ceil(assignment.Size / 1024)} KB`}
              </TableCell>
              <TableCell align="right">{assignment.type}</TableCell>
              {assignment.type === "folder" ? (
                <TableCell align="right">{}</TableCell>
              ) : (
                <TableCell align="right">
                  <Button size="small">
                    {/* add folder kda fl database */}
                    {assignment.type === "file" && (
                      <DownloadIcon
                        onClick={() => {
                          get("/Materials/download", {
                            params: { fileId: assignment.id },
                            responseType: "blob"
                          }).then(response => {
                            var fileURL = window.URL.createObjectURL(
                              new Blob([response.data])
                            );
                            var fileLink = document.createElement("a");

                            fileLink.href = fileURL;
                            fileLink.setAttribute("download", assignment.Name);
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
                          params: { fileId: assignment.id }
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

export default Assignment;
