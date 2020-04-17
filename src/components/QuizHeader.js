import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Grid, withStyles, Button, Typography } from "@material-ui/core";
import Quiz from "./Quiz";
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";

const QuizHeader = ({ classes }) => {
  const [OpenQuiz, setOpenQuiz] = useState(false);
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );

  return (
    <React.Fragment>
      <Quiz isOpened={OpenQuiz} onClose={() => setOpenQuiz(false)} />
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.tableHeader}
      >
        {accountType == 2 && (
          <Grid item>
            <Button
              onClick={() => setOpenQuiz(true)}
              className={classes.addButton}
              size="small"
            >
              <Grid
                container
                spacing={1}
                alignItems="center"
                className={classes.addButtonBody}
              >
                <Grid item>
                  <AddMaterialIcon className={classes.addIcon} />
                </Grid>
                <Grid item>
                  <Typography className={classes.buttonText}>
                    Add New Quiz
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};
const styles = () => ({
  addButton: {
    borderRadius: "16px",
    width: "180px",
    color: "black",
    backgroundColor: "#7dbbb9",
    "&:hover, &:focus": {
      backgroundColor: "#CCE6E5",
      color: "black",
    },
  },
  addIcon: {
    marginTop: "4px",
  },
  buttonText: {
    color: "black",
    paddingLeft:"5px"
  },
  addButtonBody: {
    marginLeft: "4px",
    marginRight: "4px",
  },
  tableHeader: {
    paddingRight: "20px",
    paddingLeft: "1000px",
    marginTop: "20px",
    flexWrap: "nowrap",
  },
});

export default withStyles(styles)(withRouter(QuizHeader));
