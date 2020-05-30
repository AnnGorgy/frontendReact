import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import mime from "mime-types";

//------------------------------------------------- Icons ------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import FileIcon from "@material-ui/icons/DescriptionOutlined";
import DownloadIcon from "@material-ui/icons/GetAppSharp";

//--------------------------------------------------------------------------------------------------------

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
  Tooltip,
  withStyles,
  Snackbar,
  Grid,
  Typography,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function  -----------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const AssignmentStudentAnswersTable = ({
  classes,
  setCrumbs,
  setAssignmentID,
  reloadAssignments,
  setReloadAssignments,
  match,
  history,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allAssignmentsFiles, setAllAssignmentsFiles] = useState();
  const [allAssignmentsFolders, setAllAssignmentsFolders] = useState();
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [displayedAssignments, setDisplayedAssignments] = useState();
  const [assignmets, setAssignments] = useState();
  const [open, setOpen] = React.useState(false);
  const [MessageTitle, setMessageTitle] = useState("");
  // --------------------------------------------------------------------------------------------------------

  // ------------------- Switch case to choose the icon that will put before every type --------------------
  const getIcon = (assignmentt) => {
    switch (assignmentt.type) {
      case "File":
        return <FileIcon />;
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

  // -------------------------------------------- API Calls ------------------------------------------------
  const listAssignmentsFolders = async () => {
    const Url = `/Student_Answers/getAssignmentFolders`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId },
    });
    setAllAssignmentsFolders(data);
  };

  const listAssignmentsFiles = async () => {
    const Url = `/Student_Answers/GetAssignmentAnswerFiles`;
    const { data } = await post(Url, null, {
      params: {
        subjectId: match.params.courseId,
        studentId: JSON.parse(localStorage.getItem("StuInformation"))[0]
          .StudentID,
      },
    });
    setAllAssignmentsFiles(data);
  };

  const DeleteAssignemnt = async (id) => {
    const url = "/Student_Answers/deleteAssignmentAnswer";
    try {
      const { data } = await post(url, null, {
        params: {
          fileId: id,
        },
      });
      if (data == "Asignment has been deleted") {
        window.location.reload();
      } else {
        setMessageTitle(data);
        handleClick();
      }
    } catch (err) {
      console.error(err);
    }
  };
  // -------------------------------------------------------------------------------------------------------

  useEffect(() => {
    listAssignmentsFiles();
    listAssignmentsFolders();
  }, [match.params.courseId]);

  useEffect(() => {
    if (allAssignmentsFolders && allAssignmentsFiles) {
      setDisplayedAssignments([
        ...allAssignmentsFolders,
        ...allAssignmentsFiles,
      ]);
    }
  }, [allAssignmentsFolders, allAssignmentsFiles]);

  useEffect(() => {
    if (displayedAssignments) {
      setAssignments([
        ...displayedAssignments.filter(
          (assignment) => assignment.parentID === currentFolderId
        ),
      ]);
    }
  }, [displayedAssignments, currentFolderId]);

  useEffect(() => {
    if (reloadAssignments === true) {
      listAssignmentsFolders();
      listAssignmentsFiles();
      setReloadAssignments(false);
    }
  }, [reloadAssignments]);

  useEffect(() => {
    setCrumbs([
      {
        label: match.params.coursename,
        onClick: () => {
          setCurrentFolderId(null);
          setCrumbs((prevState) => [...prevState.slice(0, 1)]);
        },
        Icon: FolderIcon,
      },
      {
        label: "Assignments",
        onClick: () => {
          setCurrentFolderId(null);
          setCrumbs((prevState) => [...prevState.slice(0, 2)]);
        },
        Icon: FolderIcon,
      },
    ]);
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        className={classes.message}
      >
        <Alert onClose={handleClose} severity="error">
          {MessageTitle}
        </Alert>
      </Snackbar>
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
              <TableCell width="25%" className={classes.tableHeader}>
                File Name
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                {}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {assignmets?.map((assignment, index) => (
              <TableRow
                style={
                  index % 2
                    ? { background: "	#FFFFFF	" }
                    : { background: "	#FFFFFF	" }
                }
                key={index}
                onClick={() => {
                  if (assignment.type === "Folder") {
                    setCurrentFolderId(assignment.id);
                    setAssignmentID(assignment.id);
                    setCrumbs((prevCrumbs) => [
                      ...prevCrumbs,
                      {
                        label: assignment.name,
                        id: assignment.id,
                        Icon: FolderIcon,
                        onClick: () => {
                          setCurrentFolderId(assignment.id);
                          setCrumbs((prevState) => {
                            if (
                              prevState[prevState.length - 1].id ===
                              assignment.id
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
                {/* File Name Cell */}
                <TableCell width="25%">
                  <Grid container spacing={1}>
                    <Grid item>{getIcon(assignment)}</Grid>
                    <Grid item>
                      <Typography>{assignment.name}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="right">
                  {assignment.type === "File" && (
                    <Tooltip title="Download" placement="bottom">
                      <Button size="small">
                        <DownloadIcon
                          onClick={async () => {
                            const response = await get(
                              "/Student_Answers/downloadAssignmentAnswer",
                              {
                                params: {
                                  AnswerID: assignment.AssignmentID,
                                  studentID: assignment.StudentID,
                                },
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
                              assignment.name +
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
                  {assignment.type === "File" && (
                    <Tooltip title="Delete" placement="bottom">
                      <Button size="small">
                        <DeleteIcon
                          onClick={() => {
                            DeleteAssignemnt(assignment.id);
                          }}
                        />
                      </Button>
                    </Tooltip>
                  )}
                </TableCell>
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

export default withStyles(styles)(withRouter(AssignmentStudentAnswersTable));
