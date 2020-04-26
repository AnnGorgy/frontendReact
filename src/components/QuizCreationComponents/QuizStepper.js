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
import MCQ from "./MCQ";
import TrueFalse from "./TrueFalse";
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";

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
const QuestionTypeSwitch = withStyles({
  switchBase: {
    color: "#00867d",
    "&$checked": {
      color: "#00867d",
    },
    "&$checked + $track": {
      backgroundColor: "#005b4f",
    },
  },
  checked: {},
  track: {},
})(Switch);

const QuizStepper = () => {
  const getDefaultQuestionBody = (length) => ({
    index: length + 1,
    type: "mcq",
    questionAsString: "",
    options: {
      multipleCorrectAnswers: false,
      shuffleChoices: false,
    },
    choices: [
      {
        index: 0,
        choiceValueAsString: "",
        correctChoice: false,
      },
    ],
    trueOrFalse: 0,
    grade: 0,
    title: "",
  });

  const [questions, setQuestions] = useState([getDefaultQuestionBody(0)]);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [maxSteps, setmaxSteps] = useState();
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    setmaxSteps(localStorage.getItem("numberOfQuestions"));
  }, []);

  console.log(questions);
  const handleNext = () => {
    if (questionIndex === questions.length) {
      setQuestions((prev) => {
        setQuestionIndex(prev.length + 1);
        return [...prev, getDefaultQuestionBody(prev.length)];
      });
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setQuestionIndex((prev) => prev - 1);
  };
  const changeQuestionType = (e) => {
    const currentIndex = questions.length;
    const questionType = !e.target.checked ? "tf" : "mcq";
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== currentIndex
          ? question
          : {
              ...getDefaultQuestionBody(question.index - 1),
              type: questionType,
              trueOrFalse: questionType === "tf",
            }
      )
    );
  };

  return (
    <Grid item>
      <Paper square elevation={0} className={classes.header}>
        <Typography
          style={{
            marginLeft: "30px",
            fontFamily: "Monaco",
            fontSize: "25px",
            width: "140px",
            padding: "2px 2px 2px 20px",
            borderRadius: "16px",
            border: "3px solid black",
          }}
        >
          {`Question: ${questionIndex}`}
        </Typography>

        <TextField
          id="standard-basic"
          label="Enter Question Grade"
          type="number"
          value={questions[questionIndex - 1].grade}
          onChange={(e) => {
            const newGrade = Number(e.target.value);
            setQuestions((prev) =>
              prev.map((question, currIndex) =>
                currIndex !== questionIndex - 1
                  ? question
                  : { ...question, grade: newGrade }
              )
            );
          }}
          style={{
            alignItems: "right",
            marginLeft: "360px",
            marginBottom: "20px",
          }}
          inputProps={{ style: { color: "black" } }}
          InputLabelProps={{ style: { color: "black" } }}
        />
        <FormGroup style={{ marginLeft: "240px" }}>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>True/False</Grid>
              <Grid item>
                <QuestionTypeSwitch
                  checked={questions[questionIndex - 1].type === "mcq"}
                  onChange={changeQuestionType}
                />
              </Grid>
              <Grid item>MCQ</Grid>
            </Grid>
          </Typography>
        </FormGroup>
      </Paper>
      <Grid item>
        {questions[questionIndex - 1].type === "mcq" ? (
          <MCQ
            questionIndex={questionIndex}
            questionData={questions[questionIndex - 1]}
            setQuestions={setQuestions}
          />
        ) : (
          <TrueFalse
            questionIndex={questionIndex}
            questionData={questions[questionIndex - 1]}
            setQuestions={setQuestions}
          />
        )}
        {questionIndex == maxSteps && (
          <Grid item style={{ marginTop: "-65px", marginLeft: "1050px" }}>
            <Button
              onClick={ async () =>
               await post(
                  "/DoctorMakeQuiz/createQuestions",
                  (questions: questions),
                  {
                    params: {
                      quizID: localStorage.getItem("QuizID"),
                    },
                  }
                )
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
        )}

        <Grid item style={{ marginTop: "25px" }}>
          <MobileStepper
            style={{
              width: "1241px",
              height: "20px",
              webkitBoxShadow: "5px 5px 5px #9E9E9E",
              mozBoxShadow: "5px 5px 5px #9E9E9E",
              boxShadow: "5px 5px 5px #9E9E9E",
              backgroundColor: "silver",
            }}
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={questionIndex - 1}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={questionIndex == maxSteps}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={questionIndex === 1}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withStyles(useStyles)(withRouter(QuizStepper));
