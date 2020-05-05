import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";

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
  makeStyles,
  Snackbar,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

import MuiAlert from "@material-ui/lab/Alert";

//--------------------------------------  Message Function and It's style -----------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
//-----------------------------------------------------------------------------------------------------------

const AssignmentStudentAnswersTable = ({
  match,
  setCrumbs,
  setAssignmentID,
  reloadAssignments,
  setReloadAssignments,
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
        studentId: 1 /* JSON.parse(localStorage.getItem("StuInformation"))[0].StudentID */,
      },
    });
    setAllAssignmentsFiles(data);
  };

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
        label: "Home",
        onClick: () => {
          setCurrentFolderId(null);
          setCrumbs((prevState) => [...prevState.slice(0, 1)]);
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
        style={{
          Width: "150px",
          height: "150px",
          position: "absolute",
          zIndex: 9999,
        }}
      >
        <Alert onClose={handleClose} severity="success">
          {MessageTitle} is deleted don't forget to upload another answer before
          end time
        </Alert>
      </Snackbar>
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          maxWidth: "165vh",
          marginLeft: "28px",
          marginTop: "10px",
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
                {}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {assignmets?.map((assignment, index) => (
              <TableRow
                style={
                  index % 2
                    ? { background: "	#E8FDFF	" }
                    : { background: "	#E8FDFF	" }
                }
                key={index}
                onClick={() => {
                  if (assignment.type === "folder") {
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
                <TableCell>{assignment.name}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete" placement="bottom">
                    <Button size="small">
                      {assignment.type === "file" && (
                        <DeleteIcon
                          onClick={() => {
                            get("/Student_Answers/deleteAssignmentAnswer", {
                              params: { fileId: assignment.id },
                            })
                              .then(
                                () => window.location.reload(),
                                setMessageTitle(assignment.name),
                                handleClick()
                              )
                              .catch((err) => console.error(err));
                          }}
                        />
                      )}
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default withRouter(AssignmentStudentAnswersTable);
