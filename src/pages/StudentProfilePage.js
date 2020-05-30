import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

//------------------------------ Another Components Used In This Component ----------------------------------
import { SideBar } from "../components";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  Typography,
  withStyles,
  Divider,
  ListItemText,
  ListItem,
  List,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Images ---------------------------------------------------
import Profile from "./Images/Profile.png";
import Line from "./Images/line.png";
//------------------------------------------------------------------------------------------------------------

const StudentProfilePage = ({ classes }) => {
  // Set The First Letter Of The Users' Name To capial //
  /* const EnglishName = JSON.parse(localStorage.getItem("Information")).NameEN;
  const ViewingName =
    EnglishName.charAt(0).toUpperCase() + EnglishName.substring(1); */
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  /* const EnName = ViewingName; */
  const EnName = JSON.parse(localStorage.getItem("StuInformation"))[0].NameAR;
  const LoginEmail = JSON.parse(localStorage.getItem("StuInformation"))[0].Email;
  const seatNo = JSON.parse(localStorage.getItem("StuInformation"))[0].SeatNo;
  const level = JSON.parse(localStorage.getItem("StuInformation"))[0].LevelName;
  const department = JSON.parse(localStorage.getItem("StuInformation"))[0]
    .Department;
  const ArName = JSON.parse(localStorage.getItem("StuInformation"))[0].NameAR;
  const AccountTypeName = "Student Account";
  const [reloadProfile, setReloadProfile] = useState(true);
  //----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (reloadProfile) {
      setReloadProfile(false);
    }
  }, [reloadProfile]);

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
              <Grid style={{ paddingTop: "30px", paddingLeft: "98px" }}>
                {/* Dialog English Name */}
                <Typography className={classes.engNameText}>
                  {EnName}
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
                  <ListItem>
                    <ListItemText
                      primary="Name In Arabic"
                      secondary={ArName}
                      secondaryTypographyProps={{
                        style: { color: "darkslategray", marginLeft: "20px" },
                      }}
                      className={classes.HeaderInfoPosition}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem divider>
                    <ListItemText
                      primary="Department"
                      secondary={department}
                      secondaryTypographyProps={{
                        style: { color: "darkslategray", marginLeft: "20px" },
                      }}
                      className={classes.HeaderInfoPosition}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Account Type"
                      secondary={AccountTypeName}
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
                <List
                  component="nav"
                  aria-label="mailbox folders"
                  className={classes.ListContainer}
                >
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary={LoginEmail}
                      secondaryTypographyProps={{
                        style: { color: "darkslategray", marginLeft: "20px" },
                      }}
                      className={classes.HeaderInfoPosition}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem divider>
                    <ListItemText
                      primary="Seat Number"
                      secondary={seatNo}
                      secondaryTypographyProps={{
                        style: { color: "darkslategray", marginLeft: "20px" },
                      }}
                      className={classes.HeaderInfoPosition}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Level"
                      secondary={level}
                      secondaryTypographyProps={{
                        style: { color: "darkslategray", marginLeft: "20px" },
                      }}
                      className={classes.HeaderInfoPosition}
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
const styles = () => ({
  mainPage: {
    flexWrap: "nowrap",
  },
  label: {
    color: "black !important",
    fontWeight: "600",
  },
  LeftDialog: {
    width: "500px",
    padding: "10px",
    marginTop: "30px",
    marginLeft: "5%",
  },
  RightDialog: {
    marginLeft: "60%",
    marginTop: "-432px",
    width: "500px",
    padding: "10px",
  },
  LineDivider: {
    width: "25px",
    marginLeft: "49.5%",
    marginTop: "-350px",
    height: "400px",
  },
  engNameText: {
    width: "350px",
    marginLeft: "41.6%",
    fontFamily: "Monaco",
    fontSize: "40px",
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
  ProfileImage: {
    width: "138px",
    height: "138px",
    borderRadius: "256px",
    border: "5px solid black",
    position: "absolute",
    zIndex: "1",
    marginLeft: "5.4%",
    marginTop: "25px",
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
    width: "500px",
    height: "330px",
  },
  HeaderInfoPosition: {
    padding: "20px",
  },
});
export default withStyles(styles)(withRouter(StudentProfilePage));
