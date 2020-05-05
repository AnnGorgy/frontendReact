import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import loginImg from "./Images/logo.png";
import PasswordIcon from "./Images/PasswordIcon.png";
import EmailIcon from "./Images/EmailIcon.png";
import LMSImage from "./Images/LMS.png";
import background from "./Images/background.jpg";
import { post, get } from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
  makeStyles,
} from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const LoginPage = ({ history }) => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
      console.log(JSON.parse(localStorage.getItem("subjects")));
    } catch (err) {
      /* setError(`Your email and password don't match our records`); */
      setMessageTitle("Either your E-mail or your password isn't correct!");
      handleClick();
      console.error(err);
    }
  };

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

  return (
    <React.Fragment>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
        <Alert onClose={handleClose} severity="error">
          {messageTitle}
        </Alert>
      </Snackbar>
      <Grid
        container
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "720px",
          flexWrap: "nowrap",
        }}
      >
        <Grid
          item
          className="base-container"
          style={{
            width: "32%",
            height: "90%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            border: "6px solid black",
            borderRadius: "64px",
            marginLeft: "980px",
            webkitBoxShadow: "12px 12px 12px #9E9E9E",
            mozBoxShadow: "12px 12px 12px #9E9E9E",
            boxShadow: "12px 12px 12px #9E9E9E",
            backgroundColor: "white",
            marginTop: "30px",
          }}
        >
          <Grid
            item
            className="header"
            style={{
              marginTop: "-50px",
              fontSize: "22px",
              marginLeft: "15px",
              fontFamily: "Open Sans",
            }}
          >
            <img src={LMSImage} alt={"LMSImage"} />
          </Grid>
          <Grid
            item
            className="content"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* image */}
            <Grid
              item
              className="image"
              style={{
                marginTop: "-60px",
                width: "85%",
                height: "85%",
                marginLeft: "15px",
              }}
            >
              <img
                src={loginImg}
                style={{
                  width: "230px",
                  height: "230px",
                  marginLeft: "94px",
                }}
                alt={"Logo"}
              />
            </Grid>
            <Grid
              item
              className="form"
              style={{
                marginTop: "2em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Grid
                  item
                  style={{
                    marginRight: "375px",
                  }}
                >
                  <img src={EmailIcon} alt={"EmailIcon"} />
                </Grid>

                {/* username */}
                <Grid
                  item
                  className="form-group"
                  style={{
                    marginLeft: "55px",
                    marginTop: "-65px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "fit-content",
                  }}
                >
                  <TextField
                    E-mail="standard-basic"
                    label="E-mail"
                    type="email"
                    value={Email}
                    onFocus={() => setError()}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      transition: "all 250ms ease-in-out",
                      marginTop: "6px",
                      fontSize: "16px",
                      height: "37px",
                      padding: "0px 10px",
                      marginBottom: "31px",
                      width: "340px",
                      marginLeft: " 20px",
                    }}
                  />
                </Grid>

                <Grid
                  item
                  style={{
                    marginRight: "375px",
                    marginTop: "20px",
                  }}
                >
                  <img src={PasswordIcon} alt={"PasswordICon"} />
                </Grid>
                {/* password */}

                <Grid
                  item
                  className="form-group"
                  style={{
                    marginLeft: "55px",
                    display: "flex",
                    marginTop: "-65px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "fit-content",
                  }}
                >
                  <TextField
                    Password="standard-basic"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setError()}
                    style={{
                      transition: "all 250ms ease-in-out",
                      marginTop: "6px",
                      fontSize: "16px",
                      height: "37px",
                      padding: "0px 10px",
                      marginBottom: "31px",
                      width: "340px",
                      marginLeft: " 20px",
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item>
                {error && <Typography color="error"> {error} </Typography>}
              </Grid>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                style={{
                  marginLeft: "330px",
                  marginTop: "25px",
                  width: "90px",
                  height: "45px",
                  fontSize: "20px",
                }}
                onClick={() => {
                  login();
                  UserInformation();
                  StudentInformation();
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

export default withRouter(LoginPage);
