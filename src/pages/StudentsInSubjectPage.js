import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

import { SideBar } from "../components";

const StudentsInSubjectPage = ({
  reloadStudents,
  setReloadStudents,
  match,
}) => {
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
    <Grid container style={{ flexWrap: "nowrap" }}>
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
        <TableContainer
          component={Paper}
          style={{
            maxHeight: "90vh",
            overflowY: "auto",
            maxWidth: "165vh",
            marginLeft: "28px",
            marginTop: "20px",
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
              {/* he Header Of the Table That contains [1] Name ... [2] ID ... [3] E-Mail  */}
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Impact",
                  }}
                  align="left"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Impact",
                  }}
                  align="center"
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Impact",
                  }}
                  align="center"
                >
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
                      ? { background: "#E8FDFF" }
                      : { background: "#E8FDFF" }
                  }
                >
                  {/* Name cell */}
                  <TableCell align="left">
                    <Grid container spacing={1}>
                      <Typography>{Student.studentNameAR}</Typography>
                    </Grid>
                  </TableCell>
                  {/* ID cell */}
                  <TableCell align="center">{Student.studentSeatNo}</TableCell>
                  {/* Email cell */}
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

export default StudentsInSubjectPage;
