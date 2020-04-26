import React, { useState, useEffect } from "react";
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

const ViewMCQ = ({ classes, questionData }) => {
  const [MCQData, setMCQData] = useState([]);
  useEffect(() => {
    setMCQData(questionData);
  }, [questionData]);

  return (
    <React.Fragment>
      <Grid item>
        {questionData.map((question) => (
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
            </Grid>
            <Grid>
              <TextField
                placeholder="Enter Your Question Statement"
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
              <div>{question.multipleCorrectAnswers}</div>
            </Grid>
          </Grid>
        ))}
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

export default withStyles(styles)(ViewMCQ);
