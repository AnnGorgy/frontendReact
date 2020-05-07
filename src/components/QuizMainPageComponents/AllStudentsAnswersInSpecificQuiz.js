import React, { useState, useEffect } from "react";
import { post, get } from "axios";
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
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const AllStudentsAnswersInSpecificQuiz = ({ match, history }) => {
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
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          maxWidth: "170vh",
          marginTop: "40px",
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
            {/* The Header Of the Table That contains [1] Name ... [2] ID ... [3] E-Mail  */}
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontFamily: "Impact",
                }}
              >
                Student Name
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontFamily: "Impact",
                }}
                align="right"
              >
                SeatNo
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

export default withRouter(AllStudentsAnswersInSpecificQuiz);
