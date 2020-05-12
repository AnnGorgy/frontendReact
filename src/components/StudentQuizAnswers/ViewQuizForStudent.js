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
//--------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
//---------------------------------------------------------------------------------------------------------

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
    width: "130px",
    color: "black",
    backgroundColor: "#7dbbb9",
    "&:hover, &:focus": {
      backgroundColor: "#CCE6E5",
      color: "black",
    },
  },
  addIcon: {
    marginTop: "4px",
  },
  buttonText: {
    color: "black",
    paddingLeft: "5px",
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
      params: { quizID: match.params.quizId, sub_Id: match.params.courseId },
    });
    setQuizInfo({ ...data[0], openedAt: Date.now() });
  };
  //--------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const interval = setInterval(()=> {
      if(quizInfo) {
        const endTime = quizInfo.openedAt + quizInfo.duration * 60000;
        setTimer((endTime - Date.now()) / 60000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [quizInfo]);

  useEffect(() => {
    listQuizzes();
  }, [localStorage.getItem("QuizID")]);

  useEffect(() => {
    QuizInforrmation();
  }, [match.params.quizId, match.params.courseId]);

  useEffect(() => {
    // tyb l7d ma y3mloha hn3tbr quizInfo.openedAt feha el time ely 3wzeno tmm
    const questionAnswerss = quizData?.map((question) =>
      getDefaultAnswerBody(question.questionId, question.NumberofCorrectAnswers)
    );
    setAnswers(questionAnswerss);
  }, [quizData]);

  return (
    <React.Fragment>
      <Grid item style={{ marginTop: "20px" }}>
        {quizInfo && (
          <Grid
            item
            style={{
              height: "100px",
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
              <Typography style={{ fontSize: "20px" }}>
                {quizInfo.Name} in {SubjectName} on quiz date{" "}
                {quizInfo.startDate}
              </Typography>
              <Typography>
                Remaining time:
                {`${Math.floor(timer)}:${Math.floor(
                  (timer - Math.floor(timer)) * 60
                )}`}
              </Typography>
            </Grid>
          </Grid>
        )}
        {quizData?.map((question, index) => (
          <Grid
            item
            style={{
              align: "left",
              height: "600px",
              marginTop: "10px",
              borderRadius: "2px",
              webkitBoxShadow: "5px 5px 5px #9E9E9E",
              mozBoxShadow: "5px 5px 5px #9E9E9E",
              boxShadow: "5px 5px 5px #9E9E9E",
              padding: "5px 5px 5px 5px",
              marginRight: "9px",
              backgroundColor: "white",
              width: "1240px",
            }}
          >
            <Grid item>
              <Grid item>
                <Typography
                  style={{
                    marginLeft: "200px",
                    fontFamily: "Monaco",
                    fontSize: "25px",
                    marginTop: "20px",
                    width: "140px",
                    padding: "2px 2px 2px 20px",
                    borderRadius: "16px",
                    border: "3px solid black",
                  }}
                >
                  {`Question: ${index + 1}`}
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  style={{
                    marginLeft: "500px",
                    fontFamily: "Monaco",
                    fontSize: "25px",
                    marginTop: "-45px",
                    width: "200px",
                    padding: "2px 2px 2px 20px",
                    borderRadius: "16px",
                    border: "3px solid black",
                  }}
                >
                  {`Question Grade: ${question.grade}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
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
        ))}
      </Grid>

      <Grid item style={{ marginTop: "-65px", marginLeft: "1050px" }}>
        <Button
          onClick={async () =>
            await post("/Student_Answers/addQuizAnswer", questionAnswers, {
              params: {
                quiizID: match.params.quizId,
                studID: 1,
              },
            })
          }
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
    </React.Fragment>
  );
};
export default withStyles(useStyles)(withRouter(ViewQuizForStudent));
