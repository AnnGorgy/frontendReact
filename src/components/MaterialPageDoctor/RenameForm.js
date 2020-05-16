import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const RenameForm = ({
  onClose,
  title,
  CurrentName,
  sDate,
  eDate,
  isOpened,
  onSubmit,
  hasDate,
  classes,
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [ChangedName, setChangedName] = useState("");
  const [RelodRename, setReloadRename] = useState(true);
  const [goodStartDate, setGoodStartDate] = useState(false);
  const [goodEndDate, setGoodEndDate] = useState(false);
  const [CurrentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (RelodRename) {
      setReloadRename(false);
    }
  }, [RelodRename]);

  useEffect(() => {
    setChangedName(CurrentName);
  }, [CurrentName]);

  useEffect(() => {
    setDate({ start: sDate, end: eDate });
  }, [sDate, eDate]);

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
                    <TextField
                      label="Another Name"
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
                      style={{ width: "350px" }}
                    />
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
                              onChange={(date) =>
                                setDate((prev) => ({ ...prev, start: date }))
                              }
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
                              onChange={(date) =>
                                setDate((prev) => ({ ...prev, end: date }))
                              }
                              onError={(bad) => setGoodEndDate(!bad)}
                              format="yyyy/MM/dd hh:mm a"
                              />
                          </MuiPickersUtilsProvider>
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
                            ChangedName == CurrentName ||
                            (hasDate &&
                              (!goodStartDate ||
                                !goodEndDate ||
                                date.start > date.end))
                          }
                          onClick={() => {
                            onSubmit({
                              ChangedName,
                              date,
                            });
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={
                              ChangedName === "" ||
                              ChangedName == CurrentName ||
                              (hasDate &&
                                (!goodStartDate ||
                                  !goodEndDate ||
                                  date.start > date.end))
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

export default withStyles(styles)(RenameForm);
