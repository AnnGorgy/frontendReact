import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { SideBar } from "../components";
import { Grid, Typography, withStyles, TextField } from "@material-ui/core";

import Profile from "./Images/Profile.png";
import Line from "./Images/line.png";
const StudentProfilePage = ({ classes }) => {

  // Set The First Letter Of The Users' Name To capial //
  const EnglishName = JSON.parse(localStorage.getItem("Information")).NameEN;
  const ViewingName =
    EnglishName.charAt(0).toUpperCase() + EnglishName.substring(1);
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const EnName = ViewingName;
  const LoginEmail = JSON.parse(localStorage.getItem("Information")).Email;
  const seatNo = JSON.parse(localStorage.getItem("StuInformation"))[0].SeatNo;
  const level = JSON.parse(localStorage.getItem("StuInformation"))[0].LevelName;
  const department = JSON.parse(localStorage.getItem("StuInformation"))[0].Department;
  const ArName = JSON.parse(localStorage.getItem("Information")).NameAR;
  const AccountTypeName = "Student Account";
  const [reloadProfile, setReloadProfile] = useState(true);
  //----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (reloadProfile) {
      setReloadProfile(false);
    }
  }, [reloadProfile]);
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
              <Grid style={{ paddingTop: "30px", paddingLeft: "98px" }}>
                {/* Dialog English Name */}
                <Typography
                  style={{
                    width: "350px",
                    marginLeft: "460px",
                    fontFamily: "Monaco",
                    fontSize: "40px",
                  }}
                >
                  {EnName}
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
                    width: "500px",
                    height: "330px",
                  }}
                >
                  <ListItem>
                    <ListItemText
                      primary="Name In Arabic"
                      secondary={ArName}
                      style={{ padding: "20px" }}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem divider>
                    <ListItemText
                      primary="Department"
                      secondary={department}
                      style={{ padding: "20px" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Account Type"
                      secondary={AccountTypeName}
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
                    marginLeft: "610px",
                    marginTop: "-350px",
                    height: "400px",
                  }}
                />
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="center"
                style={{
                  marginLeft: "735px",
                  marginTop: "-432px",
                  width: "500px",
                  padding: "10px",
                }}
              >
                <List
                  component="nav"
                  aria-label="mailbox folders"
                  style={{
                    borderRadius: "32px",
                    border: "3px solid black",
                    width: "500px",
                    height: "330px",
                  }}
                >
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary={LoginEmail}
                      style={{ padding: "20px" }}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem divider>
                    <ListItemText
                      primary="Seat Number"
                      secondary={seatNo}
                      style={{ padding: "20px" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Level"
                      secondary={level}
                      style={{ padding: "20px" }}
                    />
                  </ListItem>
                </List>
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
export default withStyles(styles)(withRouter(StudentProfilePage));
