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
import ViewMCQ from "./ViewMCQ";
import ViewTrueFalse from "./ViewTrueFalse";

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

const ViewQuizForInstructor = () => {
  const listQuizzes = async () => {
    const QuizUrl = `/DoctorMakeQuiz/GetSpecificQuiz`;
    const { data } = await post(QuizUrl, null, {
      params: { quizID: localStorage.getItem("QuizID") },
    });
    setAllQuizzes(data);
  };
  const [allQuizzes, setAllQuizzes] = useState();
  const [Title, setTitle] = useState();

  useEffect(() => {
    listQuizzes();
  }, [localStorage.getItem("QuizID")]);

  return (
    <React.Fragment>
      <Grid item>
        <Grid item>
          <button
            onClick={() => {
              console.log(allQuizzes);
            }}
          >
            ana
          </button>
        </Grid>
        {allQuizzes?.map((quiz) => (
          <Grid item>
            <Grid item>
              <TextField
                id="standard-basic"
                label="Enter Question Grade"
                type="number"
                value={quiz.grade}
                /* onChange={(e) => {
            const newGrade = Number(e.target.value);
            setQuestions((prev) =>
              prev.map((question, currIndex) =>
                currIndex !== questionIndex - 1
                  ? question
                  : { ...question, grade: newGrade }
              )
            );
          }} */
                style={{
                  alignItems: "right",
                  marginLeft: "360px",
                  marginBottom: "20px",
                }}
                inputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
              />
            </Grid>
            <Grid item>
              {quiz.Type == "mcq" ? (
                <ViewMCQ
                  questionData={quiz}
                />
              ) : (
                <ViewTrueFalse
                  questionData={quiz}
                />
              )}
              <button
                onClick={() => {
                  console.log(quiz.options.multipleCorrectAnswers);
                  console.log(quiz.choices[0].choiceValueAsString);
                }}
              ></button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default withStyles(useStyles)(withRouter(ViewQuizForInstructor));
