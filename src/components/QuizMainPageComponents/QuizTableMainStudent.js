import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";

//------------------------------------------------- Icons ------------------------------------------------
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import FolderIcon from "@material-ui/icons/Folder";
import SearchIcon from "@material-ui/icons/Search";
//-----------------------------------------------------------------------------------------------------------

//-------------------------------------------- Images -------------------------------------------------
import QuizIcon from "./QuizIcon.png";
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
  setCrumbs,
}) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const Url = `/Student_Answers/GetQuizforStudent`;
    const { data } = await post(Url, null, {
      params: { sub_Id: match.params.courseId, StudID: JSON.parse(localStorage.getItem("StuInformation"))[0].StudentID },
    });
    setAllQuiz(data);
  };
  //----------------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  const [query, setQuery] = useState("");
  const [coulmnToQuery, setCoulmnToQuery] = useState("Name");
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
    if (query) {
      setDisplayedQuiz([
        ...allQuiz?.filter((x) =>
          x[coulmnToQuery].toLowerCase()?.includes(query.toLowerCase())
        ),
      ]);
    }
  }, [query, coulmnToQuery]);

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
        label: "Quizzes",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 2)]);
        },
        Icon: FolderIcon,
      },
    ]);
  }, []);

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.tablePosition}>
        <Grid item style={{ backgroundColor: "#0c6170", padding: "20px" }}>
          <Grid item>
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search With Quiz Name"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
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
              <TableCell width="15%" className={classes.tableHeader}>
                Quiz Name
              </TableCell>
              <TableCell
                width="30%"
                className={classes.tableHeader}
                align="center"
              >
                Description
              </TableCell>
              <TableCell
                width="15%"
                className={classes.tableHeader}
                align="center"
              >
                Start Date
              </TableCell>
              <TableCell
                width="15%"
                className={classes.tableHeader}
                align="center"
              >
                End Date
              </TableCell>
              <TableCell
                width="25%"
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
                    ? { background: "#FFFFFF" }
                    : { background: "#FFFFFF" }
                }
              >
                {/* Quiz Name cell */}
                <TableCell width="15%">
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
                        {quiz.Name}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                {/* Description cell */}
                <TableCell align="center" width="30%">
                  {quiz.description}
                </TableCell>
                {/* Start Date cell */}
                <TableCell align="center" width="15%">
                  {quiz.Start}
                </TableCell>
                {/* End Date cell */}
                <TableCell align="center" width="15%">
                  {quiz.End}
                </TableCell>
                <TableCell align="right" width="25%">
                  {quiz.hasGrade == null && quiz.isAvailable == true && (
                    <Tooltip title="Enter The Quiz" placement="bottom">
                      <Button size="small">
                        <img
                          src="https://img.icons8.com/ios/30/000000/quiz.png"
                          onClick={() => {
                            history.push(
                              `/studentanswers/${match.params.courseId}/${quiz.id}/${match.params.coursename}`
                            );
                          }}
                        />
                      </Button>
                    </Tooltip>
                  )}
                  <Tooltip title="Model Answer" placement="bottom">
                    <Button size="small" disabled={quiz.Finish == false}>
                      <QuestionAnswerIcon
                        onClick={() => {
                          history.push(
                            `/viewquiz/${match.params.courseId}/${quiz.id}`
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

const styles = (theme) => ({
  tablePosition: {
    maxHeight: "90vh",
    overflowY: "auto",
    maxWidth: "170vh",
    marginLeft: "15px",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#0c6170",
    fontSize: "17px",
    color: "white",
    fontweight: "bold",
    fontFamily: '"Lucida Sans Unicode","Helvetica","Arial"',
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

export default withStyles(styles)(withRouter(QuizTableMainStudent));
