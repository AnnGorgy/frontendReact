import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//------------------------------------------------- Icons ------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import SearchIcon from "@material-ui/icons/Search";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
//--------------------------------------------------------------------------------------------------------

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
  Button,
  Tooltip,
  withStyles,
  Typography,
  Grid,
  IconButton,
  InputBase,
  TableFooter,
  TablePagination,
  makeStyles,
  useTheme,
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
//----------------------------------------------------------------------------------------------------------

const StudentQuizGrades = ({ match, history, classes, setCrumbs }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allGrades, setAllGrades] = useState();
  const [displayedGrades, setDisplayedGrades] = useState();
  const [query, setQuery] = useState("");
  const [coulmnToQuery, setCoulmnToQuery] = useState("QuizName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, displayedGrades?.length - page * rowsPerPage);
  //----------------------------------------------------------------------------------------------------------
  // -------------------------------------------- API Calls ------------------------------------------------
  const listGrades = async () => {
    const Url = `/Student_Answers/GetQuizzessGrades`;
    const { data } = await post(Url, null, {
      params: {
        subjectId: match.params.courseId,
        studentId: JSON.parse(localStorage.getItem("StuInformation"))[0]
          .StudentID,
      },
    });
    setAllGrades(data);
  };
  //---------------------------------------------------------------------------------------------------------
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  //----------------------------------------------------------------------------------------------------------
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
    if (query) {
      setDisplayedGrades([
        ...allGrades?.filter((x) =>
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
      <Grid item style={{ backgroundColor: "#0c6170", padding: "20px" }}>
        <Grid item>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search With assignment folder Name"
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
          {(rowsPerPage > 0
            ? displayedGrades?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : displayedGrades
          )?.map((grades, index) => (
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
              <TableCell align="center">{`${grades.QuizGrade} / ${grades.TotalGrade}`}</TableCell>
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
              count={displayedGrades?.length}
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
  );
};
const styles = (theme) => ({
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

export default withStyles(styles)(withRouter(StudentQuizGrades));
