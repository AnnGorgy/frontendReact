import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";

const QuizHeaderCreation = () => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  /* const [CourseName, setCourseName] = useState("nyla"); */
  const [QuizName, setQuizName] = useState(localStorage.getItem('QuizName'));
  const [TotalTime, setTotalTime] = useState(localStorage.getItem('TotalTime'));
  //--------------------------------------------------------------------------------------------------------
  // dh hna al header bta3 al quiz zat nfso bs dh lsh mtrbt4 bl back l7ad mw y3mloh
  return (
    <Grid
      item
      style={{
        align: "left",
        height: "90px",
        marginTop: "10px",
        borderRadius: "2px",
        webkitBoxShadow: "5px 5px 5px #9E9E9E",
        mozBoxShadow: "5px 5px 5px #9E9E9E",
        boxShadow: "5px 5px 5px #9E9E9E",
        marginRight: "9px",
        padding: "15px 0px 30px 10px",
        backgroundColor: "white",
      }}
    >
      {/* <Grid item style={{marginLeft:"40px" , marginTop:"-7px"}}>
        <Typography
          style={{
            fontSize: 30,
            fontFamily: "sans-serif",
          }}
        >
          Course Name :
        </Typography>
        <Typography
          style={{
            fontSize: 24,
            color: "silver",
            marginLeft:"177px",
            fontFamily: "sans-serif",
          }}
        >
          {CourseName}
        </Typography>
      </Grid> */}

      <Grid item style ={{marginLeft:"500px", marginTop:"-15px"}}>
        <Typography
          style={{
            fontSize: 30,
            fontFamily: "sans-serif",
          }}
        >
          Quiz Name :
        </Typography>

        <Typography
          style={{
             fontSize: 24,
            color: "silver",
            marginLeft:"150px",
          }}
        >
          {QuizName}
        </Typography>
      </Grid>
      <Grid item style ={{marginLeft:"950px" , marginTop:"-80px"}}>
        <Typography
          style={{
            fontSize: 30,
            fontFamily: "sans-serif",
          }}
        >
          Total Time :
        </Typography>
        <Typography
          style={{
            fontSize: 24,
            color: "silver",
            marginLeft:"150px",
          }}
        >
          {TotalTime}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default withRouter(QuizHeaderCreation);