import React, { useState, useEffect } from "react";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  TextField,
  withStyles,
  Grid,
  Checkbox,
  Radio,
  Typography,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const AnswersMCQ = ({
  classes,
  questionData,
  setQuestions,
  allQuestionAnswers,
}) => {
  const handleChooseChoiceAsStudentAnswer = (value, idQuestion, checked) => {
    if (!questionData.options.multipleCorrectAnswers) {
      // single correct answer
      setQuestions((prev) =>
        prev.map((question) =>
          question.questionId !== idQuestion
            ? question
            : {
                ...question,
                answers: [value],
              }
        )
      );
    } else {
      // multiple correct answers
      setQuestions((prev) =>
        prev.map((question) =>
          question.questionId !== idQuestion
            ? question
            : {
                ...question,
                answers: checked
                  ? [...question.answers, value]
                  : question.answers.filter(
                      (answerValue) => answerValue !== value
                    ),
              }
        )
      );
    }
  };

  return (
    <React.Fragment>
      <Grid
        style={{
          align: "left",
          height: "auto",
          marginTop: "30px",
          marginRight: "9px",
          width: "1257px",
        }}
      >
        <Grid item style={{ marginLeft: "110px" }}>
          <Typography style={{ fontSize: "35px" }}>
            {questionData.title}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            defaultValue={questionData.QuestionAsString}
            value={questionData.QuestionAsString}
            label="Question Body"
            multiline
            rows={2}
            variant="outlined"
            classes={{
              root: classes.textFieldRoot,
            }}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
              readOnly: true,
              style: { fontSize: "30px" },
            }}
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
              shrink: "true",
              style: { fontSize: "20px" },
            }}
            style={{
              width: "900px",
              marginLeft: "160px",
              marginTop: "30px",
            }}
          />
        </Grid>

        <Grid item>
          {questionData.choices.map((question, index) => {
            return (
              <Grid item>
                <Grid item style={{ marginTop: "30px" }}>
                  <Grid item style={{ marginLeft: "220px", marginTop: "15px" }}>
                    <Typography style={{ fontSize: "20px" }}>{` [ ${
                      index + 1
                    } ] `}</Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "-60px" }}>
                    <TextField
                      value={question.choiceValueAsString}
                      name="Choice"
                      rows={1}
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                        readOnly: true,
                        style: { fontSize: "23px" },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                        shrink: "true",
                      }}
                      style={{
                        width: "350px",
                        marginLeft: "285px",
                        marginBottom: "2px",
                        paddingBottom: "7px",
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  style={{
                    marginTop: "-55px",
                    marginLeft: "670px",
                    paddingBottom: "15px",
                  }}
                >
                  {questionData.options.multipleCorrectAnswers ? (
                    // multiple correct answers
                    <Checkbox
                      inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                      classes={{
                        root: classes.check,
                        checked: classes.checked,
                      }}
                      checked={Boolean(
                        allQuestionAnswers
                          ?.filter(
                            (answer) =>
                              answer.questionId === questionData.questionId
                          )[0]
                          ?.answers.includes(question.choiceValueAsString)
                      )}
                      onChange={(event) =>
                        handleChooseChoiceAsStudentAnswer(
                          question.choiceValueAsString,
                          questionData.questionId,
                          event.target.checked
                        )
                      }
                    />
                  ) : (
                    <Radio
                      // single correct answer
                      checked={Boolean(
                        allQuestionAnswers
                          ?.filter(
                            (answer) =>
                              answer.questionId === questionData.questionId
                          )[0]
                          ?.answers.includes(question.choiceValueAsString)
                      )}
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                      onChange={(event) =>
                        handleChooseChoiceAsStudentAnswer(
                          question.choiceValueAsString,
                          questionData.questionId,
                          event.target.checked
                        )
                      }
                      inputProps={{ "aria-label": "A" }}
                    />
                  )}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
const styles = () => ({
  dialog: {
    padding: "10px 0px",
  },
  multilineColor: {
    color: "red",
  },
  titleContainer: {
    marginBottom: "18px",
  },
  textFieldRoot: {
    backgroundColor: "white",
    borderRadius: "7px",
    marginTop: "20px",
    marginBottom: "10px",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `black !important`,
    fontSize: "21px",
  },
  label: {
    color: "black !important",
    fontWeight: "600",
  },
  dialogPaper: {
    minHeight: "50vh",
    padding: "20px 0px",
  },
  createButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px black solid",
  },
  cancelButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px red solid",
  },
  boldText: {
    fontWeight: "600",
  },
  check: {
    "&$checked": {
      color: "#0e7c61",
    },
  },
  checked: {},
  createText: {
    color: "silver",
  },
  radio: {
    "&$checked": {
      color: "#0e7c61",
    },
  },
  checked: {},
});

export default withStyles(styles)(AnswersMCQ);
