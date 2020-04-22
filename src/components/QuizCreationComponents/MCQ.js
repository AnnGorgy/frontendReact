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

const MCQ = ({ classes, setQuestions, index }) => {
  const setInputList = () => {
    setQuestions(prev => prev.map((question, currIndex) => currIndex !== index? question: {...question, choices: [...question.choices, ]}))
  }
  const [inputList, setInputList] = useState([{ content: "", index: 0 }]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  // false : single
  // true  : multi
  const [questionType, setQuestionType] = useState(0);

  const handleChange = () => {
    setCorrectAnswers([]);
    setQuestionType((prev) => !prev);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    setInputList((prev) =>
      prev.map((choice) =>
        choice.index === index ? { ...choice, content: e.target.value } : choice
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

  const handleRemoveClick = (index) => {
    if (correctAnswers.includes(index)) {
      setCorrectAnswers((prev) => prev.filter((answer) => answer !== index));
    }
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList((prev) => [...prev, { content: "", index: currentIndex }]);
    setCurrentIndex((prev) => prev + 1);
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
              placeholder="Enter title of the Question"
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
              style={{ width: "500px", marginLeft: "160px" }}
            />
          </Grid>
          <Grid>
            <TextField
              placeholder="Enter Your Question Statement"
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
              style={{ width: "900px", marginLeft: "160px" }}
            />
            <FormGroup style={{ marginLeft: "900px" }}>
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
                      checked={!questionType}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>Single Choice</Grid>
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
            {inputList.map((choice, index) => {
              return (
                <Grid item style={{ marginLeft: "-180px" }}>
                  <Grid item>
                    <TextField
                      label="Enter Your Choice"
                      name="Choice"
                      value={choice.content}
                      onChange={(e) => {
                        handleInputChange(e, index);
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
                    {questionType ? (
                      <Checkbox
                        inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                        checked={correctAnswers.includes(choice.index)}
                        onChange={(e) =>
                          e.target.checked
                            ? setCorrectAnswers((prev) => [
                                ...prev,
                                choice.index,
                              ])
                            : setCorrectAnswers((prev) =>
                                prev.filter((answer) => answer !== choice.index)
                              )
                        }
                      />
                    ) : (
                      <Radio
                        checked={correctAnswers.includes(choice.index)}
                        onChange={() => setCorrectAnswers([choice.index])}
                        value={index}
                        name="Single_Choice"
                        inputProps={{ "aria-label": "A" }}
                      />
                    )}
                  </Grid>

                  <Grid
                    item
                    style={{ marginTop: "-58px", marginLeft: "700px" }}
                  >
                    {inputList.length - 1 === index && (
                      <Tooltip title="Add" placement="bottom">
                        <Button
                          style={{ marginTop: "20px", marginLeft: "3px" }}
                        >
                          <AddCircleIcon onClick={handleAddClick} />
                        </Button>
                      </Tooltip>
                    )}
                    {inputList.length !== 1 && (
                      <Tooltip title="Delete" placement="bottom">
                        <Button style={{ marginTop: "20px" }}>
                          <DeleteIcon
                            onClick={() => handleRemoveClick(index)}
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
