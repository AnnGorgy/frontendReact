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

const QuizTableMainInstructorNames = ({
  classes,
  match,
  history,
  setCrumbs,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuizzes, setAllQuizzes] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  const [query, setQuery] = useState("");
  const [coulmnToQuery, setCoulmnToQuery] = useState("Name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, displayedQuiz?.length - page * rowsPerPage);
  //----------------------------------------------------------------------------------------------------------
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  //----------------------------------------------------------------------------------------------------------
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //----------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const Url = `/Doctor_Manage_student/GetQuizzesNames`;
    const { data } = await post(Url, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllQuizzes(data);
  };

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
    if (query) {
      setDisplayedQuiz([
        ...allQuizzes?.filter((x) =>
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
            minWidth: 650,
          }}
          size="small"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Quiz Name</TableCell>
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
    marginLeft: "15px",
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

export default withStyles(styles)(withRouter(QuizTableMainInstructorNames));
