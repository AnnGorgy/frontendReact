import React, { useState, useEffect } from "react";
import {
  TextField,
  withStyles,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";

const AnswersMCQ = ({ classes, questionData, questionIndex, setQuestions }) => {
  const handleChooseChoiceAsStudentAnswer = (value, index) => {
    if (!questionData.options.multipleCorrectAnswers) {
      // single correct answer
      setQuestions((prev) =>
        prev.map((question) =>
          question.index !== questionIndex
            ? question
            : {
                ...question,
                answers: value,
              }
        )
      );
      setQuestions((prev) =>
        prev.map((question) =>
          question.index !== questionIndex
            ? question
            : {
                ...question,
                questionId: MCQData.questionId,
              }
        )
      );
    } else {
      // multiple correct answers
      setQuestions((prev) =>
        prev.map((question) =>
          question.index !== questionIndex
            ? question
            : {
                ...question,
                answers: value,
              }
        )
      );
      setQuestions((prev) =>
        prev.map((question) =>
          question.index !== questionIndex
            ? question
            : {
                ...question,
                questionId: MCQData.questionId,
              }
        )
      );
    }
  };
  const [MCQData, setMCQData] = useState([]);
  useEffect(() => {
    setMCQData(questionData);
  }, [questionData]);

  return (
    <React.Fragment>
      <Grid
        style={{
          align: "left",
          height: "500px",
          marginTop: "10px",
          marginRight: "9px",
          width: "1257px",
        }}
      >
        <Grid item>
          <TextField
            label="Title"
            defaultValue={MCQData.title}
            value={MCQData.title}
            variant="outlined"
            classes={{
              root: classes.textFieldRoot,
            }}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
            style={{ width: "500px", marginLeft: "160px" }}
          />
        </Grid>
        <Grid item>
          <TextField
            defaultValue={MCQData.QuestionAsString}
            value={MCQData.QuestionAsString}
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
            }}
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
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
                <Grid item>
                  <TextField
                    value={question.choiceValueAsString}
                    label={index + 1}
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
                    }}
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                      },
                    }}
                    style={{
                      width: "350px",
                      marginLeft: "285px",
                      marginBottom: "2px",
                      paddingBottom: "7px",
                    }}
                  />
                </Grid>
                <Grid item style={{ marginTop: "-50px", marginLeft: "670px" }}>
                  {questionData.options.multipleCorrectAnswers ? (
                    // multiple correct answers
                    <Checkbox
                      inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                      checked={Boolean(question.correctChoice)}
                      onChange={(e) =>
                        handleChooseChoiceAsStudentAnswer(
                          e.target.checked,
                          question.index
                        )
                      }
                    />
                  ) : (
                    <Radio
                      // single correct answer
                      checked={Boolean(question.correctChoice)}
                      onChange={(e) =>
                        handleChooseChoiceAsStudentAnswer(
                          e.target.checked,
                          question.index
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
const styles = (theme) => ({
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
    marginTop: "10px",
    marginBottom: "10px",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `black !important`,
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
  createText: {
    color: "silver",
  },
});

export default withStyles(styles)(AnswersMCQ);
