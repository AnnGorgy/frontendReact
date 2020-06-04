import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//------------------------------------------------- Icons ------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
//--------------------------------------------------------------------------------------------------------

//-------------------------------------------- Images -----------------------------------------------------
import QuizIcon from "../QuizMainPageComponents/QuizIcon.png";
import StudentAnswerIcon from "./StudentAnswerIcon.png";
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
  Button,
  Tooltip,
  withStyles,
  Typography,
  Grid,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const StudentQuizGrades = ({ match, history, classes, setCrumbs }) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listGrades = async () => {
    const Url = `/Student_Answers/GetQuizzessGrades`;
    const { data } = await post(Url, null, {
      params: {
        subjectId: match.params.courseId,
        studentId:  JSON.parse(localStorage.getItem("StuInformation"))[0].StudentID ,
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
        label: "Quiz Grades",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 2)]);
        },
        Icon: FolderIcon,
      },
    ]);
  }, []);

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
            <TableCell className={classes.tableHeader} align="center">
              Grade
            </TableCell>
            <TableCell className={classes.tableHeader} align="center">
              Start Date
            </TableCell>
            <TableCell className={classes.tableHeader} align="center">
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
                    <Typography style={{ marginTop: "5px" }}>
                      {grades.QuizName}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              {/* grade cell */}
              <TableCell align="center">{`${grades.QuizGrade} / ${grades.TotalGrade }`}</TableCell>
              {/* Quiz Start Date cell */}
              <TableCell align="center">{grades.QuizstartDate}</TableCell>
              {/* Quiz End Date cell */}
              <TableCell align="center">{grades.QuizendDate}</TableCell>
              <TableCell align="right">
                 {grades.Finish == true && ( 
                  <Tooltip title="My Answer" placement="bottom">
                    <Button size="small">
                      <img
                        src={StudentAnswerIcon}
                        alt="Student Answer"
                        style={{ width: "40px", height: "40px" }}
                        onClick={() => {
                          history.push(
                            `/answers/${match.params.courseId}/${grades.QuizID}`
                          );
                        }}
                      />
                    </Button>
                  </Tooltip>
                 )} 
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
    fontSize: "17px",
    color: "white",
    fontweight: "bold",
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
