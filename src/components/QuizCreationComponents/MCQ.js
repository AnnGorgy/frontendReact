import React, { useState } from "react";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  TextField,
  withStyles,
  Grid,
  Button,
  Typography,
  FormGroup,
  Switch,
  Checkbox,
  Radio,
  Tooltip,
  FormControlLabel,
} from "@material-ui/core";
//----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
//----------------------------------------------------------------------------------------------------------

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

  const QuestionShuffleSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,

        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  return (
    <React.Fragment>
      <Grid item>
        <Grid
          style={{
            align: "left",
            height: "530px",
            marginTop: "10px",
            borderRadius: "2px",
            webkitBoxShadow: "5px 5px 5px #9E9E9E",
            mozBoxShadow: "5px 5px 5px #9E9E9E",
            boxShadow: "5px 5px 5px #9E9E9E",
            marginRight: "9px",
            backgroundColor: "white",
            width: "1414px",
            overflowY: "auto",
            overflowX: "hidden",
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
            <Grid item style={{ marginRight: "100px" }}>
              <FormGroup>
                <FormControlLabel
                  labelPlacement="start"
                  label="Shuffle Choices"
                  control={
                    <QuestionShuffleSwitch
                      checked={questionData.options.shuffleChoices}
                      onChange={(e) =>
                        handleChangeShuffleChoices(e.target.checked)
                      }
                    />
                  }
                />
              </FormGroup>
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            alignItems="stretch"
            justify="center"
            spacing={1}
            style={{
              flexWrap: "nowrap",
              width: "1200px",
              marginLeft: "150px",
            }}
          >
            {questionData.choices.map((choice, arrayIndex) => {
              return (
                <Grid
                  item
                  style={{ marginLeft: "-180px", marginBottom: "30px" }}
                >
                  <Grid item>
                    <Grid
                      item
                      style={{ marginLeft: "220px", marginTop: "20px" }}
                    >
                      <Typography style={{ fontSize: "20px" }}>{` [ ${
                        arrayIndex + 1
                      } ] `}</Typography>
                    </Grid>
                    <Grid item style={{ marginTop: "-60px" }}>
                      <TextField
                        label="Enter Your Choice"
                        name="Choice"
                        multiline
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
                          width: "750px",
                          marginLeft: "285px",
                          marginBottom: "2px",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    style={{ marginTop: "-55px", marginLeft: "1100px" }}
                  >
                    {questionData.options.multipleCorrectAnswers ? (
                      // multiple correct answers
                      <Checkbox
                        inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                        checked={Boolean(choice.correctChoice)}
                        classes={{
                          root: classes.check,
                          checked: classes.checked,
                        }}
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
                        classes={{
                          root: classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    )}
                  </Grid>

                  <Grid
                    item
                    style={{ marginTop: "-58px", marginLeft: "1150px" }}
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
  radio: {
    "&$checked": {
      color: "#0e7c61",
    },
  },
  checked: {},
  check: {
    "&$checked": {
      color: "#0e7c61",
    },
  },
  checked: {},
});

export default withStyles(styles)(MCQ);
