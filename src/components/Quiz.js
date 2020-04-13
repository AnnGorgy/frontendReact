import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import Tooltip from "@material-ui/core/Tooltip";
//------------------------------------------------- Icons --------------------------------------------------
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
//-----------------------------------------------------------------------------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const Quiz = ({ onClose, isOpened, title, match, onSubmit, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------   const [name, setName] = useState(ViewingName);

  const [reloadProfile, setReloadProfile] = useState(true);
  const [Name, setName] = useState();
  const [Description,setDescription] = useState();
  const [TotalGrade, setTotalGrade] = useState();
  const [goodStartDate, setGoodStartDate] = useState(false);
  const [goodEndDate, setGoodEndDate] = useState(false);
  const [date, setDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [TimePicker, setTimePicker] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [Duration, setDuration] = useState();

  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (reloadProfile) {
      setReloadProfile(false);
    }
  }, [reloadProfile]);

  return (
    isOpened && (
      <Dialog
        onClose={() => {
          onClose();
        }}
        open={isOpened}
        maxWidth="sm"
        fullWidth
        PaperProps={{ className: classes.dialogPaper }}
      >
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justify="center"
          className={classes.dialog}
        >
          <Grid item className={classes.titleContainer}>
            <Typography
              variant="h3"
              className={classes.boldText}
              align="center"
            >
              Create Online Quiz
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify="space-around">
              <Grid item xs={11}>
                <Grid
                  container
                  direction="column"
                  alignItems="stretch"
                  justify="center"
                  spacing={3}
                >
                  <Grid item>
                    {/* Dialog Quiz Name */}
                    <TextField
                      label="Quiz Name"
                      rows={1}
                      value={Name}
                      required
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
                      style={{ width: "280px", marginLeft: "130px" }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container justify="space-between">
                      <Grid item xs={5}>
                        {/* Dialog Total Grade */}
                        <TextField
                          label="Total Grade"
                          rows={1}
                          required
                          value={TotalGrade}
                          type="number"
                          variant="outlined"
                          classes={{
                            root: classes.textFieldRoot,
                          }}
                          InputProps={{
                            classes: {
                              notchedOutline: classes.notchedOutline,
                              className: classes.multilineColor,
                            },
                          }}
                          InputLabelProps={{
                            classes: {
                              root: classes.label,
                            },
                          }}
                          style={{ width: "230px", color: "black" }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        {/* Dialog Duration */}
                        <TextField
                          label="Duration"
                          rows={1}
                          required
                          value={Duration}
                          type="number"
                          placeholder="Min"
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
                          style={{ width: "230px" }}
                        />
                        {/*  <NumberInput
                          id="Duration"
                          value={""}
                          required
                          defaultValue={10}
                          min={0}
                          max={1000}
                          strategy="warn"
                          errorText={"zfT 3la dma8k da5l al rakm s7"}
                        /> */}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {/* Dialog Description */}
                    <TextField
                      label="Descreiption"
                      rows={2}
                      multiline
                      fullWidth
                      value={Description}
                      required
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
                     /*  style={{ width: "280px", marginLeft: "130px" }} */
                    />
                  </Grid>
                  <Grid item>
                    <Grid container justify="space-between">
                      <Grid item xs={5}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            required
                            clearable
                            autoOk
                            label="Start Date"
                            inputVariant="standard"
                            value={date.start}
                            onChange={(date) =>
                              setDate((prev) => ({ ...prev, start: date }))
                            }
                            onError={(bad) => setGoodStartDate(!bad)}
                            format="MM/dd/yyyy"
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={5}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            required
                            clearable
                            autoOk
                            label="End Date"
                            value={date.end}
                            onChange={(date) =>
                              setDate((prev) => ({ ...prev, end: date }))
                            }
                            onError={(bad) => setGoodEndDate(!bad)}
                            format="MM/dd/yyyy"
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justify="space-between">
                      <Grid item xs={5}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            required
                            margin="normal"
                            id="time-picker"
                            label="Start Time"
                            value={TimePicker.start}
                            onChange={(TimePicker) =>
                              setDate((prev) => ({
                                ...prev,
                                start: TimePicker,
                              }))
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change time",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>

                      <Grid item xs={5}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            required
                            margin="normal"
                            id="time-picker"
                            label="End Time"
                            value={TimePicker.end}
                            onChange={(TimePicker) =>
                              setDate((prev) => ({ ...prev, end: TimePicker }))
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change time",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justify="flex-end" spacing={1}>
                  {/* Close Button */}
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={onClose}
                        >
                          <Typography
                            variant="h6"
                            className={classes.boldText}
                            color="error"
                          >
                            Close
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Create Button */}
                  <Grid item>
                    <Button variant="outlined" className={classes.createButton}>
                      <Typography variant="h6" className={classes.boldText}>
                        Create
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    )
  );
};

// Dialog styles
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
    marginTop: "10px",
  },
  cancelButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px red solid",
    marginTop: "10px",
  },
  boldText: {
    fontWeight: "600",
  },
  createText: {
    color: "silver",
  },
});

export default withStyles(styles)(Quiz);
