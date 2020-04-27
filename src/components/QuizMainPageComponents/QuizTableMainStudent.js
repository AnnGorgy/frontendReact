import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TimeQuizDialog from "./TimeQuizDialog";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

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
} from "@material-ui/core";

const QuizTableMainStudent = ({ reloadQuiz, setReloadQuiz, match, history }) => {
  const listQuizzes = async () => {
    const Url = `/DoctorMakeQuiz/GetQuizzes`;
    const { data } = await post(Url, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllQuiz(data);
  };

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  const [currentEditedQuiz, setCurrentEditedQuiz] = useState();
  const [TimeIsOpen, setTimeIsOpen] = useState(false);

  //----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (reloadQuiz === true) {
      listQuizzes();
      setReloadQuiz(false);
    }
  }, [reloadQuiz]);

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
      <TimeQuizDialog
        title="Time"
        isOpened={TimeIsOpen}
        onClose={() => setTimeIsOpen(false)}
        sTime={currentEditedQuiz?.startTime}
        eTime={currentEditedQuiz?.endTime}
      />
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
                Description
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
                End Date
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
                {/* Quiz Name cell */}
                <TableCell>
                  <Grid container spacing={1}>
                    <Typography>{quiz.Name}</Typography>
                  </Grid>
                </TableCell>
                {/* Description cell */}
                <TableCell align="right">{quiz.description}</TableCell>
                {/* Start Date cell */}
                <TableCell align="right">{quiz.startDate}</TableCell>
                {/* End Date cell */}
                <TableCell align="right">{quiz.endDate}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Add Questions" placement="bottom">
                    <Button size="small">
                      <AddCircleOutlineIcon
                        onClick={() => {
                          /* history.push("/createquiz"); */
                          localStorage.setItem("QuizName", quiz.Name);
                          localStorage.setItem("TotalTime", quiz.duration);
                          localStorage.setItem("numberOfQuestions", quiz.numberOfQuestions);
                          localStorage.setItem("QuizID", quiz.id);
                        }}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Model Answer" placement="bottom">
                    <Button size="small">
                      <QuestionAnswerIcon
                        onClick={() => {
                          history.push("/viewquiz");
                        }}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Time" placement="bottom">
                    <Button size="small">
                      <ScheduleIcon
                        onClick={() => {
                          setTimeIsOpen(true);
                          setCurrentEditedQuiz(quiz);
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

export default withRouter(QuizTableMainStudent);
