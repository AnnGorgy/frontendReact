import React, { useState, useEffect } from "react";
import { DragImport } from "../";

import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";

const UploadAssignmentAnswers = ({ onClose, isOpened, onSubmit, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------   const [name, setName] = useState(ViewingName);

  const [reloadProfile, setReloadProfile] = useState(true);
  const [AssName, setName] = useState();
  const [blobs, setBlobs] = useState([]);

  //----------------------------------------------------------------------------------------------------------

  const resetStates = () => {
    setName("");
  };

  const onDropBlobs = (blobs) => {
    setBlobs([...blobs]);
  };

  const onDeleteBlob = () => {
    setBlobs([]);
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
              Upload Assignment
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
                  <Grid item style={{ marginTop: "20px" }}>
                    {/* Dialog Assignment Name */}
                    <TextField
                      label="Assignment Name"
                      rows={1}
                      fullWidth
                      value={AssName}
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
                    />
                  </Grid>
                  {/* The File That will be add "Button" */}
                  <Grid item>
                    <DragImport
                      editable
                      blobs={blobs}
                      onDrop={onDropBlobs}
                      onDeleteBlob={onDeleteBlob}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="flex-end"
                  spacing={1}
                  style={{ marginTop: "20px" }}
                >
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
                  {/* Upload Button */}
                  <Grid item>
                    <Button
                      variant="outlined"
                      className={classes.createButton}
                      onClick={() => {
                        resetStates();
                        onSubmit({
                          AssName,
                          blobs: blobs[0],
                        });
                      }}
                      disabled={blobs.length !== 1 || AssName === ""}
                    >
                      <Typography
                        variant="h6"
                        className={
                          blobs.length !== 1 || AssName === ""
                            ? classes.createText
                            : classes.boldText
                        }
                      >
                        Upload
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
    minHeight: "40vh",
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

export default withStyles(styles)(UploadAssignmentAnswers);
