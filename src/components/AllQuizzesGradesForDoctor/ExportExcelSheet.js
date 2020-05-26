import React, { useState, useEffect } from "react";

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

const ExportExcelSheet = ({ onClose, title, isOpened, onSubmit, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [methodInExcelSheet, setMethodInExcelSheet] = useState("");
  //----------------------------------------------------------------------------------------------------------

  const [TotalGradeMethods, setTotalGradeMethods] = useState([]);

  const handleTotalGradeMethod = (value, RadioTitle) => {
    {
      setTotalGradeMethods((prev) =>
        prev.map((choicee) =>
          choicee.title !== RadioTitle
            ? { ...choicee, Choice: 0 }
            : { ...choicee, Choice: value }
        )
      );
    }
    setMethodInExcelSheet(RadioTitle);
  };

  useEffect(() => {
    setTotalGradeMethods([
      {
        title: "Max",
        Choice: false,
      },
      {
        title: "Average",
        Choice: false,
      },
      {
        title: "Sum",
        Choice: false,
      },
      {
        title: "None",
        Choice: false,
      },
    ]);
  }, []);

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
                    <Typography style={{ fontSize: "30px" }}>
                      Methods in Excel Sheet :
                    </Typography>
                  </Grid>
                  {TotalGradeMethods.map(({ title, Choice }) => (
                    <Grid
                      item
                      style={{ marginLeft: "350px", marginTop: "-20px" }}
                    >
                      <Grid item>
                        <Typography style={{ fontSize: "25px" }}>
                          {title}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={{ marginTop: "-38px", marginLeft: "100px" }}
                      >
                        <Radio
                          checked={Choice}
                          onChange={(e) => {
                            handleTotalGradeMethod(e.target.checked, title);
                          }}
                          inputProps={{ "aria-label": "A" }}
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      </Grid>
                      {console.log("aly a5taro al dr.", methodInExcelSheet)}
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
                          disabled={methodInExcelSheet === ""}
                          onClick={() => {
                            onSubmit({
                              methodInExcelSheet,
                            });
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={
                              methodInExcelSheet === ""
                                ? classes.createText
                                : classes.boldText
                            }
                          >
                            Export
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

export default withStyles(styles)(ExportExcelSheet);
