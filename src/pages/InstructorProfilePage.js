import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { post, get } from "axios";
import MuiAlert from "@material-ui/lab/Alert";

//------------------------------ Another Components Used In This Component ----------------------------------
import { SideBar } from "../components";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  Typography,
  withStyles,
  TextField,
  Button,
  Tooltip,
  ListItemText,
  ListItem,
  List,
  Snackbar,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons --------------------------------------------------
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Images ---------------------------------------------------
import Profile from "./Images/Profile.png";
import Line from "./Images/line.png";
//------------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function  -------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const InstructorProfilePage = ({ classes }) => {
  // Set The First Letter Of The Users' Name To capial //
  const EnglishName = JSON.parse(localStorage.getItem("DocInformation"))[0]
    .NameEn;
  const ViewingName =
    EnglishName.charAt(0).toUpperCase() + EnglishName.substring(1);

  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [name, setName] = useState(ViewingName);
  const [ID, setID] = useState("");
  const [officeHours, setOfficeHours] = useState("");
  const [Email, setEmail] = useState("");
  const [LoginEmail, setLoginEmail] = useState("");
  const AccountTypeName = "Instructor Account";
  const [ArName, setArName] = useState("");
  const [reloadProfile, setReloadProfile] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [MessageTitle, setMessageTitle] = useState("");
  const [CurrentEmail, setCurrentEmail] = useState("");
  const [CurrentOfficeHours, setCurrentOfficeHours] = useState("");
  const [OpenConfermationDialog, setOpenConfermationDialog] = useState(false);
  const [AdditionalType, setAdditionalType] = useState("");
  //----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (reloadProfile) {
      ViewData({});
      setReloadProfile(false);
    }
  }, [reloadProfile]);

  useEffect(() => {
    ViewData({});
  }, []);

  //-------------------------------------- API Calls ---------------------------------------------------------
  const ViewData = async ({ callback }) => {
    const url = "/Office_Hours/Get_Instructor_data";
    try {
      // post syntax (url, body, options)
      const { data } = await post(url, null, {
        params: {
          Doc_id: JSON.parse(localStorage.getItem("DocInformation"))[0]
            .doctorID,
        },
      });
      if (callback) callback();
      if (data) {
        setEmail(data[0].email);
        setOfficeHours(data[0].office);
        setCurrentEmail(data[0].email);
        setCurrentOfficeHours(data[0].office);
      }
    } catch (err) {
      console.error(err);
    }
  };
  //----------------------------------------------------------------------------------------------------------

  const AddEmail = async () => {
    const url = "/Office_Hours/Add_email";
    try {
      await get(url, {
        params: {
          id: ID,
          email: Email,
        },
      });
      setMessageTitle("Add Email");
      setReloadProfile(true);
      handleClick();
    } catch (err) {
      console.error(err);
    }
  };
  //--------------------------------------------------------------------------------------------------------
  const AddOfficeHours = async () => {
    const url = "/Office_Hours/Add_OfficeHours";
    try {
      await get(url, {
        params: {
          id: ID,
          OfficeHours: officeHours,
        },
      });
      setMessageTitle("Add OfficeHour");
      setReloadProfile(true);
      handleClick();
    } catch (err) {
      console.error(err);
    }
  };
  //--------------------------------------------------------------------------------------------------------
  const DeleteProfileAdditionalInfo = async (AdditionalTypee, callback) => {
    try {
      await get(
        AdditionalTypee === "Email"
          ? "/Office_Hours/Delete_email"
          : "/Office_Hours/Delete_OfficeHours",
        {
          params: {
            id: ID,
          },
        }
      );
      if (AdditionalTypee === "Email") {
        setEmail("");
      } else {
        setOfficeHours("");
      }
      setMessageTitle("It has been removed successfully");
      handleClick();
      setReloadProfile(true);
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };
  //---------------------------------------------------------------------------------------------------------

  // ---------------------- we use it To Show The Message after every operation --------------------------
  const handleClick = () => {
    setOpen(true);
  };
  // -------------------------------------------------------------------------------------------------------

  // --------------- we use it To hide The Message that will appear after  every operation -----------------
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // -------------------------------------------------------------------------------------------------------
  useEffect(() => {
    setID(JSON.parse(localStorage.getItem("DocInformation"))[0].doctorID);
    setName(JSON.parse(localStorage.getItem("DocInformation"))[0].NameEn);
    setLoginEmail(JSON.parse(localStorage.getItem("DocInformation"))[0].Email);
    setArName(JSON.parse(localStorage.getItem("DocInformation"))[0].NameAR);
  }, []);
  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        className={classes.message}
      >
        <Alert onClose={handleClose} severity="success">
          {MessageTitle}
        </Alert>
      </Snackbar>
      <DeleteConfirmDialog
        isOpened={OpenConfermationDialog}
        onClose={() => setOpenConfermationDialog(false)}
        onConfirm={() =>
          DeleteProfileAdditionalInfo(
            AdditionalType,
            setOpenConfermationDialog(false)
          )
        }
      />
      <Grid container className={classes.mainPage}>
        {/* Navigation bar */}
        <Grid item xs={2}>
          <SideBar />
        </Grid>

        <Grid item xs={10}>
          <Grid
            container
            direction="column"
            alignItems="stretch"
            justify="center"
            spacing={1}
            style={{ flexWrap: "nowrap" }}
          >
            <Grid item>
              <Grid className={classes.FirstGrid}>
                <img
                  alt="ProfileImage"
                  src={Profile}
                  className={classes.ProfileImage}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Grid className={classes.SecondGrid}>
                <Grid style={{ paddingTop: "30px", paddingLeft: "85px" }}>
                  {/* Dialog English Name */}
                  <Typography className={classes.engNameText}>
                    {name}
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  className={classes.LeftDialog}
                >
                  <List
                    component="nav"
                    aria-label="mailbox folders"
                    className={classes.ListContainer}
                  >
                    <ListItem divider>
                      <ListItemText
                        primary="Account Type"
                        secondary={AccountTypeName}
                        primaryTypographyProps={{
                          style: { fontWeight: "bold" },
                        }}
                        secondaryTypographyProps={{
                          style: {
                            color: "darkslategray",
                            marginLeft: "20px",
                            fontWeight: "bold",
                          },
                        }}
                        className={classes.HeaderInfoPosition}
                      />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText
                        primary="Name in Arabic"
                        secondary={ArName}
                        primaryTypographyProps={{
                          style: { fontWeight: "bold" },
                        }}
                        secondaryTypographyProps={{
                          style: {
                            color: "darkslategray",
                            marginLeft: "20px",
                            fontWeight: "bold",
                          },
                        }}
                        className={classes.HeaderInfoPosition}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="E-mail"
                        secondary={LoginEmail}
                        primaryTypographyProps={{
                          style: { fontWeight: "bold" },
                        }}
                        secondaryTypographyProps={{
                          style: {
                            color: "darkslategray",
                            marginLeft: "20px",
                            fontWeight: "bold",
                          },
                        }}
                        className={classes.HeaderInfoPosition}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid>
                  <img
                    alt="LineImage"
                    src={Line}
                    className={classes.LineDivider}
                  />
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  className={classes.RightDialog}
                >
                  {/* Dialog Additional E-mail */}
                  <TextField
                    label="Additional E-mail"
                    multiline
                    rows={1}
                    value={Email}
                    placeholder="Instructor@gmail.com"
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
                      shrink: "true",
                    }}
                    className={classes.textFieldInfo}
                  />

                  {/* Add E-mail  */}
                  <Tooltip title="ADD" placement="bottom">
                    <Button disabled={Email === "" || Email == CurrentEmail}>
                      <AddCircleIcon
                        onClick={() => {
                          AddEmail();
                        }}
                      />
                    </Button>
                  </Tooltip>

                  {/* Delete E-mail */}
                  <Tooltip title="Delete" placement="bottom">
                    <Button disabled={Email === "" || CurrentEmail === null}>
                      <DeleteIcon
                        onClick={() => {
                          setOpenConfermationDialog(true);
                          setAdditionalType("Email");
                        }}
                      />
                    </Button>
                  </Tooltip>
                  {/* Dialog Office Hours */}
                  <TextField
                    label="Office Hours"
                    multiline
                    rows={2}
                    placeholder=" Monday 11-1 pm  Class 7"
                    value={officeHours}
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
                      shrink: "true",
                    }}
                    className={classes.textFieldInfo}
                  />
                  {/* Add Office Hours */}
                  <Tooltip title="ADD" placement="bottom">
                    <Button
                      disabled={
                        officeHours === "" || officeHours == CurrentOfficeHours
                      }
                    >
                      <AddCircleIcon
                        onClick={() => {
                          AddOfficeHours();
                        }}
                      />
                    </Button>
                  </Tooltip>

                  {/* Delete Office Hours */}
                  <Tooltip title="Delete" placement="bottom">
                    <Button
                      disabled={
                        officeHours === "" || CurrentOfficeHours === null
                      }
                    >
                      <DeleteIcon
                        onClick={() => {
                          setOpenConfermationDialog(true);
                          setAdditionalType("OfficeHours");
                        }}
                      />
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
// Dialog styles
const styles = (theme) => ({
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
  LeftDialog: {
    width: "510px",
    height: "400px",
    padding: "10px",
    marginTop: "10px",
    marginLeft: "5%",
  },
  RightDialog: {
    width: "510px",
    height: "400px",
    borderRadius: "32px",
    border: "3px solid black",
    marginLeft: "58%",
    marginTop: "-447px",
    padding: "10px",
  },
  LineDivider: {
    width: "25px",
    marginLeft: "48.5%",
    marginTop: "-350px",
    height: "400px",
  },
  engNameText: {
    width: "350px",
    marginLeft: "40.5%",
    fontFamily: "Monaco",
    fontSize: "40px",
  },
  ProfileImage: {
    width: "138px",
    height: "138px",
    borderRadius: "256px",
    border: "5px solid black",
    position: "absolute",
    zIndex: "1",
    marginLeft: "4.8%",
    marginTop: "25px",
  },
  FirstGrid: {
    align: "left",
    height: "60px",
    marginTop: "1%",
    borderRadius: "2px",
    webkitBoxShadow: "5px 5px 5px #9E9E9E",
    mozBoxShadow: "5px 5px 5px #9E9E9E",
    boxShadow: "5px 5px 5px #9E9E9E",
    marginRight: "0.6%",
    padding: "15px 0px 70px 545px ",
    backgroundColor: "white",
  },
  SecondGrid: {
    align: "left",
    height: "590px",
    marginTop: "4px",
    borderRadius: "2px",
    webkitBoxShadow: "5px 5px 5px #9E9E9E",
    mozBoxShadow: "5px 5px 5px #9E9E9E",
    boxShadow: "5px 5px 5px #9E9E9E",
    marginRight: "0.6%",
    backgroundColor: "white",
  },
  ListContainer: {
    borderRadius: "32px",
    border: "3px solid black",
    width: "130%",
    height: "380px",
  },
  mainPage: {
    flexWrap: "nowrap",
  },
  textFieldInfo: {
    width: "350px",
    marginTop: "30px",
  },
  HeaderInfoPosition: {
    padding: "20px",
  },
});
export default withStyles(styles)(withRouter(InstructorProfilePage));
