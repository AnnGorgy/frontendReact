import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//------------------------------------------------- Icons ------------------------------------------------
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
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
  Button,
  Typography,
  Tooltip,
  withStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const AllStudentsAnswersInSpecificQuiz = ({ match, history, classes }) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const Url = `/DoctorMakeQuiz/GetAllGradesQuizzes`;
    const { data } = await post(Url, null, {
      params: { QuizID: match.params.quizId, subjectID: match.params.courseId },
    });
    setAllQuiz(data);
  };
  //--------------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  //----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (allQuiz) {
      setDisplayedQuiz([...allQuiz]);
    }
  }, [allQuiz]);

  useEffect(() => {
    listQuizzes();
  }, [match.params.courseId]);

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
            {displayedQuiz?.map((quiz, index) => (
              <TableRow
                key={index}
                style={
                  index % 2
                    ? { background: "#E8FDFF" }
                    : { background: "#E8FDFF" }
                }
              >
                {/* Student Name cell */}
                <TableCell>
                  <Grid container spacing={1}>
                    <Typography>{quiz.studentName}</Typography>
                  </Grid>
                </TableCell>
                {/* SeatNo cell */}
                <TableCell align="right">{quiz.studentSeatNo}</TableCell>
                {/* grade cell */}
                <TableCell align="right">{quiz.grade}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Student Answers" placement="bottom">
                    <Button size="small">
                      <QuestionAnswerIcon
                        onClick={() => {
                          history.push(
                            `/answers/${match.params.courseId}/${match.params.quizId}`
                          );
                          localStorage.setItem("StudentName", quiz.studentName);
                          localStorage.setItem("StudentID", quiz.studentSeatNo);
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
    backgroundColor: "black",
    color: "white",
    fontFamily: "Impact",
  },
});

export default withStyles(styles)(withRouter(AllStudentsAnswersInSpecificQuiz));
