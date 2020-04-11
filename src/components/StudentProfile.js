import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import Tooltip from "@material-ui/core/Tooltip";

//------------------------------------------------- Icons --------------------------------------------------
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
//-----------------------------------------------------------------------------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";

const StudentProfilePage = ({
  onClose,
  isOpened,
  title,
  match,
  onSubmit,
  classes,
}) => {


  // Set The First Letter Of The Users' Name To capial // 
  const EnglishName = (JSON.parse(localStorage.getItem("Information")).NameEN);
  const ViewingName = EnglishName.charAt(0).toUpperCase() + EnName.substring(1);

  // ---------------------------- variables with it's states that we use it in this Dialog ------------------- 
  const EnName = (ViewingName);
  const LoginEmail = (JSON.parse(localStorage.getItem("Information")).Email);
  const Seatno = (JSON.parse(localStorage.getItem("Information")).SeatNo);
  const ArName = (JSON.parse(localStorage.getItem("Information")).NameAR);
  const semester = (JSON.parse(localStorage.getItem("Information")).Semester);
  const AccountTypeName = "Student Account";
  const [reloadProfile, setReloadProfile] = useState(true);
  //----------------------------------------------------------------------------------------------------------


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
              Profile
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
                    {/* Dialog Account Type */}
                    <TextField
                      label="Account Type"
                      multiline
                      rows={1}
                      value={AccountTypeName}
                      disabled="true"
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
                  <Grid item>
                    {/* Dialog Department */}
                    <TextField
                      label="Department"
                      multiline
                      rows={1}
                      value={LoginEmail}
                      disabled="true"
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                          className: classes.multilineColor,
                        },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                      style={{ width: "350px", color: "black" }}
                    /> </Grid>
                  <Grid item>
                    {/* Dialog Arabic Name */}
                    <TextField
                      label="Name in Arabic"
                      multiline
                      rows={1}
                      value={ArName}
                      disabled="true"
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
                    /> </Grid>
                  <Grid item>
                    {/* Dialog English Name */}
                    <TextField
                      label="Name in English"
                      multiline
                      rows={1}
                      value={EnName}
                      disabled="true"
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
                    /> </Grid>
                  <Grid item>
                    {/* Dialog E-mail */}
                    <TextField
                      label="Email"
                      multiline
                      rows={1}
                      value={LoginEmail}
                      disabled="true"
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                          className: classes.multilineColor,
                        },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                      style={{ width: "350px", color: "black" }}
                    /> </Grid>
                  <Grid item>
                    {/* Dialog Seat Number */}
                    <TextField
                      label="Seat Number"
                      multiline
                      rows={1}
                      value={Seatno}
                      disabled="true"
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
                  <Grid item>
                    {/* Dialog Semester */}
                    <TextField
                      label="Semester"
                      multiline
                      rows={1}
                      value={semester}
                      disabled="true"
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
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={onClose}
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
const styles = theme => ({
  dialog: {
    padding: "10px 0px",
  },
  multilineColor: {
    color: 'red'
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

export default withStyles(styles)(StudentProfilePage);
