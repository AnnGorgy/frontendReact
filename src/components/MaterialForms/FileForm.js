import React, { useState } from "react";

import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import { DragImport } from "../";

const CreateFileForm = ({
  onClose,
  isOpened,
  title,
  onSubmit,
  hasDate,
  classes
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [blobs, setBlobs] = useState([]);
  const [goodStartDate, setGoodStartDate] = useState(false);
  const [goodEndDate, setGoodEndDate] = useState(false);
  const [date, setDate] = useState({
    start: new Date("01/01/2020"),
    end: new Date("01/01/2020")
  });

  const onDropBlobs = blobs => {
    setBlobs([...blobs]);
  };

  const onDeleteBlob = () => {
    setBlobs([]);
  };

  const resetStates = () => {
    setName("");
    setDescription("");
    setBlobs([]);
    setDate({ start: new Date("01/01/2020"), end: new Date("01/01/2020") });
    setGoodStartDate(false);
    setGoodEndDate(false);
  };

  return (
    isOpened && (
      <Dialog
        onClose={() => {
          resetStates();
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
                      label="Name"
                      fullWidth
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
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
                    <TextField
                      label={"Description"}
                      fullWidth
                      multiline
                      rows={3}
                      value={description}
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
                    <DragImport
                      editable
                      blobs={blobs}
                      onDrop={onDropBlobs}
                      onDeleteBlob={onDeleteBlob}
                    />
                  </Grid>
                  {hasDate && (
                    <Grid item>
                      <Grid container justify="space-between">
                        <Grid item xs={5}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
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
                  )}
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            resetStates();
                            onClose();
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={classes.boldText}
                            color="error"
                          >
                            Cancel
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.createButton}
                          disabled={
                            blobs.length !== 1 ||
                            name === "" ||
                            (hasDate && (!goodStartDate || !goodEndDate))
                          }
                          onClick={() => {
                            resetStates();
                            onSubmit({
                              blobs: blobs[0],
                              name,
                              description,
                              date,
                            });
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={
                              blobs.length !== 1 ||
                              name === "" ||
                              (hasDate && (!goodStartDate || !goodEndDate))
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

CreateFileForm.defaultProps = {
  hasDate: false,
  isLink: false
};

const styles = () => ({
  dialog: {
    padding: "10px 0px"
  },
  titleContainer: {
    marginBottom: "18px"
  },
  textFieldRoot: {
    backgroundColor: "white",
    borderRadius: "7px"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `black !important`
  },
  label: {
    color: "black !important",
    fontWeight: "600"
  },
  dialogPaper: {
    minHeight: "50vh",
    padding: "20px 0px"
  },
  createButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px black solid"
  },
  cancelButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px red solid"
  },
  boldText: {
    fontWeight: "600"
  },
  createText: {
    color: "silver"
  }
});

export default withStyles(styles)(CreateFileForm);
