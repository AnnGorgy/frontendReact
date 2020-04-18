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
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    number: "2",
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    number: "3",
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    number: "4",
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    number: "5",
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1270,
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
    maxWidth: 1270,
    overflow: "hidden",
    display: "block",
    width: "100%",
  },
}));
const QuestionTypeSwitch = withStyles({
  switchBase: {
    color: "#00867d",
    "&$checked": {
      color: "#00867d",
    },
    "&$checked + $track": {
      backgroundColor: "#005b4f",
    },
  },
  checked: {},
  track: {},
})(Switch);

const QuizStepper = () => {
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
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <TextField
          label="Question:  "
          value={tutorialSteps[activeStep].number}
          disabled="true"
          style={{ width: "100px",marginLeft:"10px" }}
          InputLabelProps={{ style: { color: "black" , fontSize:"30px" } }}
          inputProps={{ style: { color: "black" ,marginLeft:"90px" , paddingTop:"17px"} }}
        />

        <TextField
          id="standard-basic"
          label="Enter Question Grade"
          style={{ alignItems: "right", marginLeft: "480px" }}
          inputProps={{ style: { color: "black" } }}
          InputLabelProps={{ style: { color: "black" } }}
        />
        <FormGroup style={{ marginLeft: "280px" }}>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>True/False</Grid>
              <Grid item>
                <QuestionTypeSwitch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                />
              </Grid>
              <Grid item>MCQ</Grid>
            </Grid>
          </Typography>
        </FormGroup>
      </Paper>
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
export default withStyles(useStyles)(withRouter(QuizStepper));
