import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//------------------------------------------------- Icons ------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EditIcon from "@material-ui/icons/Edit";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import EditGradesStudentForm from "../AllQuizzesGradesForDoctor/EditGradesStudentForm";
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
  Grid,
  Typography,
  withStyles,
  Button,
  Tooltip,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const AllStudentsGradesInSpecificAssignment = ({
  match,
  history,
  classes,
  setCrumbs,
  reloadAssignmnets,
  setReloadAssignmnets,
}) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const Url = `/Doctor_Manage_student/getAssignmentsGrades`;
    const { data } = await post(Url, null, {
      params: { AssignmentID: match.params.assignemntId },
    });
    setAllAssignment(data);
  };
  //--------------------------------------------------------------------------------------------------------
  const RenameAssignment = async (assignment, ChangedGrade, callback) => {
    const url = "/Doctor_Manage_student/UpdateAssignmentGrade";
    await post(url, null, {
      params: {
        studentID: assignment.studentID,
        AssignmentID: match.params.assignemntId,
        Newgrade: ChangedGrade,
      },
    });
    setReloadAssignmnets(true);
    if (callback) callback();
  };
  //--------------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allAssignment, setAllAssignment] = useState();
  const [displayedAssignemnt, setDisplayedAssignemnt] = useState();
  const [EditIsOpenAssignmnetGrade, setEditIsOpenAssignmentGrade] = useState(
    false
  );
  const [currentEditedAssignment, setCurrentEditedAssignment] = useState();
  //----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (allAssignment) {
      setDisplayedAssignemnt([...allAssignment]);
    }
  }, [allAssignment]);

  useEffect(() => {
    listQuizzes();
  }, [match.params.courseId]);

  useEffect(() => {
    if (reloadAssignmnets === true) {
      listQuizzes();
      setReloadAssignmnets(false);
    }
  }, [reloadAssignmnets]);

  useEffect(() => {
    setCrumbs([
      {
        label: match.params.coursename,
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 1)]);
        },
        Icon: FolderIcon,
      },
      {
        label: "Grades",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 2)]);
        },
        Icon: FolderIcon,
      },
      {
        label: "Assignments",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 3)]);
        },
        Icon: FolderIcon,
      },
      {
        label: match.params.assignmentname,
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 4)]);
        },
        Icon: FolderIcon,
      },
    ]);
  }, []);

  return (
    <React.Fragment>
      <EditGradesStudentForm
        title="Another Student Assignment Grade"
        CurrentGrade={currentEditedAssignment?.Grade}
        isOpened={EditIsOpenAssignmnetGrade}
        onClose={() => setEditIsOpenAssignmentGrade(false)}
        onSubmit={({ ChangedGrade }) =>
          RenameAssignment(currentEditedAssignment, ChangedGrade, () =>
            setEditIsOpenAssignmentGrade(false)
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
            {/* The Header Of the Table That contains [1] Name ... [2] ID ... [3] E-Mail  */}
            <TableRow>
              <TableCell className={classes.tableHeader}>
                Student Name
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                SeatNo
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Grade
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                {}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedAssignemnt?.map((assignemnt, index) => (
              <TableRow
                key={index}
                style={
                  index % 2
                    ? { background: "#FFFFFF" }
                    : { background: "#FFFFFF" }
                }
              >
                {/* Student Name cell */}
                <TableCell>
                  <Grid container spacing={1}>
                    <Grid item>
                      <AssignmentIcon />
                    </Grid>
                    <Grid item>
                      <Typography>{assignemnt.studentName}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                {/* SeatNo cell */}
                <TableCell align="right">{assignemnt.SeatNo}</TableCell>
                {/* grade cell */}
                <TableCell align="right">{assignemnt.Grade}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit Student Grade" placement="bottom">
                    <Button size="small">
                      <EditIcon
                        onClick={() => {
                          setEditIsOpenAssignmentGrade(true);
                          setCurrentEditedAssignment(assignemnt);
                        }}
                      />
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

const styles = () => ({
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
  withRouter(AllStudentsGradesInSpecificAssignment)
);
