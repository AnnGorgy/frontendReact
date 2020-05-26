import React, { useState, useEffect } from "react";
import { post, get } from "axios";

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

const DoctorProfilePage = ({ onClose, isOpened, classes,  }) => {
  // Set The First Letter Of The Users' Name To capial //
  const [EnName, setEnName] = useState("");
  const ViewingName = EnName.charAt(0).toUpperCase() + EnName.substring(1);

  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [OfficeHours, setOfficeHours] = useState("");
  const [Email, setEmail] = useState("");
  const [LoginEmail, setLoginEmail] = useState("");
  const [ArName, setArName] = useState("");
  //----------------------------------------------------------------------------------------------------------

  const resetStates = () => {
    setEmail(Email);
    setOfficeHours(OfficeHours);
  };

  // -------------------------------------------- API Calls ------------------------------------------------
  const ViewData = async ({ callback }) => {
    const url = "/Office_Hours/Get_Instructor_data";
    try {
      // post syntax (url, body, options)
      const { data } = await post(url, null, {
        params: {
          Doc_id:  localStorage.getItem("DoctorAccountID") ,
        },
      });
      if (callback) callback();
      setEmail(data[0].email);
      setOfficeHours(data[0].office);
    } catch (err) {
      console.error(err);
    }
  };
  //-------------------------------------------------------------------------------------------------------
  const DoctorInformation = async () => {
    try {
      const url = "/Login/getuserObject";
      const { data } = await get(url, {
        params: {
          email: localStorage.getItem("DoctorEmail"),
        },
      });
      setLoginEmail(data.Email);
      setArName(data.NameAR);
      setEnName(data.NameEN);
    } catch (err) {
      console.error(err);
    }
  };
  //-----------------------------------------------------------------------------------------------------
  useEffect(() => {
      ViewData({});
      DoctorInformation();
  }, []);


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
              Doctor's Profile
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
                    {/* Dialog Name */}
                    <TextField
                      label="Name"
                      multiline
                      rows={1}
                      value={ViewingName}
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
                      className={classes.TextFieldInfo}
                    />
                  </Grid>
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
                      className={classes.TextFieldInfo}
                    />
                  </Grid>
                  <Grid item>
                    {/* Dialog E-mail */}
                    <TextField
                      label="E-mail"
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
                        },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                      className={classes.TextFieldInfo}
                    />
                  </Grid>

                  <Grid item>
                    {/* Dialog Additional E-mail */}
                    <TextField
                      label="Additional E-mail"
                      multiline
                      rows={1}
                      value={Email}
                      disabled="true"
                      onChange={(e) => {
                        setEmail(e.target.value);
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
                      className={classes.TextFieldInfo}
                    />
                  </Grid>

                  <Grid item>
                    {/* Dialog Office Hours */}
                    <TextField
                      label="Office Hours"
                      multiline
                      rows={2}
                      value={OfficeHours}
                      disabled="true"
                      onChange={(e) => {
                        setOfficeHours(e.target.value);
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
                      className={classes.TextFieldInfo}
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
  TextFieldInfo: {
    width: "350px",
  },
});

export default withStyles(styles)(DoctorProfilePage);
