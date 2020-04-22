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
import MCQ from "./MCQ";
import TrueFalse from "./TrueFalse";

// dh kona wa5dyno mn material ui aly hwa al goz2yn aly t7t dol bs m3rfna4 azay nrbotha bl mcq w al true w al false tb2a dynamic 

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
    maxWidth: 1257,
    flexGrow: 1,
    //marginTop:"100px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 60,
    webkitBoxShadow: "5px 5px 5px #9E9E9E",
    mozBoxShadow: "5px 5px 5px #9E9E9E",
    boxShadow: "5px 5px 5px #9E9E9E",
    //paddingLeft: theme.spacing(120),
    backgroundColor: theme.palette.background.default,
    font: 50,
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
        <Typography
          style={{
            marginLeft: "30px",
            fontFamily: "Monaco",
            fontSize: "25px",
            width: "140px",
            padding: "2px 2px 2px 20px",
            borderRadius: "16px",
            border: "3px solid black",
          }}
        >
          Question: {tutorialSteps[activeStep].number}
        </Typography>

        <TextField
          id="standard-basic"
          label="Enter Question Grade"
          style={{
            alignItems: "right",
            marginLeft: "360px",
            marginBottom: "20px",
          }}
          inputProps={{ style: { color: "black" } }}
          InputLabelProps={{ style: { color: "black" } }}
        />
        <FormGroup style={{ marginLeft: "240px" }}>
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
      {state.checkedA ? <MCQ /> : <TrueFalse />}
      <MobileStepper
        style={{
          width: "1241px",
          height: "20px",
          webkitBoxShadow: "5px 5px 5px #9E9E9E",
          mozBoxShadow: "5px 5px 5px #9E9E9E",
          boxShadow: "5px 5px 5px #9E9E9E",
          backgroundColor:"silver",
        }}
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
