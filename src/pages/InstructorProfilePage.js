import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import { post, get } from "axios";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { SideBar } from "../components";
import {
  Grid,
  Typography,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

//------------------------------------------------- Icons --------------------------------------------------
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
//-----------------------------------------------------------------------------------------------------------

import Profile from "./Images/Profile.png";
import Line from "./Images/line.png";
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
  return (
    <Grid container style={{ flexWrap: "nowrap" }}>
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
            <Grid
              style={{
                align: "left",
                height: "40px",
                marginTop: "10px",
                borderRadius: "2px",
                webkitBoxShadow: "5px 5px 5px #9E9E9E",
                mozBoxShadow: "5px 5px 5px #9E9E9E",
                boxShadow: "5px 5px 5px #9E9E9E",
                marginRight: "9px",
                padding: "15px 0px 70px 545px ",
                fontSize: "40px",
                backgroundColor: "white",
                fontFamily: "Monaco",
              }}
            >
              <img
                alt="ProfileImage"
                src={Profile}
                style={{
                  width: "138px",
                  height: "138px",
                  borderRadius: "256px",
                  border: "5px solid black",
                  position: "absolute",
                  zIndex: "1",
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              style={{
                align: "left",
                height: "570px",
                marginTop: "4px",
                borderRadius: "2px",
                webkitBoxShadow: "5px 5px 5px #9E9E9E",
                mozBoxShadow: "5px 5px 5px #9E9E9E",
                boxShadow: "5px 5px 5px #9E9E9E",
                marginRight: "9px",
                backgroundColor: "white",
              }}
            >
              <Grid style={{ paddingTop: "30px", paddingLeft: "85px" }}>
                {/* Dialog English Name */}
                <Typography
                  style={{
                    width: "350px",
                    marginLeft: "460px",
                    fontFamily: "Monaco",
                    fontSize: "40px",
                  }}
                >
                  {name}
                </Typography>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="center"
                style={{
                  width: "500px",
                  padding: "10px",
                  marginTop: "30px",
                  marginLeft: "20px",
                }}
              >
                <List
                  component="nav"
                  aria-label="mailbox folders"
                  style={{
                    borderRadius: "32px",
                    border: "3px solid black",
                    width: "130%",
                    height: "380px",
                  }}
                >
                  <ListItem>
                    <ListItemText
                      primary="Account Type"
                      secondary={AccountTypeName}
                      secondaryTypographyProps={{ style: { color: "darkslategray" , marginLeft:"20px" } }}
                      style={{ padding: "20px" }}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem divider>
                    <ListItemText
                      primary="Name in Arabic"
                      secondary={ArName}
                      secondaryTypographyProps={{ style: { color: "darkslategray" , marginLeft:"20px" } }}
                      style={{ padding: "20px" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="E-mail"
                      secondary={LoginEmail}
                      secondaryTypographyProps={{ style: { color: "darkslategray" , marginLeft:"20px" } }}
                      style={{ padding: "20px" }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid>
                <img
                  alt="LineImage"
                  src={Line}
                  style={{
                    width: "25px",
                    marginLeft: "605px",
                    marginTop: "-420px",
                    height: "400px",
                  }}
                />
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="center"
                style={{
                  marginLeft: "720px",
                  marginTop: "-432px",
                  width: "510px",
                  height: "380px",
                  borderRadius: "32px",
                  border: "3px solid black",
                }}
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
                  style={{ width: "350px" , marginTop : "30px"}}
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
                  style={{ width: "350px" , marginBottom:"30px" }}
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
export default withStyles(styles)(withRouter(InstructorProfilePage));
