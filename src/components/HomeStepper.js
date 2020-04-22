import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { withRouter } from "react-router-dom";
import { Grid, withStyles } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

import FormGroup from "@material-ui/core/FormGroup";


const tutorialSteps = [
  {
    number: "1",
    label: "Faculty of Computer And Informaton systems Ain Shams University upclose",
    imgPath:
    "https://i.imgur.com/JA0VyoS.jpg",
  },
  {
    number: "2",
    label: "Faculty of Computer And Informaton systems Ain Shams University",
    imgPath:
      "https://i.imgur.com/vN3Pqfw.jpg",
  },
  {
    number: "3",
    label: " some of FCIS staff members",
    imgPath:
      "https://i.imgur.com/HFvTQ7l.jpg",
  },
  {
    number: "4",
    label: "some of FCIS staff members",
    imgPath:
      "https://i.imgur.com/IOAN7EU.jpg",
  },
 
  {
    number: "5",
    label: "one of FCIS's knowledge sessions",
    imgPath:
      "https://i.imgur.com/Rv0JGpt.jpg",
  },
  {
    number: "6",
    label: "FCIS Students receiving certificates",
    imgPath:
      "https://i.imgur.com/l3NPbjY.jpg",
  },
  {
    number: "7",
    label: "FCIS Students receiving certificates",
    imgPath:
      "https://i.imgur.com/Ap3apRR.jpg",
  },
  {
    number: "8",
    label: "FCIS Instructors with students",
    imgPath:
      "https://i.imgur.com/yuR8cuI.jpg",
  },
  {
    number: "9",
    label: "FCIS Instructors with students",
    imgPath:
      "https://i.imgur.com/gO7envx.jpg",
  },
  {
    number: "10",
    label: "FCIS students attending lecture",
    imgPath:
      "https://i.imgur.com/vWY1w0U.jpg",
  },
  {
    number: "11",
    label: "FCIS students attending knowledge session",
    imgPath:
      "https://i.imgur.com/ZINgYps.jpg",
  },
  {
    number: "12",
    label: "FCIS students celebration",
    imgPath:
      "https://i.imgur.com/FoFMZX7.jpg",
  },
  {
    number: "13",
    label: "FCIS ACM students in ACPC ",
    imgPath:
      "https://i.imgur.com/qDV9x0Y.jpg",
  },
  {
    number: "14",
    label: "FCIS students in various student activities ",
    imgPath:
      "https://i.imgur.com/qDV9x0Y.jpg",
  },
  {
    number: "15",
    label: "FCIS students in various student activities ",
    imgPath:
      "https://i.imgur.com/pRiy7nb.jpg",
  },
  {
    number: "16",
    label: "FCIS students in various student activities ",
    imgPath:
      "https://i.imgur.com/uOIArJT.jpg",
  },
  {
    number: "17",
    label: "FCIS students in various student activities ",
    imgPath:
      "https://i.imgur.com/s3hLql3.jpg",
  },
  
 
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1100,
    flexGrow: 1,
    //marginTop:"100px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 60,
    //paddingLeft: theme.spacing(120),
    backgroundColor: theme.palette.background.default,
    font: 50,
  },
  img: {
    height: 500,
    maxWidth: 1100,
    overflow: "hidden",
    display: "block",
    width: "100%",
  },
}));


const HomeStepper = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;
  const [state, setState] = React.useState({
    checkedA: true,
  });
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root} style={{marginLeft:"250px",marginTop:"50px"}}>
    
      <img
        className={classes.img}
        src={tutorialSteps[activeStep].imgPath}
        alt={tutorialSteps[activeStep].label}
      />
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
};
export default withStyles(useStyles)(withRouter(HomeStepper));