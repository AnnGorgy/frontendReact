import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { post } from "axios";
import MuiAlert from "@material-ui/lab/Alert";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Table,
  TableBody,
  TableCell,
  Tooltip,
  TableContainer,
  Button,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  withStyles,
  Snackbar,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import EditNumberOfGroupForStudent from "./EditNumberOfGroupForStudent";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------------- Icons ---------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import EditIcon from "@material-ui/icons/Edit";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function  -------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const StudentsInSubject = ({
  match,
  classes,
  setCrumbs,
  reloadStudents,
  setReloadStudents,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [open, setOpen] = React.useState(false);
  //--------------------------------------------------------------------------------------------------------
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
  // ------------------------------------- API Calls ---------------------------------------------------------
  const listStudents = async () => {
    const StudentsUrl = `/DoctorManagestudentsGroups/GetEnrolledStudentsForSubject`;

    /*  
    post syntax (
     url " StudentsUrl (The local host that Get Students That Enrolled In Subject that the Instructor Choose) ",
     body "no body cause this function use parametares", 
     options "It takes (3) Parameters"
     [1] SubjectId ... [2] semesterId ... [3] currentYear
     ) 
    */
    const { data } = await post(StudentsUrl, null, {
      params: {
        subjectId: match.params.courseId,
      },
    });
    setAllStudents(data);
  };
  //--------------------------------------------------------------------------------------------------------
  const EditStudentGroup = async (Group, student, callback) => {
    const url = "/DoctorManagestudentsGroups/updateStudentGroup";
    await post(url, null, {
      params: {
        StudentID: student.StudentID,
        SubjectID: match.params.courseId,
        NewNumber: Group,
      },
    });
    handleClick();
    setReloadStudents(true);
    if (callback) callback();
  };
  //--------------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allStudents, setAllStudents] = useState();
  const [displayedStudents, setDisplayedStudents] = useState();
  const [
    EditIsOpenChangeStudentGroup,
    setEditIsOpenChangeStudentGroup,
  ] = useState(false);
  const [currentEditedStudentGroup, setCurrentEditedStudentGroup] = useState();
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (reloadStudents === true) {
      listStudents();
      setReloadStudents(false);
    }
  }, [reloadStudents]);

  useEffect(() => {
    listStudents();
  }, [match.params.courseId]);

  useEffect(() => {
    if (allStudents) {
      setDisplayedStudents([...allStudents]);
    }
  }, [allStudents]);

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
        label: "Enrolled Students",
        onClick: () => {
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
        <Alert onClose={handleClose} severity="success">
        {`${currentEditedStudentGroup?.studentNameAR} group number has been changed`}
        </Alert>
      </Snackbar>
      <EditNumberOfGroupForStudent
        title="Edit Student Group"
        CurrentGroup={currentEditedStudentGroup?.GroupNo}
        isOpened={EditIsOpenChangeStudentGroup}
        onClose={() => setEditIsOpenChangeStudentGroup(false)}
        onSubmit={({ ChosenNumberOfGroup }) =>
          EditStudentGroup(ChosenNumberOfGroup, currentEditedStudentGroup, () =>
            setEditIsOpenChangeStudentGroup(false)
          )
        }
      />
      <Grid container className={classes.mainPage}>
        <TableContainer className={classes.tablePosition} component={Paper}>
          <Table
            style={{
              minWidth: 650,
            }}
            size="small"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              {/* The Header Of the Table That contains [1] Name ... [2] ID ... [3] E-Mail ... [4] Group Number  */}
              <TableRow>
                <TableCell className={classes.tableHeader} align="left">
                  Name
                </TableCell>
                <TableCell className={classes.tableHeader} align="center">
                  ID
                </TableCell>
                <TableCell className={classes.tableHeader} align="center">
                  E-Mail
                </TableCell>
                <TableCell className={classes.tableHeader} align="center">
                  Group Number
                </TableCell>
                <TableCell className={classes.tableHeader} align="right">
                  {}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedStudents?.map((Student, index) => (
                <TableRow
                  key={index}
                  style={
                    index % 2
                      ? { background: "#FFFFFF" }
                      : { background: "#FFFFFF" }
                  }
                >
                  {/* Student Name cell */}
                  <TableCell align="left">
                    <Grid container spacing={1}>
                      <Typography>{Student.studentNameAR}</Typography>
                    </Grid>
                  </TableCell>
                  {/* Student ID cell */}
                  <TableCell align="center">{Student.studentSeatNo}</TableCell>
                  {/* Student Email cell */}
                  <TableCell align="center">{Student.studentEmail}</TableCell>
                  {/* Student Group cell */}
                  <TableCell align="center">{Student.GroupNo}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Student Group" placement="bottom">
                      <Button size="small">
                        <EditIcon
                          onClick={() => {
                            setEditIsOpenChangeStudentGroup(true);
                            setCurrentEditedStudentGroup(Student);
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
      </Grid>
    </React.Fragment>
  );
};

const styles = () => ({
  tableHeader: {
    backgroundColor: "#0c6170",
    fontSize: "17px",
    color: "white",
    fontweight: "bold",
    fontFamily: '"Lucida Sans Unicode","Helvetica","Arial"',
  },
  tablePosition: {
    maxHeight: "85vh",
    overflowY: "auto",
    maxWidth: "165vh",
    marginLeft: "28px",
    marginTop: "20px",
  },
  mainPage: {
    flexWrap: "nowrap",
  },
});

export default withStyles(styles)(withRouter(StudentsInSubject));