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

const DoctorProfilePage = ({
  onClose,
  isOpened,
  title,
  match,
  onSubmit,
  classes,
}) => {

    // Set The First Letter Of The Users' Name To capial // 
  const   EnName =(JSON.parse(localStorage.getItem("Information")).NameEN);
  const ViewingName =EnName.charAt(0).toUpperCase()+EnName.substring(1);


// ---------------------------- variables with it's states that we use it in this Dialog ------------------- 
  const [name, setName] = useState(ViewingName);
  const [ID, setID] = useState("");
  const [OfficeHours, setOfficeHours] = useState("");
  const [Email, setEmail] = useState("");
  const [reloadProfile, setReloadProfile] = useState(true);
  const [LoginEmail,setLoginEmail]= useState(JSON.parse(localStorage.getItem("Information")).Email)
  const AccountTypeName= "Instructor Account";
  const ArName= (JSON.parse(localStorage.getItem("Information")).NameAR);
//----------------------------------------------------------------------------------------------------------

  const resetStates = () => {
    setEmail(Email);
    setOfficeHours(OfficeHours);
  };
  const ViewData = async ({ callback }) => {
    const url = "/Office_Hours/Get_Instructor_data";
    try {
      // post syntax (url, body, options)
      const { data } = await post(url, null, {
        params: { 
          Doc_id: JSON.parse(localStorage.getItem("Information")).AccoutID, 
        },
      });
      if (callback) callback();
      setEmail(data[0].email);
      setID(data[0].id);
      setOfficeHours(data[0].office);
      setName(JSON.parse(localStorage.getItem("Information")).NameEN) 
      setLoginEmail(JSON.parse(localStorage.getItem("Information")).Email)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (reloadProfile) {
      ViewData({});
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
                    {/* FIXME: Add validation for URL creation to add http at
                      the begging of the link. */}
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
                    {/* FIXME: Add validation for URL creation to add http at
                      the begging of the link. */}
                    <TextField
                      label="Name"
                      multiline
                      rows={1}
                      value={name}
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
                    {/* FIXME: Add validation for URL creation to add http at
                      the begging of the link. */}
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
                    />
                
                  </Grid>
                  <Grid item>
                    {/* FIXME: Add validation for URL creation to add http at
                      the begging of the link. */}
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
                      style={{ width: "350px" }}
                    />
                
                  </Grid>

                  <Grid item>
                    {/* FIXME: Add validation for URL creation to add http at
                      the begging of the link. */}
                    <TextField
                      label="Additional E-mail"
                      multiline
                      rows={1}
                      value={Email}
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
                      style={{ width: "350px" }}
                    />
                    {/* Add E-mail  */}
                    <Tooltip title="ADD" placement="bottom">
                      <Button>
                        <AddCircleIcon
                          onClick={() => { 
                            post("/Office_Hours/Add_email", {
                              params: { id: ID, email: Email },
                            })
                              .then(() => setReloadProfile(true))
                              .catch((err) => console.error(err));
                              resetStates();
                          }}
                        />
                      </Button>
                    </Tooltip>

                    {/* Delete E-mail */}
                    <Tooltip title="Delete" placement="bottom">
                      <Button
                      disabled={!Email}
                      >
                        <DeleteIcon
                          onClick={() => {
                            get("/Office_Hours/Delete_email", {
                              params: { id: ID },
                            })
                         
                              .then(() => setEmail(" "),setReloadProfile(true))
                              .catch((err) => console.error(err));
                              resetStates();
                          }}
                        />
                      </Button>
                    </Tooltip>

                    {/* Edit E-mail */}
                    <Tooltip title="Edit" placement="bottom">
                      <Button>
                        <EditIcon
                          onClick={() => {
                            get("/Office_Hours/Update_email", {
                              params: { id: ID, email: Email },
                            })
                              .then(() => setReloadProfile(true))
                              .catch((err) => console.error(err));
                              resetStates();
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Office Hours"
                      multiline
                      rows={2}
                      value={OfficeHours}
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
                      style={{ width: "350px" }}
                    />

                    {/* Add Office Hours */}
                    <Tooltip title="ADD" placement="bottom">
                      <Button>
                        <AddCircleIcon
                          onClick={() => {
                            post("/Office_Hours/Add_OfficeHours", {
                              params: { id: ID, OfficeHours: OfficeHours },
                            })
                              .then(() => setReloadProfile(true))
                              .catch((err) => console.error(err));
                              resetStates();
                          }}
                        />
                      </Button>
                    </Tooltip>

                    {/* Delete Office Hours */}
                    <Tooltip title="Delete" placement="bottom">
                      <Button
                      disabled={!OfficeHours}
                      >
                        <DeleteIcon
                          onClick={() => {
                            get("/Office_Hours/Delete_OfficeHours", {
                              params: { id: ID },
                            })
                              .then(() => setOfficeHours(""),setReloadProfile(true))
                              .catch((err) => console.error(err));
                              resetStates();
                          }}
                        />
                      </Button>
                    </Tooltip>

                    {/* Edit Office Hours */}
                    <Tooltip title="Edit" placement="bottom">
                      <Button>
                        <EditIcon
                          onClick={() => {
                            get("/Office_Hours/Update_OfficeHours", {
                              params: { id: ID, OfficeHours: OfficeHours },
                            })
                              .then(() => setReloadProfile(true))
                              .catch((err) => console.error(err));
                              resetStates();
                          }}
                        />
                      </Button>
                    </Tooltip>
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
});

export default withStyles(styles)(DoctorProfilePage);