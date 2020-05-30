import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";


//------------------------------------------------- Icons ------------------------------------------------
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import FolderIcon from "@material-ui/icons/Folder";
import EditIcon from "@material-ui/icons/Edit";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import EditGradesStudentForm from "./EditGradesStudentForm";
//-----------------------------------------------------------------------------------------------------------
//-------------------------------------------- Images -----------------------------------------------------
import QuizIcon from "../QuizMainPageComponents/QuizIcon.png";
import StudentAnswerIcon from "../StudentGrades/StudentAnswerIcon.png";
//---------------------------------------------------------------------------------------------------------

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
  Snackbar
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------
//--------------------------------------  Message Function  -------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const AllStudentsGradesInSpecificQuiz = ({
  match,
  history,
  classes,
  setCrumbs,
  reloadQuizzes,
  setReloadQuizzes,
}) => {
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
  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const Url = `/DoctorMakeQuiz/GetAllGradesQuizzes`;
    const { data } = await post(Url, null, {
      params: { QuizID: match.params.quizId, subjectID: match.params.courseId },
    });
    setAllQuiz(data);
  };
  //--------------------------------------------------------------------------------------------------------

  const EditQuizStudentGrade = async (quiz, ChangedGrade, callback) => {
    const url = "/Doctor_Manage_student/UpdateQuizGrade";
    await post(url, null, {
      params: {
        studentID: quiz.studentID,
        QuizID: match.params.quizId,
        Newgrade: ChangedGrade,
      },
    });
    setReloadQuizzes(true);
    handleClick();
    if (callback) callback();
  };
  //--------------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  const [EditIsOpenQuizGrade, setEditIsOpenQuizGrade] = useState(false);
  const [currentEditedQuiz, setCurrentEditedQuiz] = useState();
  const [open, setOpen] = React.useState(false);
  //----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (allQuiz) {
      setDisplayedQuiz([...allQuiz]);
    }
  }, [allQuiz]);

  useEffect(() => {
    listQuizzes();
  }, [match.params.courseId]);

  useEffect(() => {
    if (reloadQuizzes === true) {
      listQuizzes();
      setReloadQuizzes(false);
    }
  }, [reloadQuizzes]);

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
        label: "Grades",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 2)]);
        },
        Icon: FolderIcon,
      },
      {
        label: "Quizzes",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 3)]);
        },
        Icon: FolderIcon,
      },
      {
        label: match.params.quizname,
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 4)]);
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
        {`${currentEditedQuiz?.studentName} Quiz grade has been changed`}
        </Alert>
      </Snackbar>
      <EditGradesStudentForm
        title="Another Student Quiz Grade"
        CurrentGrade={currentEditedQuiz?.grade}
        isOpened={EditIsOpenQuizGrade}
        onClose={() => setEditIsOpenQuizGrade(false)}
        onSubmit={({ ChangedGrade }) =>
          EditQuizStudentGrade(currentEditedQuiz, ChangedGrade, () =>
            setEditIsOpenQuizGrade(false)
          )
        }
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
                    ? { background: "#FFFFFF" }
                    : { background: "#FFFFFF" }
                }
              >
                {/* Student Name cell */}
                <TableCell>
                  <Grid container spacing={1}>
                    <Grid item>
                      <img
                        src={QuizIcon}
                        alt="quizIcon"
                        style={{ width: "35px", height: "35px" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{ marginTop: "5px", marginLeft: "5px" }}
                      >
                        {quiz.studentName}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                {/* SeatNo cell */}
                <TableCell align="right">{quiz.studentSeatNo}</TableCell>
                {/* grade cell */}
                <TableCell align="right">{`${quiz.grade} / ${quiz.QuizTotalGrade}`}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit Student Grade" placement="bottom">
                    <Button size="small">
                      <EditIcon
                        onClick={() => {
                          setEditIsOpenQuizGrade(true);
                          setCurrentEditedQuiz(quiz);
                        }}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Student Answers" placement="bottom">
                    <Button size="small">
                      <img
                        src={StudentAnswerIcon}
                        alt="Student Answer"
                        style={{ width: "40px", height: "40px" }}
                        onClick={() => {
                          history.push(
                            `/answers/${match.params.courseId}/${match.params.quizId}`
                          );
                          // dh hna al mfrod ab3t al student name w al seat number fy al header bs astna a4of al tany
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
    backgroundColor: "#0c6170",
    fontSize: "17px",
    color: "white",
    fontweight: "bold",
    fontFamily: '"Lucida Sans Unicode","Helvetica","Arial"',
  },
});

export default withStyles(styles)(withRouter(AllStudentsGradesInSpecificQuiz));
