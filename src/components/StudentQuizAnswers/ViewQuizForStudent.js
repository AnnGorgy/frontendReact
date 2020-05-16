import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  withStyles,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component -------------------------------
import AnswersMCQ from "./AnswersMCQ";
import AnswersTrueFalse from "./AnswersTrueFalse";
import GradeDialog from "./GradeDialog";
//--------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
//---------------------------------------------------------------------------------------------------------

//------------------------------------------------ Images ---------------------------------------------------
import CourseImage from "../QuizImages/CourseImage.png";
import DateImage from "../QuizImages/DateImage.png";
import QuizImage from "../QuizCreationComponents/QuizImage.png";
import NAME from "../QuizImages/StudentName.png";
import ID from "../QuizImages/StudentId.png";
import QuizTimer from "../QuizImages/QuizTimer.gif";
import Grades from "../ViewingTheQuiz/Grades.png";
import QuestionNumber from "../QuizCreationComponents/QuestionNumber.png";
//-----------------------------------------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1257,
    flexGrow: 1,
    //marginTop:"100px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 60,
    webkitBoxShadow: "5px 5px 5px #9E9E9E",
    mozBoxShadow: "5px 5px 5px #9E9E9E",
    boxShadow: "5px 5px 5px #9E9E9E",
    //paddingLeft: theme.spacing(120),
    backgroundColor: theme.palette.background.default,
    font: 50,
  },
  addButton: {
    borderRadius: "16px",
    width: "160px",
    color: "black",
    backgroundColor: "#7dbbb9",
    "&:hover, &:focus": {
      backgroundColor: "#CCE6E5",
      color: "black",
    },
  },
  addIcon: {
    marginTop: "4px",
    width: "30px",
    height: "30px",
  },
  buttonText: {
    color: "black",
    paddingLeft: "5px",
    fontSize: "25px",
  },
  addButtonBody: {
    marginLeft: "4px",
    marginRight: "4px",
  },
  tableHeader: {
    paddingRight: "20px",
    paddingLeft: "1000px",
    marginTop: "20px",
    marginLeft: "30px",
    flexWrap: "nowrap",
  },
}));
const ViewQuizForStudent = ({ match }) => {
  const getDefaultAnswerBody = (questionId, NumberofCorrectAnswers) => ({
    quizId: match.params.quizId,
    studentId: 3 /* JSON.parse(localStorage.getItem("StuInformation"))[0].StudentID */,
    questionId,
    answers: [],
    trueOrFalse: null,
    NumberofCorrectAnswers,
  });

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [questionAnswers, setAnswers] = useState();
  const classes = useStyles();
  const [quizData, setQuizData] = useState();
  const SubjectName = JSON.parse(localStorage.getItem("subjects")).find(
    (subject) => subject.ID == match.params.courseId
  ).Subjectname;
  const [quizInfo, setQuizInfo] = useState();
  const [timer, setTimer] = useState(100000);
  const [gradeDialogIsOpen, setGradeDialogIsOpen] = useState(false);
  const [studentGrade, setStudentGrade] = useState();
  //--------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const QuizUrl = `/Student_Answers/GetSpecificQuizforStudent`;
    const { data } = await post(QuizUrl, null, {
      params: { QuizID: match.params.quizId },
    });
    setQuizData(data);
  };

  //--------------------------------------------------------------------------------------------------------
  const QuizInforrmation = async () => {
    const QuizUrl = `/Student_Answers/GetQuiz`;
    const { data } = await post(QuizUrl, null, {
      params: {
        quizID: match.params.quizId,
        sub_Id: match.params.courseId,
        StudID: 1 /* JSON.parse(localStorage.getItem("StuInformation"))[0].StudentID */,
      },
    });
    setQuizInfo({ ...data[0] });
  };
  //--------------------------------------------------------------------------------------------------------
  const AddQuizAnswer = async () => {
    const Url = `/Student_Answers/addQuizAnswer`;
    const { data } = await post(Url, questionAnswers, {
      params: {
        quiizID: match.params.quizId,
        studID: 1,
      },
    });
    setStudentGrade(data);
  };
  //---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const interval = setInterval(() => {
      if (quizInfo) {
        const endTime = (Math.floor(quizInfo.OpenedAt)) + quizInfo.duration * 60000;
        const test = Date(quizInfo.OpenedAt);
        const bad = Date(Date.now());
        console.log(test, bad, (Math.floor(quizInfo.OpenedAt)));
        setTimer((endTime - Date.now()) / 60000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [quizInfo]);

  useEffect(() => {
    if (timer <= 0) {
      //redirect
    }
  }, [timer]);

  useEffect(() => {
    listQuizzes();
  }, [localStorage.getItem("QuizID")]);

  useEffect(() => {
    QuizInforrmation();
  }, [match.params.quizId, match.params.courseId]);

  useEffect(() => {
    const questionAnswerss = quizData?.map((question) =>
      getDefaultAnswerBody(question.questionId, question.NumberofCorrectAnswers)
    );
    setAnswers(questionAnswerss);
  }, [quizData]);

  return (
    <React.Fragment>
      <GradeDialog
        title="Student Grade"
        isOpened={gradeDialogIsOpen}
        onClose={() => setGradeDialogIsOpen(false)}
        grade={studentGrade}
      />
      <Grid item style={{ marginTop: "20px" }}>
        {quizInfo && (
          <Grid
            item
            style={{
              height: "auto",
              borderRadius: "2px",
              webkitBoxShadow: "5px 5px 5px #9E9E9E",
              mozBoxShadow: "5px 5px 5px #9E9E9E",
              boxShadow: "5px 5px 5px #9E9E9E",
              padding: "40px 40px 40px 40px",
              marginRight: "9px",
              backgroundColor: "white",
              width: "1240px",
            }}
          >
            <Grid item>
              <Grid item>
                <Grid item style={{ marginLeft: "800px" }}>
                  <Grid item style={{ marginLeft: "300px" }}>
                    <img
                      src={NAME}
                      alt="StudentNameImage"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "-50px" }}>
                    <Typography style={{ fontSize: "25px" }}>
                      {JSON.parse(localStorage.getItem("Information")).NameAR}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item style={{ marginLeft: "30px", marginTop: "-35px" }}>
                  <Grid item>
                    <img
                      src={ID}
                      alt="StudentIdImage"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "-50px", marginLeft: "70px" }}>
                    <Typography style={{ fontSize: "25px" }}>
                      {
                        JSON.parse(localStorage.getItem("StuInformation"))[0]
                          .SeatNo
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item style={{ marginLeft: "450px", marginTop: "10px" }}>
                <Grid item>
                  <img
                    src={QuizImage}
                    alt="CourseImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Grid>
                <Grid item style={{ marginTop: "-55px", marginLeft: "80px" }}>
                  <Typography style={{ fontSize: "35px" }}>
                    {quizInfo.Name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item style={{ marginLeft: "430px", marginTop: "10px" }}>
                <Grid item>
                  <img
                    src={CourseImage}
                    alt="CourseImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Grid>
                <Grid item style={{ marginTop: "-55px", marginLeft: "80px" }}>
                  <Typography style={{ fontSize: "35px" }}>
                    {SubjectName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item style={{ marginLeft: "295px", marginTop: "10px" }}>
                <Grid item>
                  <img
                    src={DateImage}
                    alt="DateImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Grid>
                <Grid item style={{ marginTop: "-55px", marginLeft: "80px" }}>
                  <Typography style={{ fontSize: "35px" }}>
                    {quizInfo.startDate}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                style={{
                  marginLeft: "830px",
                  width: "auto",
                  height: "auto",
                  borderRadius: "132px",
                  borderRadius: "16px",
                  border: "3px solid black",
                  webkitBoxShadow: "5px 5px 5px #9E9E9E",
                  mozBoxShadow: "5px 5px 5px #9E9E9E",
                  boxShadow: "5px 5px 5px #9E9E9E",
                  padding: "5px 5px 20px 60px",
                }}
              >
                <Grid item>
                  <img
                    src={QuizTimer}
                    alt="QuizTimerImage"
                    style={{ width: "80px", height: "80px" }}
                  />
                </Grid>
                <Grid item style={{ marginTop: "-70px", marginLeft: "90px" }}>
                  <Typography style={{ fontSize: "35px" }}>
                    {`${Math.floor(timer)}: ${Math.floor(
                      (timer - Math.floor(timer)) * 60
                    )}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        {quizData?.map((question, index) => (
          <Grid
            item
            style={{
              align: "left",
              height: "auto",
              marginTop: "10px",
              borderRadius: "2px",
              webkitBoxShadow: "5px 5px 5px #9E9E9E",
              mozBoxShadow: "5px 5px 5px #9E9E9E",
              boxShadow: "5px 5px 5px #9E9E9E",
              padding: "10px 10px 10px 10px",
              marginRight: "9px",
              backgroundColor: "white",
              width: "1240px",
            }}
          >
            <Grid
              item
              style={{
                padding: "10px 10px 10px 10px",
                borderRadius: "16px",
                border: "3px solid black",
                width: "220px",
                height: "75px",
                marginLeft: "109px",
                marginTop: "15px",
              }}
            >
              <Grid item style={{ marginLeft: "10px" }}>
                <img
                  src={QuestionNumber}
                  alt="QuestionNumberImage"
                  style={{ width: "50px", height: "50px" }}
                />
              </Grid>
              <Grid item style={{ marginTop: "-50px", marginLeft: "40px" }}>
                <Typography
                  style={{
                    marginLeft: "30px",
                    fontFamily: "Monaco",
                    fontSize: "25px",
                  }}
                >
                  {`Question ${index + 1}`}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Grid item style={{ marginTop: "10px" }}>
                <Grid
                  item
                  style={{
                    padding: "10px 10px 10px 10px",
                    borderRadius: "16px",
                    border: "3px solid black",
                    width: "180px",
                    height: "75px",
                    marginLeft: "880px",
                  }}
                >
                  <Grid item style={{ marginLeft: "10px" }}>
                    <img
                      src={Grades}
                      alt="GradeImage"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "-50px", marginLeft: "40px" }}>
                    <Typography
                      style={{
                        marginLeft: "30px",
                        fontFamily: "Monaco",
                        fontSize: "25px",
                      }}
                    >
                      {`Mark: ${question.grade}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: "-100px" }}>
                {question.Type == "mcq" ? (
                  <AnswersMCQ
                    questionData={question}
                    setQuestions={setAnswers}
                    allQuestionAnswers={questionAnswers}
                  />
                ) : (
                  <AnswersTrueFalse
                    questionData={question}
                    setQuestions={setAnswers}
                    allQuestionAnswers={questionAnswers}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid
          item
          style={{
            height: "auto",
            borderRadius: "2px",
            webkitBoxShadow: "5px 5px 5px #9E9E9E",
            mozBoxShadow: "5px 5px 5px #9E9E9E",
            boxShadow: "5px 5px 5px #9E9E9E",
            padding: "40px 40px 40px 40px",
            marginRight: "9px",
            backgroundColor: "white",
            width: "1240px",
          }}
        >
          <Grid item style={{ marginLeft: "1000px" }}>
            <Button
              onClick={() => {
                AddQuizAnswer();
                setGradeDialogIsOpen(true);
              }}
              className={classes.addButton}
              size="small"
            >
              <Grid
                container
                spacing={1}
                alignItems="center"
                className={classes.addButtonBody}
              >
                <Grid item>
                  <AddMaterialIcon className={classes.addIcon} />
                </Grid>
                <Grid item>
                  <Typography className={classes.buttonText}>Submit</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default withStyles(useStyles)(withRouter(ViewQuizForStudent));
