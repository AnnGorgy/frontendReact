import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { withRouter } from "react-router-dom";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { post } from "axios";
//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const QuestionShuffleSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,

      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
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
    transition: theme.transitions.create(["background-color", "border"]),
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

const MakeQuizForm = ({ onClose, isOpened, onSubmit, classes, match }) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [reloadProfile, setReloadProfile] = useState(true);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [goodStartDate, setGoodStartDate] = useState(false);
  const [goodEndDate, setGoodEndDate] = useState(false);
  const [questionType, setQuestionType] = useState(false);
  const [GradeAppear, setGradeAppear] = useState(false);
  const [numberOfQues, setnumberOfQuestions] = useState(0);
  const [Duration, setDuration] = useState(0);
  const [CurrentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [num, setNum] = useState([]);
  //----------------------------------------------------------------------------------------------------------

  const handleChange = () => {
    setQuestionType((prev) => !prev);
  };
  const handleChangeAppear = () => {
    setGradeAppear((prev) => !prev);
  };
  const resetStates = () => {
    setName("");
    setDescription("");
    setDate({ start: new Date(), end: new Date() });
    setDuration(0);
    setnumberOfQuestions(0);
    setGoodStartDate(false);
    setGoodEndDate(false);
    setQuestionType(false);
    setGradeAppear(false);
  };
  // -------------------------------------------------- api Calls ------------------------------------------
  const GetNumberOfGroups = async () => {
    const Url = `/DoctorManagestudentsGroups/StudentGroups`;
    const { data } = await post(Url, null, {
      params: { SubjectID: match.params.courseId },
    });

    setNum(data);
  };
  //----------------------------------------------------------------------------------------------------------

  const handleTotalGradeMethod = (value, CheckTitle) => {
    {
      setNum((prev) =>
        prev.map((choicee) =>
          choicee.number !== CheckTitle
            ? choicee
            : { ...choicee, choose: value }
        )
      );
    }
  };

  useEffect(() => {
    GetNumberOfGroups();
  }, []);

  useEffect(() => {
    if (reloadProfile) {
      setReloadProfile(false);
    }
  }, [reloadProfile]);

  return (
    isOpened && (
      <Dialog
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
                        style={{ width: "280px" }}
                      />
                    </Grid>
                    <Grid item>
                      {/* Dialog Number Of Questions */}
                      <TextField
                        label="Number Of Questions"
                        value={numberOfQues}
                        type="number"
                        required
                        variant="outlined"
                        onChange={(e) => {
                          setnumberOfQuestions(Number.parseInt(e.target.value));
                        }}
                        classes={{
                          root: classes.textFieldRoot,
                        }}
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline,
                          },
                          inputProps: {
                            min: 0,
                          },
                        }}
                        InputLabelProps={{
                          classes: {
                            root: classes.label,
                          },
                        }}
                        style={{
                          width: "230px",
                          marginTop: "-59px",
                          marginLeft: "320px",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: "-15px" }}>
                    <Grid item>
                      {/* Dialog Duration */}
                      <TextField
                        label="Duration (Min)"
                        required
                        value={Duration}
                        type="number"
                        variant="outlined"
                        onChange={(e) => {
                          setDuration(Number.parseInt(e.target.value));
                        }}
                        classes={{
                          root: classes.textFieldRoot,
                        }}
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline,
                          },
                          inputProps: {
                            min: 0,
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
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel
                            labelPlacement="start"
                            label="Shuffle Questions"
                            control={
                              <QuestionShuffleSwitch
                                checked={questionType}
                                onChange={handleChange}
                              />
                            }
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel
                            labelPlacement="start"
                            label="Show Grade"
                            control={
                              <QuestionShuffleSwitch
                                checked={GradeAppear}
                                onChange={handleChangeAppear}
                              />
                            }
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: "20px" }}>
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
                    />
                  </Grid>
                  <Grid item>
                    <Grid container justify="space-between">
                      <Grid item xs={5}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDateTimePicker
                            required
                            clearable
                            autoOk
                            label="Start Date"
                            inputVariant="standard"
                            value={date.start}
                            onChange={(e) => {
                              setDate(e.target.value);
                            }}
                            onChange={(date) => {
                              setDate((prev) => ({ ...prev, start: date }));
                              setCurrentDate(new Date());
                            }}
                            onError={(bad) => setGoodStartDate(!bad)}
                            format="yyyy/MM/dd hh:mm a"
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={5}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDateTimePicker
                            required
                            clearable
                            autoOk
                            label="End Date"
                            value={date.end}
                            onChange={(date) => {
                              setDate((prev) => ({ ...prev, end: date }));
                              setCurrentDate(new Date());
                            }}
                            onError={(bad) => setGoodEndDate(!bad)}
                            format="yyyy/MM/dd hh:mm a"
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ marginTop: "30px", marginLeft: "-200px" }}>
                  <Grid item style={{ marginLeft: "210px" }}>
                    <Typography style={{ fontSize: "25px" }}>
                      Groups :
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "-40px" }}>
                    {num.map((choosee, index) => (
                      <Grid
                        item
                        style={
                          index % 2
                            ? { marginLeft: "500px", marginTop: "-38px" }
                            : { marginLeft: "350px", marginTop: "5px" }
                        }
                      >
                        <Grid item>
                          <Typography style={{ fontSize: "25px" }}>
                            {choosee.number}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          style={{ marginTop: "-41px", marginLeft: "40px" }}
                        >
                          <Checkbox
                            inputProps={{
                              "aria-label": "uncontrolled-checkbox",
                            }}
                            checked={choosee.choose}
                            classes={{
                              root: classes.check,
                              checked: classes.checked,
                            }}
                            onChange={(e) => {
                              handleTotalGradeMethod(
                                e.target.checked,
                                choosee.number
                              );
                            }}
                          />
                        </Grid>
                      </Grid>
                    ))}
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
                      disabled={
                        Name === "" ||
                        !goodStartDate ||
                        !goodEndDate ||
                        date.start < CurrentDate ||
                        date.end < CurrentDate ||
                        numberOfQues === 0 ||
                        Duration === 0 ||
                        date.start > date.end ||
                        num?.filter((x) => x.choose == false).length >=
                          num.length
                      }
                      onClick={() => {
                        resetStates();
                        localStorage.setItem("numberOfQuestions", numberOfQues);
                        localStorage.setItem("QuizName", Name);
                        onSubmit({
                          Name,
                          Description,
                          date,
                          Duration,
                          questionType,
                          GradeAppear,
                          numberOfQues,
                          num,
                        });
                      }}
                    >
                      <Typography
                        variant="h6"
                        className={
                          Name === "" ||
                          !goodStartDate ||
                          !goodEndDate ||
                          date.start < CurrentDate ||
                          date.end < CurrentDate ||
                          numberOfQues === 0 ||
                          Duration === 0 ||
                          date.start > date.end ||
                          num?.filter((x) => x.choose == false).length >=
                            num.length
                            ? classes.createText
                            : classes.boldText
                        }
                      >
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
    minHeight: "auto",
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
  check: {
    "&$checked": {
      color: "#0e7c61",
    },
  },
  checked: {},
});

export default withStyles(styles)(withRouter(MakeQuizForm));
