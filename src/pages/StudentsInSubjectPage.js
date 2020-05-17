import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { post } from "axios";

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
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import { SideBar } from "../components";
//-----------------------------------------------------------------------------------------------------------

const StudentsInSubjectPage = ({ reloadStudents, match, classes }) => {
  // ------------------------------------- API Calls ---------------------------------------------------------
  const listStudents = async () => {
    const StudentsUrl = `http://localhost:4375/api/Subject/GetStudentsEnrolledInSubject`;

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
        subjectId: JSON.parse(localStorage.getItem("subjects")).find(
          (subject) => subject.ID == match.params.courseId
        ).ID,
        semesterId: 1,
        currentYear: "2019-2020",
      },
    });
    setAllStudents(data);
  };
  //--------------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allStudents, setAllStudents] = useState();
  const [displayedStudents, setDisplayedStudents] = useState();
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    listStudents();
  }, [reloadStudents]);

  useEffect(() => {
    if (allStudents) {
      setDisplayedStudents([...allStudents]);
    }
  }, [allStudents]);

  return (
    <Grid container className={classes.mainPage}>
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
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
              {/* he Header Of the Table That contains [1] Name ... [2] ID ... [3] E-Mail  */}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

const styles = () => ({
  tableHeader: {
    backgroundColor: "#0c6170",
    fontSize:"17px",
    color: "white",
    fontweight:"bold",
    fontFamily: '"Lucida Sans Unicode","Helvetica","Arial"',
  },
  tablePosition: {
    maxHeight: "90vh",
    overflowY: "auto",
    maxWidth: "165vh",
    marginLeft: "28px",
    marginTop: "20px",
  },
  mainPage: {
    flexWrap: "nowrap",
  },
});

export default withStyles(styles)(withRouter(StudentsInSubjectPage));
