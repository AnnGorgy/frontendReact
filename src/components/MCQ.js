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

const MCQ = ({ classes }) => {
  const [inputList, setInputList] = useState([{ Choice: "" }]);
  const [state, setState] = useState({
    checkedA: true,
  });

  const [selectedValue, setSelectedValue] = React.useState("0");

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
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

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { Choice: "" }]);
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
              label="Enter title of the Question"
              name="Title"
              variant="outlined"
              defaultValue="Choose the correct answer from the following"
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
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                    />
                  </Grid>
                  <Grid item>Single Choice</Grid>
                </Grid>
              </Typography>
            </FormGroup>
          </Grid>

          <Grid className="App">
            {inputList.map((x, i) => {
              return (
                <div className="box">
                  <TextField
                    label="Enter Your Choice"
                    name="Choice"
                    value={x.Choice}
                    onChange={(e) => {
                      handleInputChange(e, i);
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
                  {state.checkedA ? (
                    <Checkbox
                      style={{ marginTop: "20px" }}
                      inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                    />
                  ) : (
                    <Radio
                      style={{ marginTop: "20px" }}
                      checked={selectedValue == i}
                      onChange={handleChangeRadio}
                      value={i}
                      name="Single_Choice"
                      inputProps={{ "aria-label": "A" }}
                    />
                  )}

                  {inputList.length - 1 === i && inputList.length - 1 !== 3 && (
                    <Tooltip title="Add" placement="bottom">
                      <Button style={{ marginTop: "20px", marginLeft: "3px" }}>
                        <AddCircleIcon onClick={handleAddClick} />
                      </Button>
                    </Tooltip>
                  )}
                  {inputList.length !== 1 && (
                    <Tooltip title="Delete" placement="bottom">
                      <Button style={{ marginTop: "20px" }}>
                        <DeleteIcon onClick={() => handleRemoveClick(i)} />
                      </Button>
                    </Tooltip>
                  )}
                </div>
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

export default withStyles(styles)(MCQ);
