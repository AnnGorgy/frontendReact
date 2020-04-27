import React, { useState } from "react";
import {
  TextField,
  withStyles,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";

const MCQ = ({ classes, questionData, setQuestions, questionIndex }) => {
  const [currentChoiceIndex, setCurrentChoiceIndex] = useState(1);
  // false : single
  // true  : multi
  // const [questionData.questionType, setquestionData.QuestionType] = useState(false);

  const handleChangeChoicesAnswerType = (value) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              options: { ...question.options, multipleCorrectAnswers: value },
              choices: question.choices.map((choice) => ({
                ...choice,
                correctChoice: 0,
              })),
            }
      )
    );
  };

  const handleChangeShuffleChoices = (value) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              options: { ...question.options, shuffleChoices: value },
            }
      )
    );
  };

  // handle input change
  const handleChoiceTextChange = (e, index) => {
    const newInput = e.target.value;
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              choices: question.choices.map((choice) =>
                choice.index !== index
                  ? choice
                  : { ...choice, choiceValueAsString: newInput }
              ),
            }
      )
    );
  };

  const handleChooseChoiceAsCorrectAnswer = (value, index) => {
    if (!questionData.options.multipleCorrectAnswers) {
      // single correct answer
      setQuestions((prev) =>
        prev.map((question) =>
          question.index !== questionIndex
            ? question
            : {
                ...question,
                choices: question.choices.map((choice) =>
                  choice.index !== index
                    ? { ...choice, correctChoice: 0 }
                    : { ...choice, correctChoice: value }
                ),
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
                choices: question.choices.map((choice) =>
                  choice.index !== index
                    ? choice
                    : { ...choice, correctChoice: value }
                ),
              }
        )
      );
    }
  };

  // handle click event of the Add button
  const handleAddNewChoice = () => {
    const defaultChoiceValue = {
      index: currentChoiceIndex,
      choiceValueAsString: "",
      correctChoice: 0,
    };
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              choices: [...question.choices, defaultChoiceValue],
            }
      )
    );
    setCurrentChoiceIndex((prev) => prev + 1);
  };

  const handleRemoveChoice = (index) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              choices: question.choices.filter(
                (choice) => choice.index !== index
              ),
            }
      )
    );
  };

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
          <Grid item>
            <Grid item>
              <TextField
                placeholder="Enter title of the Question"
                label="Title"
                value={questionData.title}
                onChange={(e) =>
                  setQuestions((prev) =>
                    prev.map((question) =>
                      question.index !== questionIndex
                        ? question
                        : {
                            ...question,
                            title: e.target.value,
                          }
                    )
                  )
                }
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
            <FormGroup style={{ marginLeft: "800px", marginTop: "-60px" }}>
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>Multiple Choice</Grid>
                  <Grid item>
                    <QuestionTypeSwitch
                      checked={!questionData.options.multipleCorrectAnswers}
                      onChange={(e) =>
                        handleChangeChoicesAnswerType(!e.target.checked)
                      }
                    />
                  </Grid>
                  <Grid item>Single Choice</Grid>
                </Grid>
              </Typography>
            </FormGroup>
          </Grid>
          <Grid>
            <TextField
            
              placeholder="Enter Your Question Statement"
              value={questionData.questionAsString}
              onChange={(e) =>
                setQuestions((prev) =>
                  prev.map((question) =>
                    question.index !== questionIndex
                      ? question
                      : {
                          ...question,
                          questionAsString: e.target.value,
                        }
                  )
                )
              }
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
              style={{ width: "900px", marginLeft: "160px", marginTop: "30px" }}
            />
            <FormGroup style={{ marginLeft: "1000px" }}>
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <QuestionTypeSwitch
                      checked={questionData.options.shuffleChoices}
                      onChange={(e) =>
                        handleChangeShuffleChoices(e.target.checked)
                      }
                    />
                  </Grid>
                  <Grid item>Shuffle Choices</Grid>
                </Grid>
              </Typography>
            </FormGroup>
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
              width: "760px",
              height: "280px",
              marginLeft: "220px",
              flexGrow: 1,
              display: "flex",
            }}
          >
            {questionData.choices.map((choice, arrayIndex) => {
              return (
                <Grid item style={{ marginLeft: "-180px" }}>
                  <Grid item>
                    <TextField
                      label="Enter Your Choice"
                      name="Choice"
                      value={choice.choiceValueAsString}
                      onChange={(e) => {
                        handleChoiceTextChange(e, choice.index);
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
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    style={{ marginTop: "-50px", marginLeft: "670px" }}
                  >
                    {questionData.options.multipleCorrectAnswers ? (
                      // multiple correct answers
                      <Checkbox
                        inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                        checked={Boolean(choice.correctChoice)}
                        onChange={(e) =>
                          handleChooseChoiceAsCorrectAnswer(
                            e.target.checked,
                            choice.index
                          )
                        }
                      />
                    ) : (
                      <Radio
                        // single correct answer
                        checked={Boolean(choice.correctChoice)}
                        onChange={(e) =>
                          handleChooseChoiceAsCorrectAnswer(
                            e.target.checked,
                            choice.index
                          )
                        }
                        inputProps={{ "aria-label": "A" }}
                      />
                    )}
                  </Grid>

                  <Grid
                    item
                    style={{ marginTop: "-58px", marginLeft: "700px" }}
                  >
                    {questionData.choices.length - 1 === arrayIndex && (
                      <Tooltip title="Add" placement="bottom">
                        <Button
                          style={{ marginTop: "20px", marginLeft: "3px" }}
                        >
                          <AddCircleIcon onClick={handleAddNewChoice} />
                        </Button>
                      </Tooltip>
                    )}
                    {questionData.choices.length !== 1 && (
                      <Tooltip title="Delete" placement="bottom">
                        <Button style={{ marginTop: "20px" }}>
                          <DeleteIcon
                            onClick={() => handleRemoveChoice(choice.index)}
                          />
                        </Button>
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              );
            })}
            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
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

export default withStyles(styles)(MCQ);
