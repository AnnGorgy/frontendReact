import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";
const QuestionShuffleSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
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
    transition: theme.transitions.create(['background-color', 'border']),
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

const UpdateQuiz = ({
  onClose,
  title,
  CurrentName,
  sDate,
  eDate,
  sTime,
  eTime,
  isOpened,
  durat,
  descr,
  CurrentchangeQuestionsOrder,
  onSubmit,
  classes,
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [ReloadQuiz, setReloadQuiz] = useState(true);
  const [ChangedName, setChangedName] = useState();
  const [ChangedDescription, setChangedDescription] = useState();
  const [goodStartDate, setGoodStartDate] = useState(false);
  const [goodEndDate, setGoodEndDate] = useState(false);
  const [ChangedDate, setChangedDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [ChangedTimePicker, setChangedTimePicker] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [ChangedDuration, setChangedDuration] = useState();
  const [
    UpdatedchangeQuestionsOrder,
    setUpdatedchangeQuestionsOrder,
  ] = useState();
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (ReloadQuiz) {
      setReloadQuiz(false);
    }
  }, [ReloadQuiz]);
  useEffect(() => {
    setUpdatedchangeQuestionsOrder(CurrentchangeQuestionsOrder);
  }, [CurrentchangeQuestionsOrder]);
  useEffect(() => {
    setChangedName(CurrentName);
  }, [CurrentName]);

  useEffect(() => {
    setChangedDescription(descr);
  }, [descr]);

  useEffect(() => {
    setChangedDescription(descr);
  }, [descr]);

  useEffect(() => {
    setChangedDuration(durat);
  }, [durat]);

  useEffect(() => {
    setChangedDate({ start: sDate, end: eDate });
  }, [sDate, eDate]);

  useEffect(() => {
    setChangedTimePicker({ start: sTime, end: eTime });
  }, [sTime, eTime]);

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
              {title}
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
                      value={ChangedName}
                      onChange={(e) => {
                        setChangedName(e.target.value);
                      }}
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
                    <Grid item>
                      {/* Dialog Duration */}
                      <TextField
                        label="Duration"
                        rows={1}
                        required
                        value={ChangedDuration}
                        onChange={(e) => {
                          setChangedDuration(e.target.value);
                        }}
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
                    </Grid>
                    <Grid
                      item
                      style={{ marginTop: "-60px", marginLeft: "300px" }}
                    >
                      <FormGroup>
                      <FormControlLabel  labelPlacement="start" label="Shuffle Questions"
        control={<QuestionShuffleSwitch  checked={shuffleQuestions.shuffled} onChange={handleChange} name="shuffled" />}
       
      />
      
                       
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {/* Dialog Description */}
                    <TextField
                      label="Descreiption"
                      rows={2}
                      multiline
                      fullWidth
                      value={ChangedDescription}
                      onChange={(e) => {
                        setChangedDescription(e.target.value);
                      }}
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
                            value={ChangedDate.start}
                            onChange={(ChangedDate) =>
                              setChangedDate((prev) => ({
                                ...prev,
                                start: ChangedDate,
                              }))
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
                            value={ChangedDate.end}
                            onChange={(ChangedDate) =>
                              setChangedDate((prev) => ({
                                ...prev,
                                end: ChangedDate,
                              }))
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
                            value={ChangedTimePicker.start}
                            onChange={(ChangedTimePicker) =>
                              setChangedTimePicker((prev) => ({
                                ...prev,
                                start: ChangedTimePicker,
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
                            value={ChangedTimePicker.end}
                            onChange={(ChangedTimePicker) =>
                              setChangedTimePicker((prev) => ({
                                ...prev,
                                end: ChangedTimePicker,
                              }))
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change time",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            onClose();
                          }}
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
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.createButton}
                          disabled={
                            ChangedName === "" || ChangedName == CurrentName
                          }
                          onClick={() => {
                            onSubmit({
                              ChangedName,
                              ChangedDate,
                              ChangedDescription,
                              ChangedDuration,
                              ChangedTimePicker,
                            });
                          }}
                        >
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
          </Grid>
        </Grid>
      </Dialog>
    )
  );
};

// Dialog styles
const styles = () => ({
  dialog: {
    padding: "10px 0px",
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
    minHeight: "30vh",
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

export default withStyles(styles)(UpdateQuiz);
