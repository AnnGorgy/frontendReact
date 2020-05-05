import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import EditIcon from "@material-ui/icons/Edit";
import UpdateQuiz from "./UpdateQuiz";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TimeQuizDialog from "./TimeQuizDialog";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

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
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const QuizTableMainInstructor = ({
  reloadQuiz,
  setReloadQuiz,
  match,
  history,
}) => {
  const listQuizzes = async () => {
    const Url = `/DoctorMakeQuiz/GetQuizzes`;
    const { data } = await post(Url, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllQuiz(data);
  };

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  const [currentEditedQuiz, setCurrentEditedQuiz] = useState();
  const [UpdateQuizIsOpen, setUpdateQuizIsOpen] = useState(false);
  const [TimeIsOpen, setTimeIsOpen] = useState(false);

  //----------------------------------------------------------------------------------------------------------

  const Updatequiz = async (
    Quiz,
    ChangedName,
    ChangedDate,
    ChangedDescription,
    ChangedDuration,
    ChangedTimePicker,
    questionType,
    ChangednumberOfQues,
    callback
  ) => {
    const url = "/DoctorMakeQuiz/UpdateQuizInfo";
    await post(url, null, {
      params: {
        QuizID: Quiz.id,
        name: ChangedName,
        description: ChangedDescription,
        startDate: ChangedDate.start,
        endDate: ChangedDate.end,
        startTime: ChangedTimePicker.start,
        endTime: ChangedTimePicker.end,
        duration: ChangedDuration,
        shuffleQuestion: questionType,
        subID: match.params.courseId,
        numberOfQuestions: ChangednumberOfQues,
      },
    });
    setReloadQuiz(true);
    if (callback) callback();
  };

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
      <UpdateQuiz
        title="Update Quiz"
        CurrentName={currentEditedQuiz?.Name}
        sDate={currentEditedQuiz?.startDate}
        eDate={currentEditedQuiz?.endDate}
        sTime={currentEditedQuiz?.startTime}
        eTime={currentEditedQuiz?.endTime}
        durat={currentEditedQuiz?.duration}
        CurrentchangeQuestionsOrder={currentEditedQuiz?.shuffleQuestion}
        descr={currentEditedQuiz?.description}
        numQuestions={currentEditedQuiz?.numberOfQuestions}
        isOpened={UpdateQuizIsOpen}
        onClose={() => setUpdateQuizIsOpen(false)}
        onSubmit={({
          ChangedName,
          ChangedDate,
          ChangedDescription,
          ChangedDuration,
          ChangedTimePicker,
          questionType,
          ChangednumberOfQues,
        }) =>
          Updatequiz(
            currentEditedQuiz,
            ChangedName,
            ChangedDate,
            ChangedDescription,
            ChangedDuration,
            ChangedTimePicker,
            questionType,
            ChangednumberOfQues,
            () => setUpdateQuizIsOpen(false)
          )
        }
      />
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          maxWidth: "170vh",
          marginTop: "10px",
        }}
      >
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
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontFamily: "Impact",
                }}
              >
                Quiz Name
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontFamily: "Impact",
                }}
                align="right"
              >
                Description
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontFamily: "Impact",
                }}
                align="right"
              >
                Start Date
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontFamily: "Impact",
                }}
                align="right"
              >
                End Date
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontFamily: "Impact",
                }}
                align="right"
              >
                {}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedQuiz?.map((quiz, index) => (
              <Tooltip title={
                <div style={{fontSize:"14px"}}>
                Double Click For Student Answers and Grades
                </div>
              } >
                <TableRow
                  key={index}
                  onDoubleClick={() => {
                    history.push(
                      `/studentquizanswers/${match.params.courseId}/${quiz.id}`
                    );
                  }}
                  style={
                    index % 2
                      ? { background: "#E8FDFF" }
                      : { background: "#E8FDFF" }
                  }
                  style={{ cursor: "pointer" }}
                >
                  {/* Quiz Name cell */}
                  <TableCell>
                    <Grid container spacing={1}>
                      <Typography>{quiz.Name}</Typography>
                    </Grid>
                  </TableCell>
                  {/* Description cell */}
                  <TableCell align="right">{quiz.description}</TableCell>
                  {/* Start Date cell */}
                  <TableCell align="right">{quiz.startDate}</TableCell>
                  {/* End Date cell */}
                  <TableCell align="right">{quiz.endDate}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Add Questions" placement="bottom">
                      <Button size="small">
                        <AddCircleOutlineIcon
                          onClick={() => {
                            history.push(`/createquiz/${quiz.id}`);
                            localStorage.setItem("QuizName", quiz.Name);
                            localStorage.setItem("TotalTime", quiz.duration);
                            localStorage.setItem(
                              "numberOfQuestions",
                              quiz.numberOfQuestions
                            );
                          }}
                        />
                      </Button>
                    </Tooltip>
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

export default withRouter(QuizTableMainInstructor);
