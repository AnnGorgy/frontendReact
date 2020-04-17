import React from "react";

import { withRouter, Link } from "react-router-dom";

import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { SideBar } from "../components";

// ------------------------------------------------- Images --------------------------------------------------
import FacebookIcon from "@material-ui/icons/Facebook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Header from "./Images/ContactUS.jpg";
// -----------------------------------------------------------------------------------------------------------

const Home = ({ history, classes }) => {
  return (
    <Grid
      container
      style={{
        flexWrap: "nowrap",
        backgroundImage: `url(${Header})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center left",
        height: "100%",
        marginLeft: "8%",
      }}
    >
      {/* Navigation bar */}
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
        <Grid
          style={{
            marginTop: "450px",
            marginLeft:"-115px",
            padding: "3px",
            height:"200px",
            width:"550px",
            borderRadius: "64px",
            border: "4px solid black",
            borderColor:"	#242222",
            backgroundColor:"	#dadada"

          }}
        >
          <Grid
            item
            style={{
              width: "50%",
              marginLeft:"20px" ,
              marginTop:"2px",
            }}
          >
            <Typography style={{ fontFamily: "Monaco", fontSize: "30px" , color:"#009685" }}>
              Contact Us
            </Typography>
            <MailOutlineIcon
              style={{ paddingRight: "5px", width: "30px", height: "30px" }}
            />
            <text style={{ fontSize: "20px" , color:"	#003539" }}>
              E-learning@cis.asu.edu.eg
            </text> <br/> <br/>
            <Typography style={{ marginTop: "2px"  , color:"#009685" }}>Follow us</Typography>
            <a href="https://www.facebook.com/%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D9%87-%D8%A7%D9%84%D8%B1%D8%B3%D9%85%D9%8A%D8%A9-%D9%84%D9%83%D9%84%D9%8A%D9%87-%D8%A7%D9%84%D8%AD%D8%A7%D8%B3%D8%A8%D8%A7%D8%AA-%D9%88%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA-%D8%AC%D8%A7%D9%85%D8%B9%D9%87-%D8%B9%D9%8A%D9%86-%D8%B4%D9%85%D8%B3-1839142163059502/">
              <FacebookIcon style={{ width: "45px", height: "45px"  }} />
            </a>
          </Grid>
          <Grid
            item
            style={{
              width: "50%",
              marginLeft: "310px",
              marginTop: "-180px",
              color:"#009685"
            }}
          >
            <Typography style={{ fontFamily: "Monaco", fontSize: "30px" , color:"#009685" }}>
              Info
            </Typography>
            <a href="http://cis.asu.edu.eg/" style={{ fontSize: "20px"}}>
              Faculty of Computer and Information Sciences
            </a>
            <br /> <br/>
            <a href="http://asu.edu.eg/" style={{ fontSize: "20px" }}>
              Ain Shams University
            </a>
            <br /> <br/>
            <a
              href="https://www.google.com/maps/place/Faculty+of+Computer+and+Information+Sciences+-+Ain+Shams+University/@30.0782592,31.2827444,17z/data=!3m1!4b1!4m5!3m4!1s0x14583f95f0512f29:0xfa1ccd201d070672!8m2!3d30.0782592!4d31.2849384?shorturl=1"
              style={{ fontSize: "20px" }}
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
});

export default withStyles(styles)(withRouter(Home));
