import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//------------------------------ Another Components Used In This Component -------------------------------

//--------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
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
  Grid,
  Typography,
  Tooltip,
  withStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const QuizTableMainInstructorNames = ({
  classes,
  match,
  history,
  setCrumbs,
}) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const Url = `/Doctor_Manage_student/GetQuizzesNames`;
    const { data } = await post(Url, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllQuizzes(data);
  };

  //----------------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuizzes, setAllQuizzes] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (allQuizzes) {
      setDisplayedQuiz([...allQuizzes]);
    }
  }, [allQuizzes]);

  useEffect(() => {
    listQuizzes();
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
        label: "Quizzes",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 3)]);
        },
        Icon: FolderIcon,
      },
    ]);
  }, []);

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
            {/* The Header Of the Table That contains [1] Name ...  */}
            <TableRow>
              <TableCell className={classes.tableHeader}>Quiz Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedQuiz?.map((quiz, index) => (
              <Tooltip
                title={
                  <div style={{ fontSize: "14px" }}>
                    Double Click For Student Answers and Grades
                  </div>
                }
              >
                <TableRow
                  key={index}
                  onDoubleClick={() => {
                    history.push(
                      `/studentquizgrades/${match.params.coursename}/${quiz.Name}/${match.params.courseId}/${quiz.id}`
                    );
                  }}
                  style={
                    index % 2
                      ? { background: "#FFFFFF" }
                      : { background: "#FFFFFF" }
                  }
                  style={{ cursor: "pointer" }}
                >
                  {/* Quiz Name cell */}
                  <TableCell>
                    <Grid container spacing={1}>
                      <Grid item>
                        <FolderIcon />
                      </Grid>
                      <Grid item>
                        <Typography>{quiz.Name}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </Tooltip>
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
  },
  tableHeader: {
    backgroundColor: "#0c6170",
    fontSize: "17px",
    color: "white",
    fontweight: "bold",
    fontFamily: '"Lucida Sans Unicode","Helvetica","Arial"',
  },
});

export default withStyles(styles)(withRouter(QuizTableMainInstructorNames));
