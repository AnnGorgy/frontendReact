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
  FormControlLabel,
  FormGroup,
  Switch,
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

const UpdateQuiz = ({
  onClose,
  title,
  CurrentName,
  sDate,
  eDate,
  numQuestions,
  isOpened,
  durat,
  descr,
  quizId,
  appearGrade,
  CurrentchangeQuestionsOrder,
  onSubmit,
  classes,
  match,
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [ReloadQuiz, setReloadQuiz] = useState(true);
  const [ChangedName, setChangedName] = useState("");
  const [ChangedDescription, setChangedDescription] = useState("");
  const [goodStartDate, setGoodStartDate] = useState(false);
  const [goodEndDate, setGoodEndDate] = useState(false);
  const [questionType, setQuestionType] = useState(false);
  const [ChangedDate, setChangedDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [NumberOfGroups, setNumberOfGroups] = useState([]);
  const [GradeAppear, setGradeAppear] = useState(false);
  const [ChangedDuration, setChangedDuration] = useState(0);
  const [CurrentDate, setCurrentDate] = useState(new Date());
  const [ChangednumberOfQues, setChangednumberOfQuestions] = useState(0);
  //----------------------------------------------------------------------------------------------------------

  const GetNumberOfGroups = async () => {
    const Url = `/DoctorMakeQuiz/GetQuizGroupsToupdate`;
    const { data } = await post(Url, null, {
      params: { subjectID: match.params.courseId, QuizID: quizId },
    });

    setNumberOfGroups(data);
  };

  const handleTotalGradeMethod = (value, CheckTitle) => {
    {
      setNumberOfGroups((prev) =>
        prev.map((choicee) =>
          choicee.number !== CheckTitle
            ? choicee
            : { ...choicee, choose: value }
        )
      );
    }
  };

  useEffect(() => {
    if (ReloadQuiz) {
      setReloadQuiz(false);
    }
  }, [ReloadQuiz]);

  useEffect(() => {
    setQuestionType(CurrentchangeQuestionsOrder);
  }, [CurrentchangeQuestionsOrder]);

  useEffect(() => {
    if (appearGrade) {
      setGradeAppear(appearGrade);
    }
  }, [appearGrade]);

  useEffect(() => {
    GetNumberOfGroups();
  }, [quizId, match.params.courseId]);

  useEffect(() => {
    setChangedName(CurrentName);
  }, [CurrentName]);

  useEffect(() => {
    if (numQuestions) {
      setChangednumberOfQuestions(numQuestions);
    }
  }, [numQuestions]);

  useEffect(() => {
    if (descr) {
      setChangedDescription(descr);
    }
  }, [descr]);

  useEffect(() => {
    setChangedDuration(durat);
  }, [durat]);

  useEffect(() => {
    setChangedDate({ start: sDate, end: eDate });
  }, [sDate, eDate]);

  const handleChange = () => {
    setQuestionType((prev) => !prev);
  };
  const handleChangeAppear = () => {
    setGradeAppear((prev) => !prev);
  };
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
                        style={{ width: "280px" }}
                      />
                    </Grid>
                    <Grid item>
                      {/* Dialog Number Of Questions */}
                      <TextField
                        label="Number Of Questions"
                        rows={1}
                        required
                        value={ChangednumberOfQues}
                        onChange={(e) => {
                          setChangednumberOfQuestions(
                            Number.parseInt(e.target.value)
                          );
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
                  <Grid item>
                    <Grid item>
                      {/* Dialog Duration */}
                      <TextField
                        label="Duration"
                        rows={1}
                        required
                        value={ChangedDuration}
                        onChange={(e) => {
                          setChangedDuration(Number.parseInt(e.target.value));
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
                            value={ChangedDate.start}
                            onChange={(ChangedDate) => {
                              setChangedDate((prev) => ({
                                ...prev,
                                start: ChangedDate,
                              }));
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
                            value={ChangedDate.end}
                            onChange={(ChangedDate) => {
                              setChangedDate((prev) => ({
                                ...prev,
                                end: ChangedDate,
                              }));
                              setCurrentDate(new Date());
                            }}
                            onError={(bad) => setGoodEndDate(!bad)}
                            format="yyyy/MM/dd hh:mm a"
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    style={{ marginTop: "30px", marginLeft: "-200px" }}
                  >
                    <Grid item style={{ marginLeft: "210px" }}>
                      <Typography style={{ fontSize: "25px" }}>
                        Groups :
                      </Typography>
                    </Grid>
                    <Grid item style={{ marginTop: "-40px" }}>
                      {NumberOfGroups?.map((choosee, index) => (
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
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            onClose();
                            setQuestionType(CurrentchangeQuestionsOrder);
                            setChangedName(CurrentName);
                            setChangednumberOfQuestions(numQuestions);
                            setChangedDuration(durat);
                            setChangedDate({ start: sDate, end: eDate });
                            setGradeAppear(appearGrade);
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
                            ChangedName === "" ||
                            ChangednumberOfQues === 0 ||
                            ChangedDuration === 0 ||
                            !goodStartDate ||
                            !goodEndDate ||
                            ChangedDate.start < CurrentDate ||
                            ChangedDate.end < CurrentDate ||
                            ChangedDate.start > ChangedDate.end ||
                            NumberOfGroups?.filter((x) => x.choose == false)
                              .length >= NumberOfGroups.length
                          }
                          onClick={() => {
                            onSubmit({
                              ChangedName,
                              ChangedDate,
                              ChangedDescription,
                              ChangedDuration,
                              questionType,
                              ChangednumberOfQues,
                              GradeAppear,
                              NumberOfGroups,
                            });
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={
                              ChangedName === "" ||
                              ChangednumberOfQues === 0 ||
                              ChangedDuration === 0 ||
                              !goodStartDate ||
                              !goodEndDate ||
                              ChangedDate.start < CurrentDate ||
                              ChangedDate.end < CurrentDate ||
                              ChangedDate.start > ChangedDate.end ||
                              NumberOfGroups?.filter((x) => x.choose == false)
                                .length >= NumberOfGroups.length
                                ? classes.createText
                                : classes.boldText
                            }
                          >
                            Update
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

export default withStyles(styles)(withRouter(UpdateQuiz));
