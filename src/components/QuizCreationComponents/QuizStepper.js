import React, { useState, useEffect } from "react";
import { post } from "axios";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  withStyles,
  Typography,
  TextField,
  FormGroup,
  Switch,
  Button,
  MobileStepper,
  useTheme,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------- Images ---------------------------------------------------------
import QuestionNumber from "./QuestionNumber.png";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component -------------------------------
import MCQ from "./MCQ";
import TrueFalse from "./TrueFalse";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
//-----------------------------------------------------------------------------------------------------------

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

const QuizStepper = ({ match, classes ,history }) => {
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

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [questions, setQuestions] = useState([getDefaultQuestionBody(0)]);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [maxSteps, setmaxSteps] = useState();
  const theme = useTheme();
  useEffect(() => {
    setmaxSteps(localStorage.getItem("numberOfQuestions"));
  }, []);
  //-----------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------
  const AddQuestionsForTheQuiz = async () => {
    const Url = `/DoctorMakeQuiz/createQuestions`;
    const { data } = await post(Url, questions, {
      params: {
        quizID: match.params.quizId,
      },
    });
  };
  //---------------------------------------------------------------------------------------------------------

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
      <Grid
        item
        className={classes.header}
        style={{ marginRight: "9px", height: "85px" }}
      >
        <Grid
          item
          style={{
            padding: "3px 3px 3px 3px",
            borderRadius: "16px",
            border: "3px solid black",
            width: "220px",
            height: "60px",
            marginLeft: "40px",
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
                width: "130px",
              }}
            >
              {`Question ${questionIndex}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
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
              marginLeft: "335px",
              marginBottom: "20px",
              width: "230px",
            }}
            inputProps={{ style: { color: "black" } }}
            InputLabelProps={{ style: { color: "black", fontSize: "22px" } }}
          />
        </Grid>
        <Grid item>
          <FormGroup style={{ marginLeft: "280px" }}>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography style={{ fontSize: "25px" }}>
                    True/False
                  </Typography>
                </Grid>
                <Grid item>
                  <QuestionTypeSwitch
                    checked={questions[questionIndex - 1].type === "mcq"}
                    onChange={changeQuestionType}
                  />
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: "25px" }}> MCQ </Typography>
                </Grid>
              </Grid>
            </Typography>
          </FormGroup>
        </Grid>
      </Grid>
      <Grid item>
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
        </Grid>
        {questionIndex == maxSteps && (
          <Grid item style={{ marginTop: "-19px" }}>
            <Button
              onClick={() => {
                AddQuestionsForTheQuiz();
                history.push(`/quiz/${match.params.courseId}/${match.params.coursename}`);
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
        )}
      </Grid>
      <Grid item style={{ marginTop: "10px" }}>
        <MobileStepper
          style={{
            width: "1400px",
            height: "30px",
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
  );
};

const styles = () => ({
  root: {
    maxWidth: 1257,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 60,
    webkitBoxShadow: "5px 5px 5px #9E9E9E",
    mozBoxShadow: "5px 5px 5px #9E9E9E",
    boxShadow: "5px 5px 5px #9E9E9E",
    backgroundColor: "white",
    font: 50,
  },
  addButton: {
    borderRadius: "16px",
    width: "125px",
    height: "40px",
    color: "black",
    marginTop: "-90px",
    marginLeft: "1250px",
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
});

export default withStyles(styles)(withRouter(QuizStepper));
