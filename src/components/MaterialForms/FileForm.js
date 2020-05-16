import React, { useState } from "react";
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
//------------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component -----------------------------------
import { DragImport } from "../";
//------------------------------------------------------------------------------------------------------------

/* The dialog that appear in materials Page for "Files-Assignemnets-videos" */
const CreateFileForm = ({
  onClose,
  isOpened,
  title,
  onSubmit,
  hasDate,
  classes,
  videoExtension,
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [blobs, setBlobs] = useState([]);
  const [goodStartDate, setGoodStartDate] = useState(false);
  const [goodEndDate, setGoodEndDate] = useState(false);
  const [CurrentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  // ---------------------------------------------------------------------------------------------------------
  const onDropBlobs = (blobs) => {
    setBlobs([...blobs]);
  };

  const onDeleteBlob = () => {
    setBlobs([]);
  };

  //----- this function reset Dialogs when it opened "Clear all textboxs" + when we press a create button -----
  const resetStates = () => {
    setName("");
    setDescription("");
    setBlobs([]);
    setDate({ start: new Date(), end: new Date() });
    setGoodStartDate(false);
    setGoodEndDate(false);
  };
  //------------------------------------------------------------------------------------------------------------
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
                  {/* Dialog Name */}
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

                  {/* Dialog Description */}
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

                  {/* Upload Button */}
                  {videoExtension && (
                    <Grid item>
                      <DragImport
                        editable
                        video
                        Extension=".webm , .mkv , .flv , .vob , .ogv, .ogg , .drc , .gif , .gifv , .mng ,.avi, .MTS, .M2TS, .TS ,.mov, .qt,.wmv,.yuv,.rm,.rmvb,.asf,.amv,.m4v,.mp4, .m4p,.mpg, .mp2, .mpeg, .mpe, .mpv,.mpg, .mpeg, .m2v,.m4v,.svi,.3gp,.3g2,.mxf,.roq,.nsv,.flv, .f4v ,.f4p ,.f4a ,.f4b"
                        blobs={blobs}
                        onDrop={onDropBlobs}
                        onDeleteBlob={onDeleteBlob}
                      />
                    </Grid>
                  )}
                  {!videoExtension && (
                    <Grid item>
                      <DragImport
                        editable
                        blobs={blobs}
                        onDrop={onDropBlobs}
                        onDeleteBlob={onDeleteBlob}
                      />
                    </Grid>
                  )}

                  {/*Start Date && End Date That will appear only when we deal with Assignemnets Dialog */}
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
                      {/* Dialog Cancel Button */}
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

                      {/* Dialog Create Button */}
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.createButton}
                          disabled={
                            blobs.length !== 1 ||
                            name === "" ||
                            (hasDate &&
                              (!goodStartDate ||
                                !goodEndDate ||
                                date.start < CurrentDate ||
                                date.end < CurrentDate ||
                                date.start > date.end))
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
                              (hasDate &&
                                (!goodStartDate ||
                                  !goodEndDate ||
                                  date.start < CurrentDate ||
                                  date.end < CurrentDate ||
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

CreateFileForm.defaultProps = {
  hasDate: false,
  isLink: false,
};

/* Dialog styles */
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

export default withStyles(styles)(CreateFileForm);
