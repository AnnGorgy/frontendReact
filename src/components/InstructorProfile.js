import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const DoctorProfilePage = ({ onClose, isOpened, classes, match }) => {
  // Set The First Letter Of The Users' Name To capial //
  const [EnName, setEnName] = useState("");
  const ViewingName = EnName.charAt(0).toUpperCase() + EnName.substring(1);

  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [OfficeHours, setOfficeHours] = useState("");
  const [Email, setEmail] = useState("");
  const [LoginEmail, setLoginEmail] = useState("");
  const [ArName, setArName] = useState("");
  //----------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------

  const DoctorInformation = async () => {
    try {
      const url = "/Login/getDoctor";
      const { data } = await post(url, null, {
        params: {
          subjectId: match.params.courseId,
        },
      });
      setLoginEmail(data[0].doctorEmail);
      setArName(data[0].doctorNameAR);
      setEnName(data[0].doctorNameEN);

      const url2 = "/Office_Hours/Get_Instructor_data";
      const { data: data2 } = await post(url2, null, {
        params: {
          Doc_id: data[0].doctorID,
        },
      });
      if (data2.length != 0) {
        setEmail(data2[0].email);
        setOfficeHours(data2[0].office);
      }
      else{
        setEmail("");
        setOfficeHours("");
      }
    } catch (err) {
      console.error(err);
    }
  };
  //-----------------------------------------------------------------------------------------------------


  useEffect(() => {
    DoctorInformation();
  }, [match.params.courseId]);

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
                      fullWidth
                      value={ViewingName}
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                        readOnly: true,
                        style: { fontSize: "23px" },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    {/* Dialog Arabic Name */}
                    <TextField
                      label="Name in Arabic"
                      multiline
                      fullWidth
                      rows={1}
                      value={ArName}
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                        readOnly: true,
                        style: { fontSize: "23px" },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    {/* Dialog E-mail */}
                    <TextField
                      label="E-mail"
                      multiline
                      rows={1}
                      fullWidth
                      value={LoginEmail}
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                        readOnly: true,
                        style: { fontSize: "23px" },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item>
                    {/* Dialog Additional E-mail */}
                    <TextField
                      label="Additional E-mail"
                      multiline
                      fullWidth
                      rows={1}
                      value={Email}
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                        readOnly: true,
                        style: { fontSize: "23px" },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item>
                    {/* Dialog Office Hours */}
                    <TextField
                      label="Office Hours"
                      multiline
                      fullWidth
                      rows={2}
                      value={OfficeHours}
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                        readOnly: true,
                        style: { fontSize: "23px" },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                    />
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

export default withStyles(styles)(withRouter(DoctorProfilePage));
