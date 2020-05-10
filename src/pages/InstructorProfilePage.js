import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { post, get } from "axios";

//------------------------------ Another Components Used In This Component ----------------------------------
import { SideBar } from "../components";
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

const InstructorProfilePage = ({ classes }) => {
  // Set The First Letter Of The Users' Name To capial //
  const EnglishName = JSON.parse(localStorage.getItem("Information")).NameEN;
  const ViewingName =
    EnglishName.charAt(0).toUpperCase() + EnglishName.substring(1);

  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [name, setName] = useState(ViewingName);
  const [ID, setID] = useState("");
  const [OfficeHours, setOfficeHours] = useState("");
  const [Email, setEmail] = useState("");
  const [NewID, setNewID] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountID
  );
  const [LoginEmail, setLoginEmail] = useState(
    JSON.parse(localStorage.getItem("Information")).Email
  );
  const AccountTypeName = "Instructor Account";
  const ArName = JSON.parse(localStorage.getItem("Information")).NameAR;
  const [reloadProfile, setReloadProfile] = useState(true);
  //----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (reloadProfile) {
      ViewData({});
      setReloadProfile(false);
    }
  }, [reloadProfile]);

  const resetStates = () => {
    setEmail(Email);
    setOfficeHours(OfficeHours);
  };

  //-------------------------------------- API Calls ---------------------------------------------------------
  const ViewData = async ({ callback }) => {
    const url = "/Office_Hours/Get_Instructor_data";
    try {
      // post syntax (url, body, options)
      const { data } = await post(url, null, {
        params: {
          Doc_id: JSON.parse(localStorage.getItem("Information")).AccountID,
        },
      });
      if (callback) callback();
      setEmail(data[0].email);
      setID(data[0].id);
      setOfficeHours(data[0].office);
      setName(JSON.parse(localStorage.getItem("Information")).NameEN);
      setLoginEmail(JSON.parse(localStorage.getItem("Information")).Email);
    } catch (err) {
      console.error(err);
    }
  };
  //----------------------------------------------------------------------------------------------------------
  return (
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
                <Typography className={classes.engNameText}>{name}</Typography>
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
                      secondaryTypographyProps={{
                        style: { color: "darkslategray", marginLeft: "20px" },
                      }}
                      className={classes.HeaderInfoPosition}
                    />
                  </ListItem>
                  <ListItem divider>
                    <ListItemText
                      primary="Name in Arabic"
                      secondary={ArName}
                      secondaryTypographyProps={{
                        style: { color: "darkslategray", marginLeft: "20px" },
                      }}
                      className={classes.HeaderInfoPosition}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="E-mail"
                      secondary={LoginEmail}
                      secondaryTypographyProps={{
                        style: { color: "darkslategray", marginLeft: "20px" },
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
                  }}
                  className={classes.textFieldInfo}
                />

                {/* Add E-mail  */}
                <Tooltip title="ADD" placement="bottom">
                  <Button>
                    <AddCircleIcon
                      onClick={() => {
                        get("/Office_Hours/Add_email", {
                          params: { id: NewID, email: Email },
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
                  <Button disabled={!Email}>
                    <DeleteIcon
                      onClick={() => {
                        get("/Office_Hours/Delete_email", {
                          params: { id: ID },
                        })
                          .then(() => setEmail(" "), setReloadProfile(true))
                          .catch((err) => console.error(err));
                        resetStates();
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
                  className={classes.textFieldInfo}
                />
                {/* Add Office Hours */}
                <Tooltip title="ADD" placement="bottom">
                  <Button>
                    <AddCircleIcon
                      onClick={() => {
                        post("/Office_Hours/Add_OfficeHours", null, {
                          params: { id: NewID, OfficeHours: OfficeHours },
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
                  <Button disabled={!OfficeHours}>
                    <DeleteIcon
                      onClick={() => {
                        get("/Office_Hours/Delete_OfficeHours", {
                          params: { id: ID },
                        })
                          .then(
                            () => setOfficeHours(""),
                            setReloadProfile(true)
                          )
                          .catch((err) => console.error(err));
                        resetStates();
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
