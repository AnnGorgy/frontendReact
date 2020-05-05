import React, { useState } from "react";
import { TextField, withStyles, Grid, Typography } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";

const TrueFalse = ({ questionIndex, questionData, setQuestions, classes }) => {
  const setQuestionAnswer = (answer) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              trueOrFalse: answer,
            }
      )
    );
  };
  return (
    <React.Fragment>
      <Grid item>
        <Grid
          style={{
            align: "left",
            height: "500px",
            marginTop: "10px",
            borderRadius: "2px",
            webkitBoxShadow: "5px 5px 5px #9E9E9E",
            mozBoxShadow: "5px 5px 5px #9E9E9E",
            boxShadow: "5px 5px 5px #9E9E9E",
            marginRight: "9px",
            backgroundColor: "white",
            width: "1257px",
          }}
        >
          <Grid>
            <TextField
              placeholder="Enter The Title Of The Question"
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
              value={questionData.title}
              onChange={(e) => {
                const newInput = e.target.value;
                setQuestions((prev) =>
                  prev.map((question) =>
                    question.index !== questionIndex
                      ? question
                      : {
                          ...question,
                          title: newInput,
                        }
                  )
                );
              }}
              style={{ width: "500px", marginLeft: "160px" }}
            />
          </Grid>

          <Grid>
            <TextField
              placeholder="Enter Your Question"
              label="Question Statement"
              value={questionData.questionAsString}
              onChange={(e) => {
                const newInput = e.target.value;
                setQuestions((prev) =>
                  prev.map((question) =>
                    question.index !== questionIndex
                      ? question
                      : {
                          ...question,
                          questionAsString: newInput,
                        }
                  )
                );
              }}
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

          <Grid
            container
            direction="column"
            alignItems="stretch"
            justify="center"
            spacing={1}
            style={{
              flexWrap: "nowrap",
              borderRadius: "4px",
              border: "1px solid black",
              overflowY: "auto",
              width: "650px",
              height: "280px",
              marginLeft: "220px",
              flexGrow: 1,
              display: "flex",
            }}
          >
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
                  checked={questionData.trueOrFalse}
                  onChange={() => setQuestionAnswer(true)}
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
                  checked={!questionData.trueOrFalse}
                  onChange={() => setQuestionAnswer(false)}
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

export default withStyles(styles)(TrueFalse);
