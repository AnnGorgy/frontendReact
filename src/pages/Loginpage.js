import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { post, get } from "axios";

//------------------------------------------------- Images ---------------------------------------------------
import loginImg from "./Images/logo.png";
import PasswordIcon from "./Images/PasswordIcon.png";
import EmailIcon from "./Images/EmailIcon.png";
import LMSImage from "./Images/LMS.png";
import background from "./Images/background.jpg";
//------------------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  withStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function ---------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const LoginPage = ({ history, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  //--------------------------------------------------------------------------------------------------------

  // ---------------------- we use it To Show The Message after every operation --------------------------
  const handleClick = () => {
    setOpen(true);
  };
  //-------------------------------------------------------------------------------------------------------

  // --------------- we use it To hide The Message that will appear after  every operation -----------------
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //---------------------------------------------------------------------------------------------------------

  // ------------------------------------- API Calls ---------------------------------------------------------
  const login = async () => {
    try {
      const url = "/Login/validateUser";
      const body = {
        Username: Email,
        Password: password,
      };
      const { data } = await post(url, body);
      localStorage.setItem("subjects", JSON.stringify(data));
      history.push("/home");
    } catch (err) {
      setMessageTitle("Either your E-mail or your password isn't correct!");
      handleClick();
      console.error(err);
    }
  };
  //--------------------------------------------------------------------------------------------------------

  const UserInformation = async () => {
    try {
      const url = "/Login/getuserObject";
      const { data } = await get(url, {
        params: {
          email: Email,
        },
      });
      localStorage.setItem("Information", JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  //---------------------------------------------------------------------------------------------------------
  const StudentInformation = async () => {
    try {
      const url = "/Login/getStudent";
      const { data } = await get(url, {
        params: {
          email: Email,
        },
      });
      localStorage.setItem("StuInformation", JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };
  //---------------------------------------------------------------------------------------------------------
  const DoctorInformation = async () => {
    try {
      const url = "/Login/getDoctor";
      const { data } = await get(url, {
        params: {
          email: Email,
        },
      });
      localStorage.setItem("DocInformation", JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };
  //---------------------------------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
        <Alert onClose={handleClose} severity="error">
          {messageTitle}
        </Alert>
      </Snackbar>
      <Grid container className={classes.MainPage}>
        <Grid item className={classes.paperContainer}>
          <Grid item className={classes.lmsHeader}>
            {/* Lms image */}
            <img src={LMSImage} alt={"LMSImage"} />
          </Grid>
          <Grid item className={classes.content}>
            {/* Logo image */}
            <Grid item className={classes.logoImageContainer}>
              <img
                src={loginImg}
                className={classes.logoImage}
                alt={"LogoImage"}
              />
            </Grid>
            <Grid item className={classes.UserInfo}>
              <Grid item>
                <Grid item className={classes.EmailIconContainer}>
                  <img src={EmailIcon} alt={"EmailIcon"} />
                </Grid>

                {/* username */}
                <Grid item className={classes.TextFieldContainer}>
                  <TextField
                    E-mail="standard-basic"
                    label="E-mail"
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.EmailInput}
                  />
                </Grid>

                <Grid item className={classes.PassIconContainer}>
                  <img src={PasswordIcon} alt={"PasswordICon"} />
                </Grid>
                {/* password */}

                <Grid item className={classes.TextFieldContainer}>
                  <TextField
                    Password="standard-basic"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.PassInput}
                  />
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                className={classes.loginButton}
                onClick={() => {
                  login();
                  UserInformation();
                  StudentInformation();
                  DoctorInformation();
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const styles = (theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  loginButton: {
    marginLeft: "330px",
    marginTop: "25px",
    width: "90px",
    height: "45px",
    fontSize: "20px",
  },
  PassInput: {
    transition: "all 250ms ease-in-out",
    marginTop: "6px",
    fontSize: "16px",
    height: "37px",
    padding: "0px 10px",
    marginBottom: "31px",
    width: "340px",
    marginLeft: " 20px",
  },
  EmailInput: {
    transition: "all 250ms ease-in-out",
    marginTop: "6px",
    fontSize: "16px",
    height: "37px",
    padding: "0px 10px",
    marginBottom: "31px",
    width: "340px",
    marginLeft: " 20px",
  },
  paperContainer: {
    width: "30%",
    height: "80%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    border: "6px solid black",
    borderRadius: "64px",
    marginLeft: "1100px",
    webkitBoxShadow: "12px 12px 12px #9E9E9E",
    mozBoxShadow: "12px 12px 12px #9E9E9E",
    boxShadow: "12px 12px 12px #9E9E9E",
    backgroundColor: "white",
    marginTop: "60px",
  },
  MainPage: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100%",
    flexWrap: "nowrap",
  },
  lmsHeader: {
    marginTop: "-50px",
    fontSize: "22px",
    marginLeft: "15px",
    fontFamily: "Open Sans",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  logoImageContainer: {
    marginTop: "-60px",
    width: "85%",
    height: "85%",
    marginLeft: "15px",
  },
  logoImage: {
    width: "230px",
    height: "230px",
    marginLeft: "94px",
  },
  UserInfo: {
    marginTop: "2em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  TextFieldContainer: {
    marginLeft: "55px",
    marginTop: "-65px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "fit-content",
  },
  PassIconContainer: {
    marginRight: "375px",
    marginTop: "20px",
  },
  EmailIconContainer: {
    marginRight: "375px",
  },
});

export default withStyles(styles)(withRouter(LoginPage));
