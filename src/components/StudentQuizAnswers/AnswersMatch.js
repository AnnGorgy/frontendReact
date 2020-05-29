import React, { useState, useEffect } from "react";

//--------------------------------- What was used from material ui core -------------------------------------
import { TextField, withStyles, Grid, Typography } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const AnswersMatch = ({
  classes,
  questionData,
  setQuestions,
}) => {
  // handle input change Question
  const handleMatchQuestionHeaderTextChange = (e, idQuestionMatch, QID) => {
    const newInput = e;
    setQuestions((prev) =>
      prev.map((question) =>
        question.questionId !== QID
          ? question
          : {
              ...question,
              answers: null,
              matchAnswers: question.matchAnswers.map((choice) =>
                choice.matchQuestionsid !== idQuestionMatch
                  ? choice
                  : { ...choice, anwser: newInput }
              ),
            }
      )
    );
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
        <Grid
          item
          style={{
            borderRadius: "32px",
            border: "5px solid black",
            width: "700px",
            height: "auto",
            marginLeft: "50px",
          }}
        >
          {questionData.words.map((question, index) => {
            return (
              <Grid
                item
                style={
                  index % 2
                    ? { marginLeft: "450px", marginTop: "-45px" }
                    : { marginTop: "5px", marginLeft: "150px" }
                }
              >
                <Typography style={{ fontSize: "30px" }}>
                  {question.wordAsString}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
        <Grid item style={{ marginLeft: "-90px" }}>
          {questionData.matchQuestions.map((question, index) => {
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
                      value={question.matchQuestionHeader}
                      multiline
                      name="Question"
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
                        width: "600px",
                        marginLeft: "285px",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    style={{ marginTop: "-115px", marginLeft: "650px" }}
                  >
                    <TextField
                      name="Answer"
                      multiline
                      onChange={(e) => {
                        const newInput = e.target.value;
                        console.log(
                          newInput,
                          question.MatchQuestionID,
                          questionData.questionId
                        );

                        handleMatchQuestionHeaderTextChange(
                          newInput,
                          question.MatchQuestionID,
                          questionData.questionId
                        );
                      }}
                      rows={1}
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                        style: { fontSize: "23px" },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                      style={{
                        width: "250px",
                        marginLeft: "285px",
                      }}
                    />
                  </Grid>
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

export default withStyles(styles)(AnswersMatch);