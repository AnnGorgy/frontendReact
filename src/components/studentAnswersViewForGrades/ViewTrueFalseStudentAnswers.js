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

const ViewTrueFalseStudentAnswers = ({ questionData, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [TFData, setTFData] = useState([]);
  const [tfTrue, setTfTrue] = useState(null);
  const [tfFalse, setTfFalse] = useState(null);
  //---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setTFData(questionData);
  }, [questionData]);

  useEffect(() => {
    if (TFData.TrueOrFalse != null) {
      setTfTrue(TFData.TrueOrFalse);
      setTfFalse(!TFData.TrueOrFalse);
    }
  }, [TFData]);

  return (
    <React.Fragment>
      <Grid item>
        <Grid
          style={{
            align: "left",
            height: "auto",
            marginTop: "30px",
            marginRight: "9px",
            width: "1257px",
          }}
        >
          <Grid item style={{ marginLeft: "110px" }}>
            <Typography style={{ fontSize: "35px" }}>{TFData.title}</Typography>
          </Grid>

          <Grid>
            <TextField
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
                readOnly: true,
                style: { fontSize: "30px" },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
                shrink: "true",
                style: { fontSize: "20px" },
              }}
              style={{ width: "900px", marginLeft: "160px", marginTop: "40px" }}
            />
          </Grid>
          <Grid item style={{ marginLeft: "140px" }}>
            <Grid item style={{ marginLeft: "180px", paddingBottom: "40px" }}>
              <Grid item style={{ marginTop: "5px" }}>
                <Typography style={{ fontSize: "20px" }}>[ 1 ]</Typography>
              </Grid>
              <Grid item style={{ marginTop: "-40px", marginLeft: "70px" }}>
                <Typography
                  style={{
                    fontSize: "32px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  True
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "-43px", marginLeft: "200px" }}>
                <Radio
                  checked={tfTrue}
                  disableRipple
                  inputProps={{ "aria-label": "A" }}
                  classes={{ root: classes.radio, checked: classes.checked }}
                />
              </Grid>
            </Grid>
            <Grid item style={{ marginLeft: "180px", paddingBottom: "40px" }}>
              <Grid item style={{ marginTop: "5px" }}>
                <Typography style={{ fontSize: "20px" }}>[ 2 ]</Typography>
              </Grid>
              <Grid item style={{ marginTop: "-40px", marginLeft: "70px" }}>
                <Typography
                  style={{
                    fontSize: "32px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  False
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "-43px", marginLeft: "200px" }}>
                <Radio
                  checked={tfFalse}
                  inputProps={{ "aria-label": "A" }}
                  disableRipple
                  classes={{ root: classes.radio, checked: classes.checked }}
                />
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
    fontSize: "21px",
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
  radio: {
    "&$checked": {
      color: "#0e7c61",
    },
  },
  checked: {},
});

export default withStyles(styles)(ViewTrueFalseStudentAnswers);
