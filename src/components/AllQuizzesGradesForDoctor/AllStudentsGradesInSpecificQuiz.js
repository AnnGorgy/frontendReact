import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

//------------------------------------------------- Icons ------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import EditGradesStudentForm from "../AllassignmentsandquizzesForms/EditGradesStudentForm";
//-----------------------------------------------------------------------------------------------------------
//-------------------------------------------- Images -----------------------------------------------------
import QuizIcon from "../QuizImages/QuizIcon.png";
import StudentAnswerIcon from "../StudentGradesImages/StudentAnswerIcon.png";
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
  Snackbar,
  useTheme,
  TableFooter,
  TablePagination,
  makeStyles,
  Select,
  FormControl,
  IconButton,
  InputBase,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------
// -------------------------------------- table pagination with it's style ----------------------------------
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <Tooltip title="First Page" placement="bottom">
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Previous Page" placement="bottom">
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Next Page" placement="bottom">
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Last Page" placement="bottom">
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
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
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  const [EditIsOpenQuizGrade, setEditIsOpenQuizGrade] = useState(false);
  const [currentEditedQuiz, setCurrentEditedQuiz] = useState();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = useState("");
  const [coulmnToQuery, setCoulmnToQuery] = useState("studentName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, displayedQuiz?.length - page * rowsPerPage);
  //----------------------------------------------------------------------------------------------------------
  // ---------------------- we use it To Show The Message after every operation --------------------------
  const handleClick = () => {
    setOpen(true);
  };
  // -------------------------------------------------------------------------------------------------------

  // --------------- we use it To hide The Message that will appear after  every operation -----------------
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // -------------------------------------------------------------------------------------------------------
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  //-------------------------------------------------------------------------------------------------------
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //----------------------------------------------------------------------------------------------------------
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
    if (query) {
      setDisplayedQuiz([
        ...allQuiz?.filter((x) =>
          x[coulmnToQuery].toLowerCase()?.includes(query.toLowerCase())
        ),
      ]);
    }
  }, [query, coulmnToQuery]);

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
        title="Edit Quiz Grade"
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
        <Grid item style={{ backgroundColor: "#0c6170", padding: "20px" }}>
          <Grid item>
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search With assignment File Name"
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
          <Grid item style={{ marginTop: "-40px", marginLeft: "450px" }}>
            <Tooltip title="Search Type" placement="bottom">
              <FormControl className={classes.formControl}>
                <Select
                  native
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={coulmnToQuery}
                  onChange={(event) => {
                    setCoulmnToQuery(event.target.value);
                  }}
                  style={{ backgroundColor: "white" }}
                >
                  <option value="studentName">Name</option>
                  <option value="studentSeatNo">Seat Number</option>
                </Select>
              </FormControl>
            </Tooltip>
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
              <TableCell className={classes.tableHeader} width="30%">
                Student Name
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="center"
                width="20%"
              >
                SeatNo
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="center"
                width="10%"
              >
                Grade
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                {}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? displayedQuiz?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : displayedQuiz
            )?.map((quiz, index) => (
              <TableRow
                key={index}
                style={
                  index % 2
                    ? { background: "#FFFFFF" }
                    : { background: "#FFFFFF" }
                }
              >
                {/* Student Name cell */}
                <TableCell width="30%">
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
                <TableCell align="center" width="20%">
                  {quiz.studentSeatNo}
                </TableCell>
                {/* grade cell */}
                <TableCell
                  align="center"
                  width="10%"
                >{`${quiz.grade} / ${quiz.QuizTotalGrade}`}</TableCell>
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
                          localStorage.setItem("StudentName", quiz.studentName);
                          localStorage.setItem("StudentID", quiz.studentID);
                          localStorage.setItem(
                            "StudentSeatNumber",
                            quiz.studentSeatNo
                          );
                        }}
                      />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                colSpan={3}
                count={displayedQuiz?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                backIconButtonProps={{
                  "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page",
                }}
              />
            </TableRow>
          </TableFooter>
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
    marginLeft: "28px",
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

export default withStyles(styles)(withRouter(AllStudentsGradesInSpecificQuiz));
