import React from "react";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid, Typography, withStyles } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import { SideBar } from "../components";
//-----------------------------------------------------------------------------------------------------------

// ------------------------------------------------- Icons --------------------------------------------------
import FacebookIcon from "@material-ui/icons/Facebook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
// -----------------------------------------------------------------------------------------------------------

// ------------------------------------------------- Images --------------------------------------------------
import Header from "./Images/ContactUS.jpg";
//------------------------------------------------------------------------------------------------------------

const Home = ({ classes }) => {
  return (
    <Grid container className={classes.MainPage}>
      {/* Navigation bar */}
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
        <Grid className={classes.dialogContainer}>
          <Grid item className={classes.ContactUsContainer}>
            <Typography className={classes.headerInfo}>Contact Us</Typography>
            <MailOutlineIcon
              style={{ paddingRight: "5px", width: "30px", height: "30px" }}
            />
            <text style={{ fontSize: "20px", color: "	#003539" }}>
              E-learning@cis.asu.edu.eg
            </text>
            <br /> <br />
            <Typography style={{ marginTop: "2px", color: "#009685" }}>
              Follow us
            </Typography>
            <a href="https://www.facebook.com/%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D9%87-%D8%A7%D9%84%D8%B1%D8%B3%D9%85%D9%8A%D8%A9-%D9%84%D9%83%D9%84%D9%8A%D9%87-%D8%A7%D9%84%D8%AD%D8%A7%D8%B3%D8%A8%D8%A7%D8%AA-%D9%88%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA-%D8%AC%D8%A7%D9%85%D8%B9%D9%87-%D8%B9%D9%8A%D9%86-%D8%B4%D9%85%D8%B3-1839142163059502/">
              <FacebookIcon style={{ width: "45px", height: "45px" }} />
            </a>
          </Grid>
          <Grid item className={classes.InfoContainer}>
            <Typography className={classes.headerInfo}>Info</Typography>
            <a href="http://cis.asu.edu.eg/" className={classes.SiteInfoSize}>
              Faculty of Computer and Information Sciences
            </a>
            <br /> <br />
            <a href="http://asu.edu.eg/" className={classes.SiteInfoSize}>
              Ain Shams University
            </a>
            <br /> <br />
            <a
              href="https://www.google.com/maps/place/Faculty+of+Computer+and+Information+Sciences+-+Ain+Shams+University/@30.0782592,31.2827444,17z/data=!3m1!4b1!4m5!3m4!1s0x14583f95f0512f29:0xfa1ccd201d070672!8m2!3d30.0782592!4d31.2849384?shorturl=1"
              className={classes.SiteInfoSize}
            >
              Location by Google Maps
            </a>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

// Page Styles
const styles = () => ({
  container: {
    flexWrap: "nowrap",
  },
  MainPage: {
    flexWrap: "nowrap",
  },
  dialogContainer: {
    marginTop: "480px",
    marginLeft: "100px",
    padding: "3px",
    height: "200px",
    width: "550px",
    borderRadius: "64px",
    border: "4px solid black",
    borderColor: "	#242222",
    backgroundColor: "	#dadada",
  },
  headerInfo: {
    fontFamily: "Monaco",
    fontSize: "30px",
    color: "#009685",
  },
  ContactUsContainer: {
    width: "50%",
    marginLeft: "20px",
    marginTop: "2px",
  },
  InfoContainer: {
    width: "50%",
    marginLeft: "310px",
    marginTop: "-180px",
    color: "#009685",
  },
  SiteInfoSize: {
    fontSize: "20px",
  },
});

export default withStyles(styles)(withRouter(Home));
