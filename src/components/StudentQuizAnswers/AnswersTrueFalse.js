import React, { useState, useEffect } from "react";
import {
  TextField,
  withStyles,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";

const AnswersTrueFalse = ({
  setQuestions,
  questionData,
  allQuestionAnswers,
  classes,
}) => {
  const setQuestionAnswer = (answer, idQuestion) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.questionId !== idQuestion
          ? question
          : {
              ...question,
              trueOrFalse: answer,
              /* answers: null, */
            }
      )
    );
  };
  const [TFData, setTFData] = useState([]);
  useEffect(() => {
    setTFData(questionData);
  }, [questionData]);

  return (
    <React.Fragment>
      <Grid item>
        <Grid
          style={{
            align: "left",
            height: "100px",
            marginTop: "10px",
            marginRight: "9px",
            width: "1257px",
          }}
        >
          <Grid>
            <TextField
              label="Title"
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
              defaultValue={TFData.title}
              value={TFData.title}
              style={{ width: "500px", marginLeft: "160px" }}
            />
          </Grid>

          <Grid>
            <TextField
              label="Question Statement"
              value={TFData.QuestionAsString}
              defaultValue={TFData.QuestionAsString}
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
              style={{ width: "900px", marginLeft: "160px" }}
            />
          </Grid>
          <Grid item style={{ marginLeft: "140px" }}>
            <Grid item style={{ marginLeft: "180px", paddingBottom: "40px" }}>
              <Grid item>
                <Typography
                  style={{
                    fontSize: "35px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  True
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "-43px", marginLeft: "200px" }}>
                <Radio
                  checked={Boolean(
                    allQuestionAnswers
                      ?.filter(
                        (answer) =>
                          answer.questionId === questionData.questionId
                      )[0]
                      ?.answers.includes(0)
                  )}
                  onChange={() => setQuestionAnswer(1, TFData.questionId)}
                  inputProps={{ "aria-label": "A" }}
                />
              </Grid>
            </Grid>
            <Grid item style={{ marginLeft: "180px", paddingBottom: "40px" }}>
              <Grid item>
                <Typography
                  style={{
                    fontSize: "35px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  False
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "-43px", marginLeft: "200px" }}>
                <Radio
                  checked={Boolean(
                    allQuestionAnswers
                      ?.filter(
                        (answer) =>
                          answer.questionId === questionData.questionId
                      )[0]
                      ?.answers.includes(0)
                  )}
                  onChange={() => setQuestionAnswer(0, TFData.questionId)}
                  inputProps={{ "aria-label": "A" }}
                />
              </Grid>
            </Grid>
          </Grid>
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

export default withStyles(styles)(AnswersTrueFalse);
