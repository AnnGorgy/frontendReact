import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";

//------------------------------ Another Components Used In This Component -------------------------------
import UpdateQuiz from "./UpdateQuiz";
import QuizGroupNumberForm from "./QuizGroupNumberForm";
import EditTotalGradeForm from "./EditTotalGradeForm";
//--------------------------------------------------------------------------------------------------------

//----------------------------------------- Images --------------------------------------------------------
import QuizIcon from "./QuizIcon.png";
//-------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import EditIcon from "@material-ui/icons/Edit";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import FolderIcon from "@material-ui/icons/Folder";
import SearchIcon from "@material-ui/icons/Search";
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

const QuizTableMainInstructor = ({
  classes,
  reloadQuiz,
  setReloadQuiz,
  match,
  history,
  setCrumbs,
}) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const Url = `/DoctorMakeQuiz/GetQuizzes`;
    const { data } = await post(Url, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllQuiz(data);
  };

  // --------------------------------------------------------------------------------------------------------
  
  const EditTotalGradeQuiz = async (
    Quiz,
    GradeAppear,
    callback
  ) => {
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
    ChangednumberOfQues,
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
        numberOfQuestions: ChangednumberOfQues,
        appearGrade: GradeAppear,
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

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  const [currentEditedQuiz, setCurrentEditedQuiz] = useState();
  const [UpdateQuizIsOpen, setUpdateQuizIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [coulmnToQuery, setCoulmnToQuery] = useState("Name");
  const [GroupsForQuizIsOpen, setGroupsForQuizIsOpen] = useState(false);
  const [NumberOfGroups, setNumberOfGroups] = useState([]);
  const [EditTotalGradeIsOpen , setEditTotalGradeIsOpen] = useState(false);
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
        numQuestions={currentEditedQuiz?.numberOfQuestions}
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
          ChangednumberOfQues,
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
            ChangednumberOfQues,
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
      <EditTotalGradeForm
        title="Edit Total Grade"
        appearGrade={currentEditedQuiz?.AppearGrade}
        isOpened={EditTotalGradeIsOpen}
        onClose={() => setEditTotalGradeIsOpen(false)}
        onSubmit={({ GradeAppear }) =>
          EditTotalGradeQuiz(currentEditedQuiz, GradeAppear, () =>
            setEditTotalGradeIsOpen(false)
          )
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
              <TableCell className={classes.tableHeader}>Quiz Name</TableCell>
              <TableCell
                /* style={{minWidth:30, maxWidth:30}} */
                className={classes.tableHeader}
                align="center"
                width="5%"
              >
                Description
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Start Date
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                End Date
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
                        {quiz.Name}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                {/* Description cell */}
                <TableCell
                  align="center"
                  width="5%" /* style={{minWidth:30, maxWidth:30}} */
                >
                  {quiz.description}
                </TableCell>
                {/* Start Date cell */}
                <TableCell align="right">{quiz.Start}</TableCell>
                {/* End Date cell */}
                <TableCell align="right">{quiz.End}</TableCell>
                <TableCell align="right">
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
                            post("/DoctorMakeQuiz/DeleteQuiz", null, {
                              params: { QuizID: quiz.id },
                            })
                              .then(() => window.location.reload())
                              .catch((err) => console.error(err));
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
                  ):(
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
