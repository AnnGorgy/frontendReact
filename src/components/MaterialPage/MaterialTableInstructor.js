import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import mime from "mime-types";
import MuiAlert from "@material-ui/lab/Alert";

//------------------------------ Another Components Used In This Component ----------------------------------
import RenameForm from "../MaterialForms/RenameForm";
import AssignmentGroupNumberForm from "../MaterialForms/AssignmentGroupNumberForm";
import EditTotalGradeAssignmentForm from "../MaterialForms/EditTotalGradeAssignmentForm";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
//-----------------------------------------------------------------------------------------------------------

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
  Snackbar,
  withStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ---------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/DescriptionOutlined";
import VideoIcon from "@material-ui/icons/Videocam";
import LinkIcon from "@material-ui/icons/Link";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DownloadIcon from "@material-ui/icons/GetAppSharp";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import EditIcon from "@material-ui/icons/Edit";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function  -----------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const MaterialTableInstructor = ({
  setCrumbs,
  match,
  reloadMaterials,
  setReloadMaterials,
  classes,
}) => {
  // ------------------------------------- API Calls ------------------------------------------
  const listMaterials = async () => {
    const materialsUrl = `/Doctor_Materials/GetFiles`;
    /*  
    post syntax (
     url " materialsUrl (The local host that Get Materials In a specific subject) ",
     body "no body cause this function use parametares only", 
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
  // --------------------------------------------------------------------------------------------------------

  const RenameMaterial = async (material, ChangedName, callback) => {
    /*  
    get syntax (
     url " 7rl (The local host that We Use It to Rename Material Name) ",
     options "It takes (2) Parameter"
     [1] fileId ... [2] name ...
     ) 
    */
    const url = "/Doctor_Materials/Rename";
    await get(url, {
      params: { fileId: material.id, name: ChangedName },
    });
    setMessageTitle("It has been renamed successfully");
    handleClick();
    setReloadMaterials(true);
    if (callback) callback();
  };
  // --------------------------------------------------------------------------------------------------------

  const RenameAssignment = async (
    material,
    ChangedName,
    date,
    NumberOfGroups,
    TotalGradee,
    callback
  ) => {
    /*  
    post syntax (
     url " url (TThe local host that We Use It to Rename Assignment Name) ",
     body "no body cause this function use parametares only", 
     options "It takes (4) Parameter"
     [1] fileId ... [2] name ... [3] start ... [4] end ...
     ) 
    */
    const url = "/assignment/RenameAssignment_AndUpdateTime";
    await post(url, NumberOfGroups, {
      params: {
        fileId: material.id,
        name: ChangedName,
        start: date.start,
        end: date.end,
        TotalGrade: TotalGradee,
        SubjectName: match.params.coursename,
        DrName: localStorage.getItem("DoctorName"),
        subjectID: match.params.courseId,
      },
    });
    setMessageTitle("It has been Edited successfully");
    handleClick();
    setReloadMaterials(true);
    if (callback) callback();
  };

  // -----------------------------------------------------------------------------------------------------
  const EditTotalGradeAssignment = async (material, TotalGradee, callback) => {
    const url = "/assignment/updateTotalGrade";
    await post(url, null, {
      params: {
        ffileId: material.id,
        totalgrade: TotalGradee,
      },
    });
    setMessageTitle("Total Grade has been Edited successfully");
    handleClick();
    setReloadMaterials(true);
    if (callback) callback();
  };
  //-----------------------------------------------------------------------------------------------------

  /* createRootFolder : We Use IT If We Have Subject That We Don't Have Any Materail For It In Database 
     So With IT To Add Root For This Subject So We Can Add On IT  */
  const createRootFolder = async () => {
    //FIXME: This shouldn't be a function or endpoint, otherwise it should be handled in the backend
    const url = "/Doctor_Materials/Create_First_Folder_Subject";
    /*  
    Get syntax (
     url " url (The local host that We Use IT To Add Root To New Subject ) ",
     body "no body cause this function use parametares only ", 
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
     body "no body cause this function use parametares only ", 
     options "It takes (1) Parameter"
     [1] sub_Id ... 
     ) 
    */
    const { data } = await post(assignmentsUrl, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllAssignments(
      data.map((assignment) => ({ ...assignment, type: "Assignment" }))
    );
  };
  // --------------------------------------------------------------------------------------------------------

  const GetNumberOfGroups = async (assignmentId) => {
    const Url = `/assignment/GetAssignmentGroupsToupdate`;
    const { data } = await post(Url, null, {
      params: { subjectID: match.params.courseId, AssignmentID: assignmentId },
    });
    setNumberOfGroups(data);
  };
  //----------------------------------------------------------------------------------------------------
  const DeleteMaterial = async (materiall, callback) => {
    try {
      await get(
        materiall.type === "Assignment"
          ? "/assignment/delete"
          : "/Doctor_Materials/delete",
        {
          params: {
            fileId: materiall.id,
          },
        }
      );
      setMessageTitle("It has been removed successfully");
      handleClick();
      setReloadMaterials(true);
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };
  //-----------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allMaterials, setAllMaterials] = useState();
  const [allAssignments, setAllAssignments] = useState();
  const [currentFolderId, setCurrentFolderId] = useState();
  const [displayedMaterials, setDisplayedMaterials] = useState();
  const [RenameIsOpenMaterial, setRenameIsOpenMaterial] = useState(false);
  const [currentEditedMaterial, setCurrentEditedMaterial] = useState();
  const [RenameIsOpenAssignment, setRenameIsOpenAssignment] = useState(false);
  const [open, setOpen] = useState(false);
  const [MessageTitle, setMessageTitle] = useState("");
  const [GroupsForAssignmetIsOpen, setGroupsForAssignmetIsOpen] = useState(
    false
  );
  const [NumberOfGroups, setNumberOfGroups] = useState([]);
  const [
    EditTotalGradeIsOpenAssignment,
    setEditTotalGradeIsOpenAssignment,
  ] = useState(false);
  const [OpenConfermationDialog, setOpenConfermationDialog] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState("");
  // --------------------------------------------------------------------------------------------------------

  // ------------------- Switch case to choose the icon that will put before every type --------------------
  const getIcon = (material) => {
    switch (material.type) {
      case "File":
        return <FileIcon />;
      case "Video":
        return <VideoIcon />;
      case "Assignment":
        return <AssignmentIcon />;
      case "URL":
        return <LinkIcon />;
      case "Folder":
        return <FolderIcon />;
      default:
        break;
    }
  };
  // -------------------------------------------------------------------------------------------------------

  // ---------------------- we use it To Show The Message after every operation --------------------------
  const handleClick = () => {
    setOpen(true);
  };
  // -------------------------------------------------------------------------------------------------------

  // --------------- we use it To hide The Message that will appear after  every operation -----------------
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        className={classes.message}
      >
        <Alert onClose={handleClose} severity="success">
          {MessageTitle}
        </Alert>
      </Snackbar>
      <DeleteConfirmDialog
        isOpened={OpenConfermationDialog}
        onClose={() => setOpenConfermationDialog(false)}
        onConfirm={() =>
          DeleteMaterial(currentMaterial, setOpenConfermationDialog(false))
        }
      />
      <RenameForm
        title={`Rename ${currentEditedMaterial?.type}`}
        CurrentName={currentEditedMaterial?.Name}
        isOpened={RenameIsOpenMaterial}
        onClose={() => setRenameIsOpenMaterial(false)}
        onSubmit={({ ChangedName }) =>
          RenameMaterial(currentEditedMaterial, ChangedName, () =>
            setRenameIsOpenMaterial(false)
          )
        }
      />
      <AssignmentGroupNumberForm
        title="Assignment Groups"
        isOpened={GroupsForAssignmetIsOpen}
        onClose={() => setGroupsForAssignmetIsOpen(false)}
        GroupsNumber={NumberOfGroups}
      />
      <EditTotalGradeAssignmentForm
        title="Edit Total Grade"
        currentTotalGrade={currentEditedMaterial?.TotalGrade}
        isOpened={EditTotalGradeIsOpenAssignment}
        onClose={() => setEditTotalGradeIsOpenAssignment(false)}
        onSubmit={({ TotalGradee }) =>
          EditTotalGradeAssignment(currentEditedMaterial, TotalGradee, () =>
            setEditTotalGradeIsOpenAssignment(false)
          )
        }
      />
      <RenameForm
        title="Edit Assignment"
        hasDate
        eDate={currentEditedMaterial?.enddate}
        sDate={currentEditedMaterial?.startdate}
        CurrentName={currentEditedMaterial?.Name}
        assignmentId={currentEditedMaterial?.id}
        currentTotalGrade={currentEditedMaterial?.TotalGrade}
        isOpened={RenameIsOpenAssignment}
        onClose={() => setRenameIsOpenAssignment(false)}
        onSubmit={({ ChangedName, date, NumberOfGroups, TotalGradee }) =>
          RenameAssignment(
            currentEditedMaterial,
            ChangedName,
            date,
            NumberOfGroups,
            TotalGradee,
            () => setRenameIsOpenAssignment(false)
          )
        }
      />
      <TableContainer component={Paper} className={classes.tablePosition}>
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
              <TableCell className={classes.tableHeader} width="15%">
                File Name
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="right"
                width="10%"
              >
                Size
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="center"
                width="10%"
              >
                Type
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="center"
                width="35%"
              >
                Description
              </TableCell>
              <TableCell
                width="30%"
                className={classes.tableHeader}
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
                    ? { background: "	#FFFFFF	" }
                    : { background: "	#FFFFFF	" }
                }
                key={index}
                onDoubleClick={() => {
                  if (material.type === "Folder") {
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
                            return [
                              ...prevState.slice(0, prevState.length - 1),
                            ];
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
                  width="15%"
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
                <TableCell align="right" width="10%">
                  {material.type === "Folder"
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
                <TableCell align="center" width="10%">
                  {material.type}
                </TableCell>

                {/* Material Description Cell */}
                <TableCell align="center" width="35%">
                  {material.description}
                </TableCell>

                {/*
              [1] For the folder type we will not add any delete or download button
              [2] For The Assignment Type We Add Shcedule Button To show The Start & End Date
              [3] We Add Download Icon To All Types Expect URL ... But we add Condition For Assignment Type 
                  Also Cause It's Have Another LocalHost To Downlaod The Assignments In It's Table 
              [4] We Add Delete Icon To All Types ... But we add Condition For Assignment Type 
                  Cause It's Have Another LocalHost To Delete The Assignments From It's Table  
                  */}

                {material.type === "Folder" ? (
                  /* We Don't Add Any Action To Folder Type */
                  <TableCell align="right" width="22%">
                    <Tooltip title="Rename" placement="bottom">
                      <Button size="small">
                        <EditIcon
                          onClick={() => {
                            setRenameIsOpenMaterial(true);
                            setCurrentEditedMaterial(material);
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </TableCell>
                ) : (
                  /* Start & End Date Icon */
                  <TableCell align="right" width="30%">
                    {material.type === "Assignment" && (
                      <Tooltip
                        title={
                          <div style={{ fontSize: "15px" }}>
                            Start Date : {material.Start}
                            <br /> <br /> End Date : {material.End}
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

                    {material.type !== "Folder" &&
                      material.type !== "URL" &&
                      material.type !== "Assignment" && (
                        <Tooltip title="Download" placement="bottom">
                          <Button size="small">
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
                          </Button>
                        </Tooltip>
                      )}
                    {/* Download Icon  (Assignment Type -  Another Types) */}
                    {material.type === "Assignment" && (
                      <Tooltip title="Download" placement="bottom">
                        <Button size="small">
                          <DownloadIcon
                            onClick={async () => {
                              const response = await get(
                                "/assignment/download",
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
                        </Button>
                      </Tooltip>
                    )}

                    {material.type === "Assignment" &&
                      material.AvailableToUpdate == true && (
                        <Tooltip title="Delete" placement="bottom">
                          <Button size="small">
                            <DeleteIcon
                              onClick={() => {
                                setOpenConfermationDialog(true);
                                setCurrentMaterial(material);
                              }}
                            />
                          </Button>
                        </Tooltip>
                      )}
                    {material.type !== "Assignment" &&
                      material.type !== "Folder" && (
                        <Tooltip title="Delete" placement="bottom">
                          <Button size="small">
                            <DeleteIcon
                              onClick={() => {
                                setOpenConfermationDialog(true);
                                setCurrentMaterial(material);
                              }}
                            />
                          </Button>
                        </Tooltip>
                      )}
                    {material.type === "Assignment" &&
                      material.AvailableToUpdate == true && (
                        <Tooltip title="Edit" placement="bottom">
                          <Button size="small">
                            <EditIcon
                              onClick={() => {
                                setRenameIsOpenAssignment(true);
                                setCurrentEditedMaterial(material);
                              }}
                            />
                          </Button>
                        </Tooltip>
                      )}
                    {material.type === "Assignment" &&
                      material.AvailableToUpdate == false && (
                        <Tooltip title="Edit" placement="bottom">
                          <Button size="small">
                            <EditIcon
                              onClick={() => {
                                setEditTotalGradeIsOpenAssignment(true);
                                setCurrentEditedMaterial(material);
                              }}
                            />
                          </Button>
                        </Tooltip>
                      )}

                    {material.type !== "Assignment" &&
                      material.type !== "Folder" && (
                        <Tooltip title="Rename" placement="bottom">
                          <Button size="small">
                            <EditIcon
                              onClick={() => {
                                setRenameIsOpenMaterial(true);
                                setCurrentEditedMaterial(material);
                              }}
                            />
                          </Button>
                        </Tooltip>
                      )}
                    {material.type === "Assignment" && (
                      <Tooltip title="Assignment Groups" placement="bottom">
                        <Button size="small">
                          <img
                            src="https://img.icons8.com/ios-filled/30/000000/group-foreground-selected.png"
                            onClick={() => {
                              GetNumberOfGroups(material.id);
                              setGroupsForAssignmetIsOpen(true);
                              setCurrentEditedMaterial(material);
                            }}
                          />
                        </Button>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

const styles = (theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  message: {
    Width: "150px",
    height: "150px",
    position: "absolute",
    zIndex: 9999,
  },
  tablePosition: {
    maxHeight: "90vh",
    overflowY: "auto",
    maxWidth: "170vh",
    marginLeft: "28px",
  },
  tableHeader: {
    backgroundColor: "#0c6170",
    fontSize: "17px",
    color: "white",
    fontweight: "bold",
    fontFamily: '"Lucida Sans Unicode","Helvetica","Arial"',
  },
});

export default withStyles(styles)(withRouter(MaterialTableInstructor));
