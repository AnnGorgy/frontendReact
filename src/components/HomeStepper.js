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
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
    "https://chpsis.cis.asu.edu.eg/assets/img/slider/4.jpg",
  },
  {
    number: "2",
    label: "Faculty of Computer And Informaton systems Ain Shams University",
    imgPath:
      "https://chpsis.cis.asu.edu.eg/assets/img/slider/2.jpg",
  },
  {
    number: "3",
    label: "Bali, Indonesia",
    imgPath:
      "https://chpsis.cis.asu.edu.eg/assets/img/slider/16.jpg",
  },
  {
    number: "4",
    label: "Bali, Indonesia",
    imgPath:
      "https://chpsis.cis.asu.edu.eg/assets/img/slider/3.jpg",
  },
  {
    number: "5",
    label: "Bali, Indonesia",
    imgPath:
      "https://chpsis.cis.asu.edu.eg/assets/img/slider/5.jpg",
  },
  {
    number: "6",
    label: "Bali, Indonesia",
    imgPath:
      "https://chpsis.cis.asu.edu.eg/assets/img/slider/6.jpg",
  },
  {
    number: "7",
    label: "Bali, Indonesia",
    imgPath:
      "https://chpsis.cis.asu.edu.eg/assets/img/slider/7.jpg",
  },
  {
    number: "8",
    label: "Bali, Indonesia",
    imgPath:
      "https://chpsis.cis.asu.edu.eg/assets/img/slider/8.jpg",
  },
  {
    number: "9",
    label: "Bali, Indonesia",
    imgPath:
      "https://chpsis.cis.asu.edu.eg/assets/img/slider/9.jpg",
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