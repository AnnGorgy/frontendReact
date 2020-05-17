import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//------------------------------------------------- Icons ------------------------------------------------
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
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
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const StudentQuizGrades = ({ match, history, classes }) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listGrades = async () => {
    const Url = `/Student_Answers/GetQuizzessGrades`;
    const { data } = await post(Url, null, {
      params: {
        subjectId: match.params.courseId,
        studentId: 1 /* JSON.parse(localStorage.getItem("StuInformation"))[0].StudentID */,
      },
    });
    setAllGrades(data);
  };
  //---------------------------------------------------------------------------------------------------------

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
    <TableContainer component={Paper} className={classes.tablePosition}>
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
            <TableCell className={classes.tableHeader}>Quiz Name</TableCell>
            <TableCell className={classes.tableHeader} align="right">
              Grade
            </TableCell>
            <TableCell className={classes.tableHeader} align="right">
              Start Date
            </TableCell>
            <TableCell className={classes.tableHeader} align="right">
              EndDate
            </TableCell>
            <TableCell className={classes.tableHeader} align="right">
              {}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedGrades?.map((grades, index) => (
            <TableRow
              key={index}
              style={
                index % 2
                  ? { background: "#FFFFFF" }
                  : { background: "#FFFFFF" }
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
              <TableCell align="right">
                <Tooltip title="Your Answers" placement="bottom">
                  <Button size="small" disabled={grades.Finish== false}>
                    <QuestionAnswerIcon
                      onClick={() => {
                        history.push(
                          `/answers/${match.params.courseId}/${grades.QuizID}`
                        );
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
    maxWidth: "170vh",
    marginTop: "10px",
  },
});

export default withStyles(styles)(withRouter(StudentQuizGrades));
