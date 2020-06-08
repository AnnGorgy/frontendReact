import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button,
  Checkbox,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const RenameForm = ({
  onClose,
  title,
  CurrentName,
  currentTotalGrade,
  sDate,
  eDate,
  isOpened,
  onSubmit,
  assignmentId,
  hasDate,
  classes,
  match,
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [ChangedName, setChangedName] = useState("");
  const [RelodRename, setReloadRename] = useState(true);
  const [goodStartDate, setGoodStartDate] = useState(false);
  const [goodEndDate, setGoodEndDate] = useState(false);
  const [date, setDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [NumberOfGroups, setNumberOfGroups] = useState([]);
  const [TotalGradee, setTotalGrade] = useState(0);
  const [CurrentDate, setCurrentDate] = useState(new Date());
  //----------------------------------------------------------------------------------------------------------

  const GetNumberOfGroups = async () => {
    const Url = `/assignment/GetAssignmentGroupsToupdate`;
    const { data } = await post(Url, null, {
      params: { subjectID: match.params.courseId, AssignmentID: assignmentId },
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
    if (RelodRename) {
      setReloadRename(false);
    }
  }, [RelodRename]);

  useEffect(() => {
    if (assignmentId) {
      GetNumberOfGroups();
    }
  }, [assignmentId, match.params.courseId]);

  useEffect(() => {
    if (currentTotalGrade) {
      setTotalGrade(currentTotalGrade);
    }
  }, [currentTotalGrade]);

  useEffect(() => {
    setChangedName(CurrentName);
  }, [CurrentName]);

  useEffect(() => {
    setDate({ start: sDate, end: eDate });
  }, [sDate, eDate]);

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
                      <TextField
                        label="Name"
                        rows={2}
                        defaultValue={ChangedName}
                        onChange={(e) => {
                          setChangedName(e.target.value);
                        }}
                        value={ChangedName}
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
                        style={{ width: "330px" }}
                      />
                    </Grid>
                    {hasDate && (
                      <Grid
                        item
                        style={{ marginTop: "-58px", marginLeft: "350px" }}
                      >
                        <TextField
                          label="Total Grade"
                          value={TotalGradee}
                          type="number"
                          onChange={(e) => {
                            setTotalGrade(Number.parseInt(e.target.value));
                          }}
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
                        />
                      </Grid>
                    )}
                  </Grid>
                  {/*Start Date && End Date That will appear only when we deal with Assignemnet only */}
                  {hasDate && (
                    <Grid item>
                      <Grid container justify="space-between">
                        <Grid item xs={5}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                              clearable
                              autoOk
                              label="Start Date"
                              inputVariant="standard"
                              value={date.start}
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
                          {NumberOfGroups.map((choosee, index) => (
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
                                style={{
                                  marginTop: "-41px",
                                  marginLeft: "40px",
                                }}
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
                    </Grid>
                  )}
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            onClose();
                            setChangedName(CurrentName);
                            setDate({ start: sDate, end: eDate });
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
                            (hasDate &&
                              (!goodStartDate ||
                                TotalGradee === 0 ||
                                NumberOfGroups?.filter((x) => x.choose == false)
                                  .length >= NumberOfGroups.length ||
                                date.start < CurrentDate ||
                                date.end < CurrentDate ||
                                !goodEndDate ||
                                date.start > date.end))
                          }
                          onClick={() => {
                            onSubmit({
                              ChangedName,
                              date,
                              NumberOfGroups,
                              TotalGradee,
                            });
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={
                              ChangedName === "" ||
                              (hasDate &&
                                (!goodStartDate ||
                                  !goodEndDate ||
                                  date.start > date.end ||
                                  TotalGradee === 0 ||
                                  date.start < CurrentDate ||
                                  date.end < CurrentDate ||
                                  NumberOfGroups?.filter(
                                    (x) => x.choose == false
                                  ).length >= NumberOfGroups.length))
                                ? classes.createText
                                : classes.boldText
                            }
                          >
                            Edit
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

RenameForm.defaultProps = {
  hasDate: false,
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
    minHeight: "25vh",
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

export default withStyles(styles)(withRouter(RenameForm));
