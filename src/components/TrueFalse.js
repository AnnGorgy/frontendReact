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
  const [inputList, setInputList] = useState([
    { Choice1: "true", Choice2: "false" },
  ]);

  const [selectedValue, setSelectedValue] = React.useState("0");

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
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
            width:"1257px"
          }}
        >
          <Grid>
            <TextField
              label="Enter The Title Of The Question"
              name="Title"
              variant="outlined"
              defaultValue="Choose True Or False"
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
              label="Enter Your Question"
              name="Question"
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

          <Grid className="App">
            {inputList.map((x, i) => {
              return (
                <React.Fragment>
                  <div>
                    <TextField
                      label="Choice 1"
                      name="Choice 1"
                      value={x.Choice1}
                      disabled="true"
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
                      style={{ width: "350px", marginLeft: "285px" }}
                    />

                    <Radio
                      style={{ marginTop: "20px" }}
                      checked={selectedValue == i}
                      onChange={handleChangeRadio}
                      value={i}
                      name="Single_Choice"
                      inputProps={{ "aria-label": "A" }}
                    />
                  </div>
                  <div>
                    <TextField
                      label="Choice 2"
                      name="Choice 2"
                      value={x.Choice2}
                      disabled="true"
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
                      style={{ width: "350px", marginLeft: "285px" }}
                    />

                    <Radio
                      style={{ marginTop: "20px" }}
                      checked={selectedValue == i}
                      onChange={handleChangeRadio}
                      value={i}
                      name="Single_Choice"
                      inputProps={{ "aria-label": "A" }}
                    />
                  </div>
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
