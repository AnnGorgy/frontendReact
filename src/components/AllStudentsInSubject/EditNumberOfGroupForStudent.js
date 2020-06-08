import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  Radio,
  Button,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const EditNumberOfGroupForStudent = ({
  onClose,
  title,
  isOpened,
  onSubmit,
  classes,
  match,
  CurrentGroup
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [ChosenNumberOfGroup, setChosenNumberOfGroup] = useState(0);
  const [AvilableNumberOfGroups, setAvilableNumberOfGroups] = useState([]);
  //----------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------- Api Calls -------------------------------------------
  const GetNumberOfGroups = async () => {
    const Url = `/DoctorManagestudentsGroups/StudentGroups`;
    const { data } = await post(Url, null, {
      params: { SubjectID: match.params.courseId },
    });

    setAvilableNumberOfGroups(data);
  };
  //----------------------------------------------------------------------------------------------------------

  const handleTotalGradeMethod = (value, RadioTitle) => {
    {
      setAvilableNumberOfGroups((prev) =>
        prev.map((choicee) =>
          choicee.number !== RadioTitle
            ? { ...choicee, choose: 0 }
            : { ...choicee, choose: value }
        )
      );
    }
      setChosenNumberOfGroup(RadioTitle);
  };

  useEffect(() => {
    GetNumberOfGroups();
  }, []);

  useEffect(() => {
    handleTotalGradeMethod(true,CurrentGroup);
  }, [CurrentGroup]);

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
                    <Typography style={{ fontSize: "30px" }}>
                      Available Student Groups :
                    </Typography>
                  </Grid>
                  {AvilableNumberOfGroups.map(({ number, choose }) => (
                    <Grid
                      item
                      style={{ marginLeft: "350px", marginTop: "-20px" }}
                    >
                      <Grid item>
                        <Typography style={{ fontSize: "25px" }}>
                          {number}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={{ marginTop: "-38px", marginLeft: "70px" }}
                      >
                        <Radio
                          checked={choose}
                          onChange={(e) => {
                            handleTotalGradeMethod(e.target.checked, number);
                          }}
                          inputProps={{ "aria-label": "A" }}
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            onClose();
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
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.createButton}
                          disabled={ ChosenNumberOfGroup == CurrentGroup }
                          onClick={() => {
                            onSubmit({
                              ChosenNumberOfGroup,
                            });
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={
                               ChosenNumberOfGroup == CurrentGroup 
                                ? classes.createText
                                : classes.boldText
                            }
                          >
                            Update
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

export default withStyles(styles)(withRouter(EditNumberOfGroupForStudent));
