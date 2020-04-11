import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import loginImg from "./Images/logo.png";
import PasswordIcon from "./Images/PasswordIcon.png";
import EmailIcon from "./Images/EmailIcon.png";
import LMSImage from "./Images/LMS.png";
import background from "./Images/background.jpg";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";


import { post, get } from "axios";
import { Typography, OutlinedInput } from "@material-ui/core";

const LoginPage = ({ history }) => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

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
      setError(`Your email and password don't match our records`);
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

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "720px",
      }}
    >
      <Paper
        className="base-container"
        style={{
          width: "30%",
          height: "90%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          border: "6px solid black",
          borderRadius: "64px",
          marginLeft: "950px",
          webkitBoxShadow: "12px 12px 12px #9E9E9E",
          mozBoxShadow: "12px 12px 12px #9E9E9E",
          boxShadow: "12px 12px 12px #9E9E9E",
        }}
      >
        <div
          className="header"
          style={{
            marginTop: "-50px",
            fontSize: "22px",
            fontFamily: "Open Sans",
          }}
        >
          <img src={LMSImage} alt={"LMSImage"} />
        </div>
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* image */}
          <div
            className="image"
            style={{
              marginTop: "-70px",
              width: "85%",
              height: "85%",
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
          </div>
          <div
            className="form"
            style={{
              marginTop: "2em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "fixed",
                bottom: "40%",
                left: "63%",
              }}
            >
              <img src={EmailIcon} alt={"EmailIcon"} />
            </div>

            {/* username */}
            <div
              className="form-group"
              style={{
                marginLeft: "30px",
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
            </div>

            <div
              style={{
                position: "fixed",
                bottom: "30%",
                left: "63%",
              }}
            >
              <img src={PasswordIcon} alt={"PasswordICon"} />
            </div>
            {/* password */}

            <div
              className="form-group"
              style={{
                marginLeft: "30px",
                display: "flex",
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
            </div>
            <div>
              {error && <Typography color="error"> {error} </Typography>}
            </div>
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
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};



export default withRouter(LoginPage);
