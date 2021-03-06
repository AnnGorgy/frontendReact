import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import mime from "mime-types";

//------------------------------------------------- Icons ------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import DownloadIcon from "@material-ui/icons/GetAppSharp";
import FileIcon from "@material-ui/icons/DescriptionOutlined";
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
  Tooltip,
  Button,
  withStyles,
  Typography,
  Grid,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const DoctorgetAssignmentsStudentsTable = ({ match, setCrumbs, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allAssignmentsFiles, setAllAssignmentsFiles] = useState();
  const [allAssignmentsFolders, setAllAssignmentsFolders] = useState();
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [displayedAssignments, setDisplayedAssignments] = useState();
  const [assignmets, setAssignments] = useState();
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

  // -------------------------------------------- API Calls ------------------------------------------------
  const listAssignmentsFolders = async () => {
    const Url = `/Doctor_Manage_student/getAssignmentsFolders`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId },
    });
    setAllAssignmentsFolders(data);
  };

  const listAssignmentsFiles = async () => {
    const Url = `/Doctor_Manage_student/getAssignmentsFiles`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId },
    });
    setAllAssignmentsFiles(data);
  };
  //--------------------------------------------------------------------------------------------------------

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
              <TableCell width="20%" className={classes.tableHeader}>
                File Name
              </TableCell>
              <TableCell
                width="30%"
                align="center"
                className={classes.tableHeader}
              >
                Student Name
              </TableCell>
              <TableCell
                align="center"
                className={classes.tableHeader}
                width="25%"
              >
                SeatNo
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
                {/* File Name Cell  */}
                <TableCell width="20%">
                  <Grid container spacing={1}>
                    <Grid item>{getIcon(assignment)}</Grid>
                    <Grid item>
                      <Typography>{assignment.name}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                {/* Student Name Cell "File" */}
                {assignment.type === "File" && (
                  <TableCell align="center" width="30%">
                    {assignment.studentName}
                  </TableCell>
                )}
                {/* SeatNo Cell "File" */}
                {assignment.type === "File" && (
                  <TableCell align="center" width="25%">
                    {assignment.SeatNo}
                  </TableCell>
                )}
                {/* Student Name Cell "Folder" */}
                {assignment.type === "Folder" && (
                  <TableCell align="center" width="30%">
                    __
                  </TableCell>
                )}
                {/* SeatNo Cell "Folder" */}
                {assignment.type === "Folder" && (
                  <TableCell align="center" width="25%">
                    __
                  </TableCell>
                )}

                {assignment.type === "File" ? (
                  <TableCell align="right">
                    <Tooltip title="Download" placement="bottom">
                      <Button size="small">
                        <DownloadIcon
                          onClick={async () => {
                            const response = await get(
                              "/Doctor_Manage_student/download_Assignment_answers",
                              {
                                params: { fileId: assignment.id },
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
                  </TableCell>
                ) : (
                  <TableCell>{}</TableCell>
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

export default withStyles(styles)(
  withRouter(DoctorgetAssignmentsStudentsTable)
);
