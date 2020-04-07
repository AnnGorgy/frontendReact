import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";

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

  const   EnName =(JSON.parse(localStorage.getItem("Information")).NameEN);
  const ViewingName =EnName.charAt(0).toUpperCase()+EnName.substring(1);



  const [name, setName] = useState(ViewingName);
  const [ID, setID] = useState("");
  const [OfficeHours, setOfficeHours] = useState("");
  const [Email, setEmail] = useState("");
  const [reloadProfile, setReloadProfile] = useState(true);
  const [LoginEmail,setLoginEmail]= useState(JSON.parse(localStorage.getItem("Information")).Email)


  const resetStates = () => {
    setEmail(Email);
    setOfficeHours(OfficeHours);
  };
  const ViewData = async ({ callback }) => {
    const url = "/Office_Hours/Get_Instructor_data";
    try {
      // noh .. bosy el post el syntax bta3ha (url, body, options)
      // body da request body lma bnegy nb3t data fl body bnst5dmo zy el form data kda..
      // options momkn nb3t feha params: {}
      // fa lazm tb2a 3rd parameter fl post
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
    } //try now kda .. ok 
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
                    <typography>
                     Name : {name}
                    </typography>
                  </Grid>

                  <Grid item>
                    <typography>
                      Email : {LoginEmail}
                    </typography>
                  </Grid>
                   {/*  <Grid item>
                    <TextField
                      label="Name"
                      value={name}
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
                  </Grid>   */}

                  <Grid item>
                    {/* FIXME: Add validation for URL creation to add http at
                      the begging of the link. */}
                    <TextField
                      label="E-mail"
                      multiline
                      rows={2}
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
                    {/*tyb hna add  */}
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

                    {/*tyb hna delete */}
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

                    {/*tyb hna edit */}
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

                    {/*tyb hna add  */}
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

                    {/*tyb hna delete */}
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

                    {/*tyb hna edit */}
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
