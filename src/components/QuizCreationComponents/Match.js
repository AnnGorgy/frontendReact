import React, { useState } from "react";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  TextField,
  withStyles,
  Grid,
  Button,
  Typography,
  Switch,
  Checkbox,
  Radio,
  Tooltip,
} from "@material-ui/core";
//----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
//----------------------------------------------------------------------------------------------------------

const Match = ({ classes, questionData, setQuestions, questionIndex }) => {
  const [currentChoiceIndex, setCurrentChoiceIndex] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(1);


  // false : single
  // true  : multi
  // const [questionData.questionType, setquestionData.QuestionType] = useState(false);

  // handle input change Question
  const handleMatchQuestionHeaderTextChange = (e, index) => {
    const newInput = e.target.value;
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              matchQuestions: question.matchQuestions.map((choice) =>
                choice.index !== index
                  ? choice
                  : { ...choice, matchQuestionHeader: newInput }
              ),
            }
      )
    );
  };

  // handle input change Answer
  const handleMatchQuestionAnswerTextChange = (e, index) => {
    const newInput = e.target.value;
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              matchQuestions: question.matchQuestions.map((choice) =>
                choice.index !== index
                  ? choice
                  : { ...choice, matchQuestionAnswer: newInput }
              ),
            }
      )
    );
  };

  // handle input Words
  const handlewordsTextChange = (e, index) => {
    const newInput = e.target.value;
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              words: question.words.map((choice) =>
                choice.index !== index
                  ? choice
                  : { ...choice, wordAsString: newInput }
              ),
            }
      )
    );
  };

  
  // handle click event of the Add button
  const handleAddNewChoice = () => {
    const defaultMatchValue = {
    index: currentChoiceIndex,
      matchQuestionHeader: "",
      matchQuestionAnswer: "",
    };
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              matchQuestions: [...question.matchQuestions, defaultMatchValue],
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
              matchQuestions: question.matchQuestions.filter(
                (choice) => choice.index !== index
              ),
            }
      )
    );
  };


  // handle click event of the Add button
  const handleAddNewWord = () => {
    const defaultWordsValue = {
    index: currentWordIndex,
    wordAsString: "",
    };
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              words: [...question.words, defaultWordsValue],
            }
      )
    );
    setCurrentWordIndex((prev) => prev + 1);
  };

  const handleRemoveWord = (index) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.index !== questionIndex
          ? question
          : {
              ...question,
              words: question.words.filter(
                (choice) => choice.index !== index
              ),
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
          </Grid>

          <Grid
            container
            direction="column"
            alignItems="stretch"
            justify="center"
            spacing={1}
            style={{
              flexWrap: "nowrap",
              width: "auto",
              height : "auto" ,
              marginLeft: "150px",
            }}
          >
              {questionData.words.map((choice, arrayIndex) => {
              return (
                <Grid
                  item
                  style={{ marginLeft: "-260px", marginBottom: "50px" }}
                >
                  <Grid item>
                    <Grid item >
                      <TextField
                        label="Enter Your Words"
                        name="Words"
                        multiline
                        value={choice.wordAsString}
                        onChange={(e) => {
                            handlewordsTextChange(e, choice.index);
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
                          width: "250px",
                          marginLeft: "285px",
                          marginBottom: "2px",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    style={{ marginTop: "-85px", marginLeft: "550px" }}
                  >
                    {questionData.words.length - 1 === arrayIndex && (
                      <Grid style={{ marginTop: "20px", marginLeft: "3px" }}>
                        <Tooltip title="Add" placement="bottom">
                          <Button>
                            <AddCircleIcon onClick={handleAddNewWord} />
                          </Button>
                        </Tooltip>
                      </Grid>
                    )}
                    {questionData.words.length !== 1 && (
                      <Grid style={{ marginTop: "-35px", marginLeft: "80px" }}>
                        <Tooltip title="Delete" placement="bottom">
                          <Button>
                            <DeleteIcon
                              onClick={() => handleRemoveWord(choice.index)}
                            />
                          </Button>
                        </Tooltip>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              );
            })}
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
            {questionData.matchQuestions.map((choice, arrayIndex) => {
              return (
                <Grid
                  item
                  style={{ marginLeft: "-260px", marginBottom: "50px" }}
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
                        label="Enter Your Question"
                        name="Question"
                        multiline
                        value={choice.matchQuestionHeader}
                        onChange={(e) => {
                          handleMatchQuestionHeaderTextChange(e, choice.index);
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
                    style={{ marginTop: "-90px", marginLeft: "1065px" }}
                  >
                    <TextField
                      label="Enter Your Answer"
                      name="Answer"
                      multiline
                      value={choice.matchQuestionAnswer}
                      onChange={(e) => {
                        handleMatchQuestionAnswerTextChange(e, choice.index);
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
                        width: "250px",
                      }}
                    />
                  </Grid>

                  <Grid
                    item
                    style={{ marginTop: "-90px", marginLeft: "1350px" }}
                  >
                    {questionData.matchQuestions.length - 1 === arrayIndex && (
                      <Grid style={{ marginTop: "20px", marginLeft: "3px" }}>
                        <Tooltip title="Add" placement="bottom">
                          <Button>
                            <AddCircleIcon onClick={handleAddNewChoice} />
                          </Button>
                        </Tooltip>
                      </Grid>
                    )}
                    {questionData.matchQuestions.length !== 1 && (
                      <Grid style={{ marginTop: "-35px", marginLeft: "80px" }}>
                        <Tooltip title="Delete" placement="bottom">
                          <Button>
                            <DeleteIcon
                              onClick={() => handleRemoveChoice(choice.index)}
                            />
                          </Button>
                        </Tooltip>
                      </Grid>
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

export default withStyles(styles)(Match);
