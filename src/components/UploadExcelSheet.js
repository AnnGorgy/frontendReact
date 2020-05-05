import React, { useState } from "react";

import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  Button,
} from "@material-ui/core";

import { DragImport } from "./";

/* The dialog that appear in materials Page for "Files-Assignemnets-videos" */
const UploadExcelSheet = ({ onClose, isOpened, title, onSubmit, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [blobs, setBlobs] = useState([]);
  // ---------------------------------------------------------------------------------------------------------
  const onDropBlobs = (blobs) => {
    setBlobs([...blobs]);
  };

  const onDeleteBlob = () => {
    setBlobs([]);
  };

  /* this function reset Dialogs when it opened "Clear all textboxs" + when we press a create button */
  const resetStates = () => {
    setBlobs([]);
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
                  {/* Upload Button */}
                  <Grid item>
                    <DragImport
                      Extension=".xls ,.xlsx"
                      editable
                      blobs={blobs}
                      onDrop={onDropBlobs}
                      onDeleteBlob={onDeleteBlob}
                    />
                  </Grid>
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
                          disabled={blobs.length !== 1}
                          onClick={() => {
                            resetStates();
                            onSubmit({
                              blobs: blobs[0],
                            });
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={
                              blobs.length !== 1
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
          </Grid>
        </Grid>
      </Dialog>
    )
  );
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

export default withStyles(styles)(UploadExcelSheet);
