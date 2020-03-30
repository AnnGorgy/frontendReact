import React from "react";
import loginImg from "./Images/logo.png";
import PasswordIcon from "./Images/PasswordIcon.png";
import EmailIcon from "./Images/EmailIcon.png";
import LMSImage from "./Images/LMS.png";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="base-container"
        ref={this.props.containerRef}
        style={{
          width: "100%",
          height: "106%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div
          className="header"
          style={{
            marginTop: "-50px",
            fontSize: "22px",
            fontFamily: "Open Sans"
          }}
        >
          {" "}
          <img src={LMSImage} />{" "}
        </div>
        <div
          className="content"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* image */}
          <div
            className="image"
            style={{ marginTop: "-70px", width: "85%", height: "85%" }}
          >
            <img
              src={loginImg}
              style={{ width: "230px", height: "230px", marginLeft: "80px" }}
            />
          </div>
          <div
            className="form"
            style={{
              marginTop: "2em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ position: "fixed", bottom: "42%", left: "36.5%" }}>
              <img src={EmailIcon} />
            </div>

            {/* username */}
            <div
              className="form-group"
              style={{
                marginLeft: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "fit-content"
              }}
            >
              <label htmlFor="username" style={{ fontSize: "20px" }}>
                E-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your E-mail"
                style={{
                  transition: "all 250ms ease-in-out",
                  borderRadius: "4px",
                  fontFamily: "Open Sans', sans-serif",
                  minWidth: "18em",
                  marginTop: "6px",
                  fontSize: "16px",
                  backgroundColor: "#f3f3f3",
                  border: "0",
                  height: "37px",
                  padding: "0px 10px",
                  marginBottom: "31px"
                }}
              />
            </div>

            <div style={{ position: "fixed", bottom: "29%", left: "36.5%" }}>
              <img src={PasswordIcon} />
            </div>
            {/* password */}
            <div
              className="form-group"
              style={{
                marginLeft: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "fit-content"
              }}
            >
              <label for="password;" style={{ fontSize: "20px" }}>
                {" "}
                Password{" "}
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                style={{
                  transition: "all 250ms ease-in-out",
                  borderRadius: "4px",
                  fontFamily: "Open Sans', sans-serif",
                  minWidth: "18em",
                  marginTop: "6px",
                  fontSize: "16px",
                  backgroundColor: "#f3f3f3",
                  border: "0",
                  height: "37px",
                  padding: "0px 10px",
                  marginBottom: "31px"
                }}
              />
            </div>
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: "#3a6364",
                marginLeft: "330px",
                marginTop: '10px',
                borderRadius : '4px',
                borderWidth : '5px',
                fontSize: "22px"
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;
