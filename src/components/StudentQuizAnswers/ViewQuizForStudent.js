import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import { post, get } from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { withRouter } from "react-router-dom";
import { Grid, withStyles } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import AnswersMCQ from "./AnswersMCQ";
import AnswersTrueFalse from "./AnswersTrueFalse";

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
}));
const ViewQuizForStudent = () => {
  const getDefaultAnswerBody = () => ({
    quizId: localStorage.getItem("QuizID"),
    studentId: JSON.parse(localStorage.getItem("StuInformation"))[0].SeatNo,
    questionId: "",
    answers: [" "],
    trueOrFalse: 0,
  });

  const [questions, setQuestions] = useState([getDefaultAnswerBody()]);
  const [questionIndex, setQuestionIndex] = useState(1);
  const listQuizzes = async () => {
    const QuizUrl = `/DoctorMakeQuiz/GetSpecificQuiz`;
    const { data } = await post(QuizUrl, null, {
      params: { quizID: localStorage.getItem("QuizID") },
    });
    setAllQuizzes(data);
  };
  const [allQuizzes, setAllQuizzes] = useState();
  console.log(questions);


  useEffect(() => {
    listQuizzes();
  }, [localStorage.getItem("QuizID")]);

  return (
    <React.Fragment>
      <Grid item style={{ marginTop: "20px" }}>
        {allQuizzes?.map((quiz, index) => (
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
                  {`Question Grade: ${quiz.grade}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              {quiz.Type == "mcq" ? (
                <AnswersMCQ
                  questionData={quiz}
                  questionIndex={questionIndex}
                  setQuestions={setQuestions}
                />
              ) : (
                <AnswersTrueFalse
                  questionData={quiz}
                  questionIndex={questionIndex}
                  setQuestions={setQuestions}
                />
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default withStyles(useStyles)(withRouter(ViewQuizForStudent));
