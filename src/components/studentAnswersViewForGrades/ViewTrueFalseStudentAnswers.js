import React, { useState, useEffect } from "react";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  TextField,
  withStyles,
  Grid,
  Typography,
  Radio,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const ViewTrueFalseStudentAnswers = ({
  /* questionIndex,setQuestions, */ questionData,
  classes,
}) => {
  const [TFData, setTFData] = useState([]);
  const [tfTrue, setTfTrue] = useState(false);
  const [tfFalse, setTfFalse] = useState(false);
  useEffect(() => {
    setTFData(questionData);
  }, [questionData]);

  useEffect(() => {
    setTfTrue(TFData.TrueOrFalse);
    setTfFalse(!TFData.TrueOrFalse);
  }, [TFData]);

  return (
    <React.Fragment>
      <Grid item>
        <Grid
          style={{
            align: "left",
            height: "100px",
            marginTop: "10px",
            marginRight: "9px",
            width: "1257px",
          }}
        >
          <Grid>
            <TextField
              placeholder="Enter The Title Of The Question"
              label="Title"
              variant="outlined"
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
              defaultValue={TFData.title}
              value={TFData.title}
              style={{ width: "500px", marginLeft: "160px" }}
            />
          </Grid>

          <Grid>
            <TextField
              placeholder="Enter Your Question"
              label="Question Statement"
              value={TFData.QuestionAsString}
              defaultValue={TFData.QuestionAsString}
              multiline
              rows={2}
              variant="outlined"
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
              style={{ width: "900px", marginLeft: "160px" }}
            />
          </Grid>
          <Grid item style={{ marginLeft: "140px" }}>
            <Grid item style={{ marginLeft: "180px", paddingBottom: "40px" }}>
              <Grid item>
                <Typography
                  style={{
                    fontSize: "35px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  True
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "-43px", marginLeft: "200px" }}>
                <Radio checked={tfTrue} inputProps={{ "aria-label": "A" }} />
              </Grid>
            </Grid>
            <Grid item style={{ marginLeft: "180px", paddingBottom: "40px" }}>
              <Grid item>
                <Typography
                  style={{
                    fontSize: "35px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  False
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "-43px", marginLeft: "200px" }}>
                <Radio checked={tfFalse} inputProps={{ "aria-label": "A" }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
const styles = (theme) => ({
  dialog: {
    padding: "10px 0px",
  },
  multilineColor: {
    color: "red",
  },
  titleContainer: {
    marginBottom: "18px",
  },
  textFieldRoot: {
    backgroundColor: "white",
    borderRadius: "7px",
    marginTop: "10px",
    marginBottom: "10px",
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
    minHeight: "50vh",
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

export default withStyles(styles)(ViewTrueFalseStudentAnswers);
