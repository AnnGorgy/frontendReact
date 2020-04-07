import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import mime from "mime-types";
import Tooltip from "@material-ui/core/Tooltip";

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
  Typography,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/DescriptionOutlined";
import VideoIcon from "@material-ui/icons/Videocam";
import LinkIcon from "@material-ui/icons/Link";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ScheduleIcon from "@material-ui/icons/Schedule";

import DownloadIcon from "@material-ui/icons/GetAppSharp";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";

const MaterialTable = ({
  setCrumbs,
  match,
  reloadMaterials,
  setReloadMaterials,
}) => {
  const listMaterials = async () => {
    const materialsUrl = `/Doctor_Materials/GetFiles`;
    const { data } = await post(materialsUrl, null, {
      params: { sub_Id: match.params.courseId },
    });
    if (data.length === 0) {
      await createRootFolder();
      window.location.reload();
    }
    setAllMaterials(data);
  };

  const createRootFolder = async () => {
    //FIXME: This shouldn't be a function or endpoint, otherwise it should be handled in the backend
    const url = "/Doctor_Materials/Create_First_Folder_Subject";
    const folderName = JSON.parse(localStorage.getItem("subjects")).find(
      (subject) => subject.$id === match.params.courseId
    ).Subjectname;
    await get(url, {
      params: { sub_Id: match.params.courseId, Folder_Name: folderName },
    });
  };

  const listAssignments = async () => {
    setCurrentFolderId(undefined);
    const assignmentsUrl = `/assignment/GetFiles`;
    const { data } = await post(assignmentsUrl, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllAssignments(
      data.map((assignment) => ({ ...assignment, type: "assignment" }))
    );
  };

  const [allMaterials, setAllMaterials] = useState();
  const [allAssignments, setAllAssignments] = useState();
  const [currentFolderId, setCurrentFolderId] = useState();
  const [displayedMaterials, setDisplayedMaterials] = useState();

  const getIcon = (material) => {
    switch (material.type) {
      case "file":
        return <FileIcon />;
      case "Video":
        return <VideoIcon />;
      case "assignment":
        return <AssignmentIcon />;
      case "URL":
        return <LinkIcon />;
      case "folder":
        return <FolderIcon />;
      default:
        break;
    }
  };

  useEffect(() => {
    if (reloadMaterials === true) {
      listMaterials();
      listAssignments();
      setReloadMaterials(false);
    }
  }, [reloadMaterials]);

  useEffect(() => {
    listMaterials();
    listAssignments();
  }, [match.params.courseId]);

  useEffect(() => {
    if (allMaterials && currentFolderId === undefined) {
      const rootFolder = allMaterials.filter(
        (material) => material.parent_ID === null
      )[0];
      setCurrentFolderId(rootFolder.id);
      setCrumbs([
        {
          label: rootFolder.Name,
          id: rootFolder.id,
          onClick: () => {
            setCurrentFolderId(rootFolder.id);
            setCrumbs((prevState) => [...prevState.slice(0, 1)]);
          },
          Icon: FolderIcon,
        },
      ]);
    }
  }, [allMaterials]);

  useEffect(() => {
    if (allMaterials && allAssignments) {
      setDisplayedMaterials([
        ...allMaterials.filter(
          (material) => material.parent_ID === currentFolderId
        ),
        ...allAssignments.filter(
          (assignment) => assignment.Parent_ID === currentFolderId
        ),
      ]);
    }
  }, [currentFolderId, allMaterials, allAssignments]);

  return (
    <TableContainer
      component={Paper}
      style={{
        maxHeight: "90vh",
        overflowY: "auto",
        maxWidth: "170vh",
        marginLeft: "28px",
      }}
    >
      <Table
        style={{
          minWidth: 650,
        }}
        size="small"
        /*  aria-label="a dense table" */
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedMaterials?.map((material, index, assignment) => (
            <TableRow
              // FIXME: any url not starting with http:// or https:// won't navigate
              key={index}
              onClick={() => {
                if (material.type === "folder") {
                  setCurrentFolderId(material.id);
                  setCrumbs((prevCrumbs) => [
                    ...prevCrumbs,
                    {
                      label: material.Name,
                      id: material.id,
                      Icon: FolderIcon,
                      onClick: () => {
                        setCurrentFolderId(material.id);
                        setCrumbs((prevState) => {
                          if (
                            prevState[prevState.length - 1].id === material.id
                          )
                            return prevState;
                          return [...prevState.slice(0, prevState.length - 1)];
                        });
                      },
                    },
                  ]);
                }
              }}
            >
              <TableCell
                component="a"
                scope="row"
                href={material.type === "URL" ? material.url : null}
                target="_blank"
              >
                <Grid container spacing={1}>
                  <Grid item>{getIcon(material)}</Grid>
                  <Grid item>
                    <Typography>{material.Name}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell align="right">
                {material.type === "folder"
                  ? `${
                      allMaterials.filter(
                        (current) => current.parent_ID === material.id
                      ).length +
                      allAssignments.filter(
                        (current) => current.Parent_ID === material.id
                      ).length
                    } files`
                  : `${Math.ceil(material.Size / 1024)} KB`}
              </TableCell>
              <TableCell align="right">{material.type}</TableCell>
              <TableCell align="right">{material.description}</TableCell>
              {material.type === "folder" ? (
                <TableCell align="right">{}</TableCell>
              ) : (
                <TableCell align="right">
                  {material.type === "assignment" && (
                    <Tooltip
                      title={
                        <div>
                          Start Date : {material.startdate}
                          <br /> End Date : {material.enddate}
                        </div>
                      }
                      placement="bottom"
                    >
                      <Button size="small">
                        <ScheduleIcon onClick={console.log("ay 7aga")} />
                      </Button>
                    </Tooltip>
                  )}
                  <Tooltip title="Download" placement="bottom">
                    <Button size="small">
                      {material.type !== "folder" &&
                        material.type !== "URL" &&
                        material.type !== "assignment" && (
                          <DownloadIcon
                            onClick={async () => {
                              const response = await get(
                                "/Doctor_Materials/download",
                                {
                                  params: { fileId: material.id },
                                  responseType: "blob",
                                }
                              );
                              var fileURL = window.URL.createObjectURL(
                                new Blob([response.data])
                              );
                              var fileLink = document.createElement("a");

                              fileLink.href = fileURL;
                              fileLink.setAttribute(
                                "download",
                                material.Name +
                                  "." +
                                  mime.extension(response.data.type)
                              );
                              document.body.appendChild(fileLink);

                              fileLink.click();
                            }}
                          />
                        )}
                      {material.type === "assignment" && (
                        <DownloadIcon
                          onClick={async () => {
                            const response = await get("/assignment/download", {
                              params: { fileId: material.id },
                              responseType: "blob",
                            });
                            var fileURL = window.URL.createObjectURL(
                              new Blob([response.data])
                            );
                            var fileLink = document.createElement("a");

                            fileLink.href = fileURL;
                            fileLink.setAttribute(
                              "download",
                              material.Name +
                                "." +
                                mime.extension(response.data.type)
                            );
                            document.body.appendChild(fileLink);

                            fileLink.click();
                          }}
                        />
                      )}
                    </Button>
                  </Tooltip>

                  <Tooltip title="Delete" placement="bottom">
                    <Button size="small">
                      {material.type === "assignment" ? (
                        <DeleteIcon
                          onClick={() => {
                            get("/assignment/delete", {
                              params: { fileId: material.id },
                            })
                              .then(() => window.location.reload())
                              .catch((err) => console.error(err));
                          }}
                        />
                      ) : (
                        <DeleteIcon
                          onClick={() => {
                            get("/Doctor_Materials/delete", {
                              params: { fileId: material.id },
                            })
                              .then(() => window.location.reload())
                              .catch((err) => console.error(err));
                          }}
                        />
                      )}
                    </Button>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withRouter(MaterialTable);