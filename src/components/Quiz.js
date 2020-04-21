import React, { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from '@material-ui/core/FormControlLabel';
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


const Quiz = ({ onClose, isOpened, match, onSubmit, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------   const [name, setName] = useState(ViewingName);

  const [reloadProfile, setReloadProfile] = useState(true);
  const [Name, setName] = useState();
  const [Description, setDescription] = useState();
  const [TotalGrade, setTotalGrade] = useState();
  const [goodStartDate, setGoodStartDate] = useState(false);
  const [goodEndDate, setGoodEndDate] = useState(false);
  const [shuffleQuestions, setShuffleQuestions] = useState({
    shuffled: false,
  });
  const [changeQuestionsOrder, setchangeQuestionsOrder] = useState(false);

  const [date, setDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [TimePicker, setTimePicker] = useState({
    start: new Date(),
    end: new Date(),
  });
  const handleChange = (event) => {
    setShuffleQuestions({
      ...shuffleQuestions,
      [event.target.name]: event.target.checked,
    });
  };
  const fillShuffle = (event) => {
   
   shuffleQuestions.shuffled===true ? setchangeQuestionsOrder(false): setchangeQuestionsOrder(true);
    
     
  };
  const [Duration, setDuration] = useState();

  //----------------------------------------------------------------------------------------------------------

  const resetStates = () => {
    setName("");
    setDescription("");
    setDate({ start: new Date(), end: new Date() });
    setTimePicker({ start: new Date(), end: new Date() });
    setDuration("");
    setGoodStartDate(false);
    setGoodEndDate(false);
    setShuffleQuestions(false);
    setchangeQuestionsOrder(false);
  };

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
          resetStates();
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
                      onChange={(e) => {
                        setName(e.target.value);
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
                        value={Duration}
                        onChange={(e) => {
                          setDuration(e.target.value);
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
                      label="Description"
                      rows={2}
                      multiline
                      fullWidth
                      value={Description}
                      onChange={(e) => {
                        setDescription(e.target.value);
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
                            value={date.start}
                            onChange={(e) => {
                              setDate(e.target.value);
                            }}
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
                              setTimePicker((prev) => ({
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
                              setTimePicker((prev) => ({
                                ...prev,
                                end: TimePicker,
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
                </Grid>
                <Grid container justify="flex-end" spacing={1}>
                  {/* Close Button */}
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            onClose();
                            resetStates();
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
                    </Grid>
                  </Grid>
                  {/* Create Button */}
                  <Grid item>
                    <Button
                      variant="outlined"
                      className={classes.createButton}
                      onClick={() => {
                        resetStates();
                        fillShuffle();
                        onSubmit({
                          Name,
                          Description,
                          date,
                          TimePicker,
                          Duration,
                          changeQuestionsOrder
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
