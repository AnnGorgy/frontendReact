import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import mime from "mime-types";

//--------------------------------- What was used from material ui core -------------------------------------
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
  Tooltip,
} from "@material-ui/core";
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ---------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/DescriptionOutlined";
import VideoIcon from "@material-ui/icons/Videocam";
import LinkIcon from "@material-ui/icons/Link";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DownloadIcon from "@material-ui/icons/GetAppSharp";
//-----------------------------------------------------------------------------------------------------------

const MaterialTableStudent = ({
  setCrumbs,
  match,
  reloadMaterials,
  setReloadMaterials,
}) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listMaterials = async () => {
    const materialsUrl = `/Doctor_Materials/GetFiles`;
    /*  
        post syntax (
         url " materialsUrl (The local host that Get Materials In a specific subject) ",
         body "no body cause this function use parametares", 
         options "It takes (1) Parameter"
         [1] sub_Id ... 
         ) 
        */
    const { data } = await post(materialsUrl, null, {
      params: { sub_Id: match.params.courseId },
    });
    if (data.length === 0) {
      await createRootFolder();
      window.location.reload();
    }
    setAllMaterials(data);
  };

  /* createRootFolder : We Use IT If We Have Subject That We Don't Have Any Materail For It In Database 
       So With IT To Add Root For This Subject So We Can Add On IT  */
  const createRootFolder = async () => {
    //FIXME: This shouldn't be a function or endpoint, otherwise it should be handled in the backend
    const url = "/Doctor_Materials/Create_First_Folder_Subject";
    /*  
        Get syntax (
         url " url (The local host that We Use IT To Add Root To New Subject ) ",
         body "no body cause this function use parametares", 
         options "It takes (2) Parameter"
         [1] sub_Id ... [2] Folder_Name ...
         ) 
         "folderName : We Add It From Subject LocalStorage To Set The Root To SubjectName"
        */
    const folderName = JSON.parse(localStorage.getItem("subjects")).find(
      (subject) => subject.ID == match.params.courseId
    ).Subjectname;
    await get(url, {
      params: { sub_Id: match.params.courseId, Folder_Name: folderName },
    });
  };
  // ------------------------------------------------------------------------------------------------------

  const listAssignments = async () => {
    setCurrentFolderId(undefined);
    const assignmentsUrl = `/assignment/GetFiles`;
    /*  
        post syntax (
         url " assignmentsUrl (The local host that Get Assignments In a specific subject) ",
         body "no body cause this function use parametares", 
         options "It takes (1) Parameter"
         [1] sub_Id ... 
         ) 
        */
    const { data } = await post(assignmentsUrl, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllAssignments(
      data.map((assignment) => ({ ...assignment, type: "assignment" }))
    );
  };
  // -----------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allMaterials, setAllMaterials] = useState();
  const [allAssignments, setAllAssignments] = useState();
  const [currentFolderId, setCurrentFolderId] = useState();
  const [displayedMaterials, setDisplayedMaterials] = useState();
  const [ChangedName, setChangedName] = useState();
  // -------------------------------------------------------------------------------------------------------

  // ------------------- Switch case to choose the icon that will put before every type --------------------
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
  // -------------------------------------------------------------------------------------------------------

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
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            {/* The Header Of the Table That contains [1] Name ... [2] Size ... [3] Type ... [4] Description ... [5] {} ... */}
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
            >
              File Name
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
              align="right"
            >
              Size
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
              align="right"
            >
              Type
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
              align="right"
            >
              Description
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
              align="right"
            >
              {}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {displayedMaterials?.map((material, index) => (
            <TableRow
              style={
                index % 2
                  ? { background: "#E8FDFF" }
                  : { background: "#E8FDFF" }
              }
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
              {/* 
              [1] Cell Name 
              [2] Icons depend on the type of the material 
              [3] href to any page with a fixed start http:// or https:// that will open any page as a URL (for URL type only)
              */}
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

              {/* 
              [1] set the parent_Id folder to all the materials and assignmnets = the material ID
              [2] Size cell (by KB) 
              */}
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

              {/* Material Type Cell */}
              <TableCell align="right">{material.type}</TableCell>

              {/* Material Description Cell */}
              <TableCell align="right">{material.description}</TableCell>

              {/*
              [1] For the folder type we will not add any delete or download button
              [2] For The Assignment Type We Add Shcedule Button To show The Start & End Date
              [3] We Add Download Icon To All Types Expect URL ... But we add Condition For Assignment Type 
                  Also Cause It's Have Another LocalHost To Downlaod The Assignments In It's Table 
              [4] We Add Delete Icon To All Types ... But we add Condition For Assignment Type 
                  Cause It's Have Another LocalHost To Delete The Assignments From It's Table  
                  */}

              {material.type === "folder" ? (
                /* We Don't Add Any Action To Folder Type */
                <TableCell align="right">{}</TableCell>
              ) : (
                /* Start & End Date Icon */
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
                        <ScheduleIcon />
                      </Button>
                    </Tooltip>
                  )}
                  {/* Download Icon Depends On It's Type */}
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
                      {/* Download Icon  (Assignment Type -  Another Types) */}
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
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withRouter(MaterialTableStudent);
