import React, { useState, useEffect } from "react";
import { post } from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography
} from "@material-ui/core";
import { SideBar } from "../components";

const StudentsInSubjectPage = ({ reloadStudents, setReloadStudents }) => {
  const listStudents = async () => {
    const StudentsUrl = `http://localhost:4375/api/Subject/GetStudentsEnrolledInSubject`;
    const { data } = await post(StudentsUrl, null, {
      params: {
        subjectId: 538,
        semesterId: 1,
        currentYear: "2019-2020",
      },
    });
    console.log(data);
  };

  const [allStudents, setAllStudents] = useState();

  const [displayedStudents, setDisplayedStudents] = useState();

  useEffect(() => {
    // if (reloadStudents === true) {
    listStudents();
    // setReloadStudents(false);
    // }
  }, [reloadStudents]);

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
            maxWidth: "174vh",
            marginTop: "30px",
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
                <TableCell>Name</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">E-Mail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedStudents?.map((Student, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Grid container spacing={1}>
                      <Typography>{Student.studentNameAR}</Typography>
                    </Grid>
                  </TableCell>
                  <TableCell align="right">{Student.studentSeatNo}</TableCell>
                  <TableCell align="right">{Student.studentEmail}</TableCell>
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
