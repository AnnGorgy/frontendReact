import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//------------------------------ Another Components Used In This Component -------------------------------
import UpdateQuiz from "../QuizMainPageComponentsForms/UpdateQuiz";
import QuizGroupNumberForm from "../QuizMainPageComponentsForms/QuizGroupNumberForm";
import EditGradeAppearForm from "../QuizMainPageComponentsForms/EditGradeAppearForm";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
//--------------------------------------------------------------------------------------------------------

//----------------------------------------- Images --------------------------------------------------------
import QuizIcon from "../QuizImages/QuizIcon.png";
//-------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import EditIcon from "@material-ui/icons/Edit";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
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
  Button,
  Typography,
  Tooltip,
  withStyles,
  useTheme,
  TablePagination,
  TableFooter,
  IconButton,
  InputBase,
  makeStyles,
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

//------------------------------------------------------------------------------------------------------------

const QuizTableMainInstructor = ({
  classes,
  reloadQuiz,
  setReloadQuiz,
  match,
  history,
  setCrumbs,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  const [currentEditedQuiz, setCurrentEditedQuiz] = useState();
  const [UpdateQuizIsOpen, setUpdateQuizIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [coulmnToQuery, setCoulmnToQuery] = useState("Name");
  const [GroupsForQuizIsOpen, setGroupsForQuizIsOpen] = useState(false);
  const [NumberOfGroups, setNumberOfGroups] = useState([]);
  const [EditTotalGradeIsOpen, setEditTotalGradeIsOpen] = useState(false);
  const [OpenConfermationDialog, setOpenConfermationDialog] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, displayedQuiz?.length - page * rowsPerPage);
  //------------------------------------------------------------------------------------------------------------
  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const Url = `/DoctorMakeQuiz/GetQuizzes`;
    const { data } = await post(Url, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllQuiz(data);
  };

  // --------------------------------------------------------------------------------------------------------

  const EditTotalGradeQuiz = async (Quiz, GradeAppear, callback) => {
    const url = "/DoctorMakeQuiz/UpdateShowGrade";
    await post(url, NumberOfGroups, {
      params: {
        QuizID: Quiz.id,
        showGrade: GradeAppear,
      },
    });
    setReloadQuiz(true);
    if (callback) callback();
  };
  //---------------------------------------------------------------------------------------------------------

  const Updatequiz = async (
    Quiz,
    ChangedName,
    ChangedDate,
    ChangedDescription,
    ChangedDuration,
    questionType,
    GradeAppear,
    NumberOfGroups,
    callback
  ) => {
    const url = "/DoctorMakeQuiz/UpdateQuizInfo";
    await post(url, NumberOfGroups, {
      params: {
        QuizID: Quiz.id,
        name: ChangedName,
        description: ChangedDescription,
        startDate: ChangedDate.start,
        endDate: ChangedDate.end,
        duration: ChangedDuration,
        shuffleQuestion: questionType,
        subID: match.params.courseId,
        appearGrade: GradeAppear,
        SubjectName: match.params.coursename,
        DrName: localStorage.getItem("DoctorName"),
        subID: match.params.courseId,
      },
    });
    setReloadQuiz(true);
    if (callback) callback();
  };
  //----------------------------------------------------------------------------------------------------------
  const GetNumberOfGroups = async (quizId) => {
    const Url = `/DoctorMakeQuiz/GetQuizGroupsToupdate`;
    const { data } = await post(Url, null, {
      params: { subjectID: match.params.courseId, QuizID: quizId },
    });
    setNumberOfGroups(data);
  };
  //---------------------------------------------------------------------------------------------------------
  const DeleteQuiz = async (quizzz, callback) => {
    const url = "/DoctorMakeQuiz/DeleteQuiz";
    try {
      await post(url, null, {
        params: {
          QuizID: quizzz.id,
        },
      });
      setReloadQuiz(true);
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };
  //---------------------------------------------------------------------------------------------------------

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  //-----------------------------------------------------------------------------------------------------------
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (reloadQuiz === true) {
      listQuizzes();
      setReloadQuiz(false);
    }
  }, [reloadQuiz]);

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
    if (allQuiz) {
      setDisplayedQuiz([...allQuiz]);
    }
  }, [allQuiz]);

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
      <UpdateQuiz
        title="Update Quiz"
        CurrentName={currentEditedQuiz?.Name}
        sDate={currentEditedQuiz?.startDate}
        eDate={currentEditedQuiz?.endDate}
        durat={currentEditedQuiz?.duration}
        CurrentchangeQuestionsOrder={currentEditedQuiz?.shuffleQuestion}
        descr={currentEditedQuiz?.description}
        quizId={currentEditedQuiz?.id}
        appearGrade={currentEditedQuiz?.AppearGrade}
        isOpened={UpdateQuizIsOpen}
        onClose={() => setUpdateQuizIsOpen(false)}
        onSubmit={({
          ChangedName,
          ChangedDate,
          ChangedDescription,
          ChangedDuration,
          questionType,
          GradeAppear,
          NumberOfGroups,
        }) =>
          Updatequiz(
            currentEditedQuiz,
            ChangedName,
            ChangedDate,
            ChangedDescription,
            ChangedDuration,
            questionType,
            GradeAppear,
            NumberOfGroups,
            () => setUpdateQuizIsOpen(false)
          )
        }
      />
      <QuizGroupNumberForm
        title="Quiz Groups"
        isOpened={GroupsForQuizIsOpen}
        onClose={() => setGroupsForQuizIsOpen(false)}
        GroupsNumber={NumberOfGroups}
      />
      <EditGradeAppearForm
        title="Edit Show Grade"
        appearGrade={currentEditedQuiz?.AppearGrade}
        isOpened={EditTotalGradeIsOpen}
        onClose={() => setEditTotalGradeIsOpen(false)}
        onSubmit={({ GradeAppear }) =>
          EditTotalGradeQuiz(currentEditedQuiz, GradeAppear, () =>
            setEditTotalGradeIsOpen(false)
          )
        }
      />
      <DeleteConfirmDialog
        isOpened={OpenConfermationDialog}
        onClose={() => setOpenConfermationDialog(false)}
        onConfirm={() =>
          DeleteQuiz(currentQuiz, setOpenConfermationDialog(false))
        }
      />
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
              <TableCell className={classes.tableHeader} width="10%">
                Quiz Name
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="center"
                width="30%"
              >
                Description
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="center"
                width="17.5%"
              >
                Start Date
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="center"
                width="17.5%"
              >
                End Date
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="right"
                width="25%"
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
                <TableCell width="10%">
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
                <TableCell align="center" width="17.5%">
                  {quiz.Start}
                </TableCell>
                {/* End Date cell */}
                <TableCell align="center" width="17.5%">
                  {quiz.End}
                </TableCell>
                <TableCell align="right" width="25%">
                  <Tooltip title="Model Answer" placement="bottom">
                    <Button size="small">
                      <QuestionAnswerIcon
                        onClick={() => {
                          history.push(
                            `/viewquiz/${match.params.courseId}/${quiz.id}`
                          );
                        }}
                      />
                    </Button>
                  </Tooltip>
                  {quiz.AvailableToUpdate == true && (
                    <Tooltip title="Delete" placement="bottom">
                      <Button size="small">
                        <DeleteIcon
                          onClick={() => {
                            setOpenConfermationDialog(true);
                            setCurrentQuiz(quiz);
                          }}
                        />
                      </Button>
                    </Tooltip>
                  )}
                  {quiz.AvailableToUpdate == true ? (
                    <Tooltip title="Update" placement="bottom">
                      <Button size="small">
                        <EditIcon
                          onClick={() => {
                            setUpdateQuizIsOpen(true);
                            setCurrentEditedQuiz(quiz);
                          }}
                        />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Update" placement="bottom">
                      <Button size="small">
                        <EditIcon
                          onClick={() => {
                            setEditTotalGradeIsOpen(true);
                            setCurrentEditedQuiz(quiz);
                          }}
                        />
                      </Button>
                    </Tooltip>
                  )}
                  <Tooltip title="Quiz Groups" placement="bottom">
                    <Button size="small">
                      <img
                        src="https://img.icons8.com/ios-filled/30/000000/group-foreground-selected.png"
                        onClick={() => {
                          GetNumberOfGroups(quiz.id);
                          setGroupsForQuizIsOpen(true);
                          setCurrentEditedQuiz(quiz);
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

export default withStyles(styles)(withRouter(QuizTableMainInstructor));
