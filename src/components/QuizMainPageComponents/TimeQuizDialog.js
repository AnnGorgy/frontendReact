import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";

import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  Button,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const TimeQuizDialog = ({
  onClose,
  title,
  sTime,
  eTime,
  isOpened,
  classes,
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [TimePicker, setTimePicker] = useState({
    start: new Date(),
    end: new Date(),
  });
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setTimePicker({ start: sTime, end: eTime });
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
                    <Grid container justify="space-between">
                      <Grid item xs={5}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            required
                            margin="normal"
                            id="time-picker"
                            label="Start Time"
                            disabled="true"
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
                            disabled="true"
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

export default withStyles(styles)(TimeQuizDialog);
