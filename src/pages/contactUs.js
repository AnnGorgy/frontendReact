import React from "react";

import { withRouter } from "react-router-dom";

import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { SideBar } from "../components";

// ------------------------------------------------- Images --------------------------------------------------
import FacebookIcon from '@material-ui/icons/Facebook';
import Header from "./Images/ContactUS.jpg";
// -----------------------------------------------------------------------------------------------------------

const Home = ({ history, classes }) => {
    return (
        <Grid classes={classes.container}>

            {/* Navigation bar */}
            <Grid >
                <SideBar />
            </Grid>

            {/*  <Grid>
                <Typography style={{ marginLeft: "30%"  , marginTop:"10%"}}>
                    Our Location
                  <br />
                    -------------------------------
                  <br />
                    Alkhalifa Almaamon Street, Abassia, Ain
                  <br />
                    Shams University, Cairo, Egypt.
                  <br />
                    Call: 02-26855585
                  <br />
                    Dean Office Mail:
                  <br />
                    deanoffice@cis.asu.edu.eg
                  <br />
                    Vice Student Mail:
                  <br />
                    viced.students@cis.asu.edu.eg
                  <br />
                    Contact Technical Support:
                  <br />
                    IT.unit@cis.asu.edu.eg

              </Typography>
                <Typography style={{ marginLeft: "50%" }}>
                    Social Conectivity
                        <br />
                    -------------------------------
                            <br />
                    <FacebookIcon />
                </Typography>
            </Grid> */}
            {/* BackGround Image With it's Style */}
            <div style={{
                backgroundImage: `url(${Header})`, backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center left",
                height: "750px",
                marginLeft:"9.5%",    
            }}></div>
        </Grid>
    );
};

// Page Styles
const styles = () => ({
    container: {
        flexWrap: "nowrap",
    }
});

export default withStyles(styles)(withRouter(Home));
