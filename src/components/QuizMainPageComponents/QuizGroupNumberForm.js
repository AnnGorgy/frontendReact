import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  Button,
  Checkbox,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const QuizGroupNumberForm = ({
  onClose,
  title,
  isOpened,
  quizId,
  classes,
  match,
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [NumberOfGroups, setNumberOfGroups] = useState([]);
  //----------------------------------------------------------------------------------------------------------

  const GetNumberOfGroups = async () => {
    const Url = `/DoctorMakeQuiz/GetQuizGroupsToupdate`;
    const { data } = await post(Url, null, {
      params: { subjectID: match.params.courseId, QuizID: quizId },
    });
    setNumberOfGroups(data);
  };

  useEffect(() => {
    if (quizId) {
      GetNumberOfGroups();
    }
  }, [quizId, match.params.courseId]);

  return (
    isOpened && (
      <Dialog
        onClose={() => {
          onClose();
        }}
        open={isOpened}
        maxWidth="sm"
        fullWidth
        PaperProps={{ className: classes.dialogPaper }}
      >
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justify="center"
          className={classes.dialog}
        >
          <Grid item className={classes.titleContainer}>
            <Typography
              variant="h3"
              className={classes.boldText}
              align="center"
            >
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify="space-around">
              <Grid item xs={11}>
                <Grid
                  container
                  direction="column"
                  alignItems="stretch"
                  justify="center"
                  spacing={3}
                >
                  <Grid item>
                    <Grid
                      item
                      style={{ marginTop: "30px" }}
                    >
                      <Grid item>
                        <Typography style={{ fontSize: "25px" }}>
                          Groups :
                        </Typography>
                      </Grid>
                      <Grid item style={{marginLeft:"100px"}}>
                        {NumberOfGroups.map((choosee) => (
                          <Grid item>
                            {choosee.choose === true && (
                              <Grid item>
                                <Grid item>
                                  <Typography style={{ fontSize: "25px" }}>
                                    {choosee.number}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  style={{
                                    marginTop: "-41px",
                                    marginLeft: "40px",
                                  }}
                                >
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    checked={choosee.choose}
                                    disableRipple
                                    classes={{
                                      root: classes.check,
                                      checked: classes.checked,
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            onClose();
                            setNumberOfGroups([]);
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={classes.boldText}
                            color="error"
                          >
                            Close
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    )
  );
};

// Dialog styles
const styles = () => ({
  dialog: {
    padding: "10px 0px",
  },
  titleContainer: {
    marginBottom: "18px",
  },
  textFieldRoot: {
    backgroundColor: "white",
    borderRadius: "7px",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `black !important`,
  },
  label: {
    color: "black !important",
    fontWeight: "600",
  },
  dialogPaper: {
    minHeight: "25vh",
    padding: "20px 0px",
  },
  createButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px black solid",
  },
  cancelButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px red solid",
  },
  boldText: {
    fontWeight: "600",
  },
  createText: {
    color: "silver",
  },
});

export default withStyles(styles)(withRouter(QuizGroupNumberForm));
