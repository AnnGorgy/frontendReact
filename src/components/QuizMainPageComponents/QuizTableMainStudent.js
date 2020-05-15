import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";

//------------------------------ Another Components Used In This Component -------------------------------
import TimeQuizDialog from "./TimeQuizDialog";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import ScheduleIcon from "@material-ui/icons/Schedule";
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

const QuizTableMainStudent = ({
  classes,
  reloadQuiz,
  setReloadQuiz,
  match,
  history,
}) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const Url = `/DoctorMakeQuiz/GetQuizzes`;
    const { data } = await post(Url, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllQuiz(data);
  };
  //----------------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  const [currentEditedQuiz, setCurrentEditedQuiz] = useState();
  const [TimeIsOpen, setTimeIsOpen] = useState(false);
  /* const [CurrentDate, setCurrentDate] = useState(new Date()); */
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
              <TableCell width="10%" className={classes.tableHeader}>
                Quiz Name
              </TableCell>
              <TableCell
                width="25%"
                className={classes.tableHeader}
                align="center"
              >
                Description
              </TableCell>
              <TableCell
                width="20%"
                className={classes.tableHeader}
                align="right"
              >
                Start Date
              </TableCell>
              <TableCell
                width="20%"
                className={classes.tableHeader}
                align="right"
              >
                End Date
              </TableCell>
              <TableCell
                width="20%"
                className={classes.tableHeader}
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
                <TableCell width="10%">
                  <Grid container spacing={1}>
                    <Typography>{quiz.Name}</Typography>
                  </Grid>
                </TableCell>
                {/* Description cell */}
                <TableCell align="center" width="25%">
                  {quiz.description}
                </TableCell>
                {/* Start Date cell */}
                <TableCell align="right" width="20%">
                  {quiz.startDate}
                </TableCell>
                {/* End Date cell */}
                <TableCell align="right" width="20%">
                  {quiz.endDate}
                </TableCell>
                <TableCell align="right" width="20%">
                  <Tooltip title="Enter The Quiz" placement="bottom">
                    <Button
                      size="small"
                      /* disabled={
                        quiz.startDate > CurrentDate.toDateString() ||
                        quiz.endDate < CurrentDate.toDateString()
                      } */
                    >
                      {/* {console.log(quiz.startDate > CurrentDate.toDateString() , 
                        quiz.endDate < CurrentDate.toDateString())} */}
                      <img
                        src="https://img.icons8.com/ios/30/000000/quiz.png"
                        onClick={() => {
                          history.push(
                            `/studentanswers/${match.params.courseId}/${quiz.id}`
                          );
                        }}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Model Answer" placement="bottom">
                    <Button
                      size="small"
                      /* disabled={
                        quiz.startDate > CurrentDate.toDateString() ||
                        quiz.endDate < CurrentDate.toDateString()
                      } */
                    >
                      <QuestionAnswerIcon
                        onClick={() => {
                          history.push(
                            `/viewquiz/${match.params.courseId}/${quiz.id}`
                          );
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

const styles = () => ({
  tablePosition: {
    maxHeight: "90vh",
    overflowY: "auto",
    maxWidth: "170vh",
    marginLeft: "15px",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "black",
    color: "white",
    fontFamily: "Impact",
  },
});

export default withStyles(styles)(withRouter(QuizTableMainStudent));
