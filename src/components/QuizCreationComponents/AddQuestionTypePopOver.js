import React from "react";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Popover,
  Grid,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Images ---------------------------------------------------
import MatchIcon from "../QuizImages/MatchIcon.png";
import MultipeChoiceIcon from "../QuizImages/MultipeChoiceIcon.png";
import TrueOrFalseIcon from "../QuizImages/TrueOrFalseIcon.png";
//-----------------------------------------------------------------------------------------------------------

const AddQuestionTypePopOver = ({
  createButtonReference,
  setCreateButtonReference,
  onClick,
  classes,
}) => {
  return (
    Boolean(createButtonReference) && (
      <Popover
        open={Boolean(createButtonReference)}
        anchorEl={createButtonReference}
        onClose={() => setCreateButtonReference(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid container direction="column" alignItems="stretch">
          <Grid item>
            <Button
              className={classes.optionButton}
              onClick={() => onClick("mcq")}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <img
                    src={MultipeChoiceIcon}
                    alt="McqIcon"
                    style={{
                      marginTop: "4px",
                      fontSize: "30px",
                      color: "#5e5e5e",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography style={{fontWeight: "550",}} variant="h6">
                    Add New MCQ
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.optionButton}
              onClick={() => onClick("tf")}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <img
                    src={TrueOrFalseIcon}
                    alt="TfIcon"
                    className={classes.optionIcon}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.optionText} variant="h6">
                    Add New True or False
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.optionButton}
              onClick={() => onClick("match")}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <img
                    src={MatchIcon}
                    alt="MatchIcon"
                    className={classes.optionIcon}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.optionText} variant="h6">
                    Add New Match
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Popover>
    )
  );
};

const styles = () => ({
  optionButton: {
    width: "280px",
  },
  optionText: {
    fontWeight: "550",
    paddingLeft: "10px",
  },
  optionIcon: {
    marginTop: "4px",
    fontSize: "30px",
    color: "#5e5e5e",
  },
});

export default withStyles(styles)(AddQuestionTypePopOver);
