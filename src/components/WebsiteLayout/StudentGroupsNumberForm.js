import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { post } from "axios";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const StudentGroupsNumberForm = ({
  history,
  title,
  isOpened,
  classes,
  CourseIDD,
  CourseNamee,
  match
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [NumberOfGroupsforStudents, setNumberOfGroupsforStudents] = useState(0);
  //----------------------------------------------------------------------------------------------------------

  // ----------------------------------------- Api calls ----------------------------------------------------
  const AddNumberOfGroups = async () => {
    try {
      const StudentsUrl = `http://localhost:4375/api/Subject/GetStudentsEnrolledInSubject`;
      /*  
        post syntax (
         url " StudentsUrl (The local host that Get Students That Enrolled In Subject that the Instructor Choose) ",
         body "no body cause this function use parametares", 
         options "It takes (3) Parameters"
         [1] SubjectId ... [2] semesterId ... [3] currentYear
         ) 
        */
      const { data } = await post(StudentsUrl, null, {
        params: {
          subjectId: CourseIDD,
          semesterId: JSON.parse(localStorage.getItem("subjects")).find(
            (subject) => subject.ID == match.params.courseId
          ).SemesterID,
          currentYear: JSON.parse(localStorage.getItem("subjects")).find(
            (subject) => subject.ID == match.params.courseId
          ).currentYear,
        },
      });
      const url2 = "/DoctorManagestudentsGroups/SetGroupForStudents";
      await post(url2, data, {
        params: {
          subjectID: CourseIDD,
          NumberOfGroups: NumberOfGroupsforStudents,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  // -------------------------------------------------------------------------------------------------------
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
                  <Grid item>
                    <Typography style={{ fontSize: "25px", fontWeight: 600 }}>
                      Please Enter Number of Groups For You Students:
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "650px" }}>
                    <TextField
                      label="Number Of Groups"
                      value={NumberOfGroupsforStudents}
                      type="number"
                      variant="outlined"
                      onChange={(e) => {
                        setNumberOfGroupsforStudents(Number(e.target.value));
                      }}
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                      style={{ width: "230px" }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.createButton}
                          disabled={NumberOfGroupsforStudents == 0}
                          onClick={() => {
                            AddNumberOfGroups();
                            history.push(`/course/${CourseIDD}/${CourseNamee}`);
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={
                              NumberOfGroupsforStudents == 0
                                ? classes.createText
                                : classes.boldText
                            }
                          >
                            Create
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
    minWidth: "120vh",
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

export default withStyles(styles)(withRouter(StudentGroupsNumberForm));
