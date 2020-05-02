import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const StudentQuizGrades = ({ match }) => {
  const listGrades = async () => {
    const Url = `/Student_Answers/GetQuizzessGrades`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId, studentId: 1 },
    });
    setAllGrades(data);
  };

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allGrades, setAllGrades] = useState();
  const [displayedGrades, setDisplayedGrades] = useState();
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (allGrades) {
      setDisplayedGrades([...allGrades]);
    }
  }, [allGrades]);

  useEffect(() => {
    listGrades();
  }, [match.params.courseId]);

  return (
    <TableContainer
      component={Paper}
      style={{
        maxHeight: "90vh",
        overflowY: "auto",
        maxWidth: "170vh",
        marginTop: "10px",
      }}
    >
      <Table
        style={{
          minWidth: "650px",
        }}
        size="large"
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
              Quiz Name
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
              align="right"
            >
              Grade
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
              align="right"
            >
              Start Date
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
              align="right"
            >
              EndDate
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
              align="right"
            >
              Start Time
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
              align="right"
            >
              EndTime
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedGrades?.map((grades, index) => (
            <TableRow
              key={index}
              style={
                index % 2
                  ? { background: "#E8FDFF" }
                  : { background: "#E8FDFF" }
              }
            >
              {/* Quiz Name cell */}
              <TableCell>{grades.QuizName}</TableCell>
              {/* grade cell */}
              <TableCell align="right">{grades.QuizGrade}</TableCell>
              {/* Quiz Start Date cell */}
              <TableCell align="right">{grades.QuizstartDate}</TableCell>
              {/* Quiz End Date cell */}
              <TableCell align="right">{grades.QuizendDate}</TableCell>
              {/* Quiz Start Time cell */}
              <TableCell align="right">{grades.QuizstartTime}</TableCell>
              {/* Quiz End Time cell */}
              <TableCell align="right">{grades.QuizendTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default withRouter(StudentQuizGrades);
