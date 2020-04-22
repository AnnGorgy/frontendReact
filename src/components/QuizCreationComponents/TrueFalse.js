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

const TrueFalse = ({ classes }) => {
  const [correctAnswers, setCorrectAnswers] = useState([0]);
  const inputList = [
    { content: "False", index: 0 },
    { content: "True", index: 1 },
  ];

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
              style={{ width: "500px", marginLeft: "160px" }}
            />
          </Grid>

          <Grid>
            <TextField
              placeholder="Enter Your Question"
              label="Question Statement"
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
            {/* TODO: change x, i to something meaningful */}
            {inputList.map((choice, index) => {
              return (
                <React.Fragment>
                  {/* TODO: style this part */}
                  <Grid item style={{ marginLeft: "180px", paddingBottom:"40px" }}>
                    <Grid item>
                      <Typography
                        style={{
                          fontSize: "35px",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {index + 1}) {choice.content}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      style={{ marginTop: "-43px", marginLeft: "200px" }}
                    >
                      <Radio
                        checked={correctAnswers.includes(choice.index)}
                        onChange={() => setCorrectAnswers([choice.index])}
                        inputProps={{ "aria-label": "A" }}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              );
            })}
            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>*/}
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
