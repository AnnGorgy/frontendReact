import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  Button,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//-------------------------------------- Icons --------------------------------------------------------------
import HelpIcon from "@material-ui/icons/Help";
//----------------------------------------------------------------------------------------------------------

const DeleteConfirmDialog = ({ onClose, isOpened, onConfirm, classes }) => {
  return (
    isOpened && (
      <Dialog
        open={isOpened}
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
                      <HelpIcon style={{ width: "100px", height: "100px" }} />
                    </Grid>
                    <Grid
                      item
                      style={{ marginTop: "-75px", marginLeft: "120px" }}
                    >
                      <Typography variant="h3" style={{ fontSize: "25px" }}>
                        Are you sure you want to delete this item?
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      justify="flex-end"
                      spacing={1}
                      style={{ marginTop: "20px", marginLeft: "5px" }}
                    >
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.createButton}
                          onClick={() => onConfirm()}
                        >
                          <Typography variant="h6" className={classes.boldText}>
                            Ok
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => onClose()}
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
    minHeight: "auto",
    padding: "20px 0px",
    borderRadius: "32px",
    border: "8px transperant solid",
  },
  createButton: {
    height: "40px",
    width: "130px",
    borderRadius: "8px",
    border: "4px black solid",
  },
  cancelButton: {
    height: "40px",
    width: "130px",
    borderRadius: "8px",
    border: "4px red solid",
  },
  boldText: {
    fontWeight: "600",
  },
  createText: {
    color: "silver",
  },
});

export default withStyles(styles)(withRouter(DeleteConfirmDialog));
