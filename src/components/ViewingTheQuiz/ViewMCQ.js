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

const ViewMCQ = ({ classes, questionData }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [MCQData, setMCQData] = useState([]);
  //--------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setMCQData(questionData);
  }, [questionData]);

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
          <Typography style={{ fontSize: "35px" }}>{MCQData.title}</Typography>
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
                      checked={question.correctChoice}
                      disableRipple
                      classes={{
                        root: classes.check,
                        checked: classes.checked,
                      }}
                    />
                  ) : (
                    <Radio
                      // single correct answer
                      checked={question.correctChoice}
                      inputProps={{ "aria-label": "A" }}
                      disableRipple
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
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
  check:{
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

export default withStyles(styles)(ViewMCQ);
