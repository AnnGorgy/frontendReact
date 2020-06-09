import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  Button,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------------- Images ------------------------------------------------------
import Grades from "../QuizImages/Grades.png";
//-----------------------------------------------------------------------------------------------------------

const GradeDialog = ({
  onClose,
  title,
  isOpened,
  classes,
  grade,
  match,
  history,
  viewGrade,
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [StudentGradeee, setStudentGradeee] = useState();
  const [CheckAppear, setCheckAppear] = useState(false);
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setStudentGradeee(grade);
  }, [grade]);

  useEffect(() => {
    setCheckAppear(viewGrade);
  }, [viewGrade]);

  return (
    isOpened && (
      <Dialog
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
                  {CheckAppear === true && (
                    <Grid
                      container
                      justify="center"
                      style={{
                        padding: "10px 10px 10px 10px",
                        borderRadius: "16px",
                        border: "3px solid black",
                        width: "auto",
                        height: "auto",
                        marginTop: "20px",
                      }}
                    >
                      <Grid item>
                        <img
                          src={Grades}
                          alt="GradeImage"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{
                            marginLeft: "30px",
                            fontFamily: "Monaco",
                            fontSize: "30px",
                          }}
                        >
                          {`Your Grade : ${StudentGradeee}`}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  <Grid item style={{ marginLeft: "15px" }}>
                    <Typography style={{ fontSize: "30px" }}>
                      “ If you want to check the Correct answers wait untill the
                      quiz is end then you can see the model answers ”
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            onClose();
                            history.push(
                              `/quizstudent/${match.params.courseId}/${match.params.coursename}`
                            );
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
    minHeight: "40vh",
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

export default withStyles(styles)(withRouter(GradeDialog));
