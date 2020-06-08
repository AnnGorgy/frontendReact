import React, { useState } from "react";
import { withRouter } from "react-router-dom";


//--------------------------------- What was used from material ui core -------------------------------------
import { Grid, Typography } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------- Images ---------------------------------------------------------
import QuizImage from "../QuizImages/QuizImage.png";
//-----------------------------------------------------------------------------------------------------------

const QuizHeaderCreation = () => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const QuizName = useState(localStorage.getItem("QuizName"));
  //--------------------------------------------------------------------------------------------------------
  return (
    <Grid
      item
      style={{
        align: "left",
        height: "80px",
        marginTop: "10px",
        borderRadius: "2px",
        webkitBoxShadow: "5px 5px 5px #9E9E9E",
        mozBoxShadow: "5px 5px 5px #9E9E9E",
        boxShadow: "5px 5px 5px #9E9E9E",
        marginRight: "9px",
        backgroundColor: "white",
      }}
    >
      <Grid item>
        <Grid item>
          <img src={QuizImage} alt="QuizImage"  style={{marginLeft:"580px" , marginTop:"10px"}}/>
        </Grid>
        <Grid item>
          <Typography
            style={{
              fontSize: 50,
              marginLeft: "660px",
              marginTop:"-73px" ,
              color: "black",
              fontFamily: "GreatVibes"
            }}
          >
            {QuizName}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(QuizHeaderCreation);
