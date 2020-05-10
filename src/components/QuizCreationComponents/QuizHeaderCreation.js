import React, { useState } from "react";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid, Typography } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------- icons ---------------------------------------------------------

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
        <img
          src="https://icons8.com/icon/7FYKzUGseWMH/questions"
          alt="img"
        />
        <Typography
          style={{
            fontSize: 50,
            marginLeft: "620px",
            color: "black",
          }}
        >
          {QuizName}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default withRouter(QuizHeaderCreation);
