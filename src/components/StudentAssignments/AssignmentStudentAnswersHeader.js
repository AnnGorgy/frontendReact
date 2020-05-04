import React, { useState } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import {
  Grid,
  withStyles,
  Button,
  Typography,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import UploadAssignmentAnswers from "./UploadAssignmentAnswers";
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { BreadCrumbs } from "../";
import MuiAlert from "@material-ui/lab/Alert";

//--------------------------------------  Message Function and It's style -----------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
//-----------------------------------------------------------------------------------------------------------

const AssignmentStudentAnswersHeader = ({
  crumbs,
  classes,
  setReloadAssignments,
  match,
}) => {
  const [OpenAssignment, setOpenAssignment] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [MessageTitle, setMessageTitle] = useState("");

  // ---------------------- we use it To Show The Message after every operation --------------------------
  const handleClick = () => {
    setOpen(true);
  };
  // -------------------------------------------------------------------------------------------------------

  // --------------- we use it To hide The Message that will appear after  every operation -----------------
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // -------------------------------------------------------------------------------------------------------

  const UploadAssignment = async ({ AssName, file, callback }) => {
    const url = "/Student_Answers/upload_Assignment_Answer";
    const formData = new FormData();
    formData.append("Document", file);
    try {
      // post syntax (url, body, options)
      await post(url, formData, {
        params: {
          Parent_ID: crumbs[crumbs.length - 1].id,
          Assignment_Id: 2,
          Name: AssName,
          Student_ID: 1,
        },
      });
      setReloadAssignments(true);
      setMessageTitle(AssName);
      handleClick();
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        style={{
          Width: "150px",
          height: "150px",
          position: "absolute",
          zIndex: 9999,
        }}
      >
        <Alert onClose={handleClose} severity="success">
          {MessageTitle} has been uploaded
        </Alert>
      </Snackbar>
      <UploadAssignmentAnswers
        isOpened={OpenAssignment}
        onClose={() => setOpenAssignment(false)}
        onSubmit={({ AssName, blobs }) =>
          UploadAssignment({
            AssName,
            file: blobs,
            callback: () => setOpenAssignment(false),
          })
        }
      />
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.tableHeader}
      >
        <Grid item xs={7}>
          {crumbs?.length ? (
            <BreadCrumbs crumbs={crumbs} />
          ) : (
            <React.Fragment />
          )}
        </Grid>
        {crumbs.length != 1 && (
          <Grid item>
            <Button
              onClick={() => setOpenAssignment(true)}
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
                    Add new answers
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
  breadCrumpContainer: {
    maxWidth: "100%",
  },
  addButton: {
    borderRadius: "16px",
    width: "200px",
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
  },
  addButtonBody: {
    marginLeft: "4px",
    marginRight: "4px",
  },
  tableHeader: {
    paddingRight: "20px",
    paddingLeft: "20px",
    marginTop: "8px",
    flexWrap: "nowrap",
  },
  noWrap: {
    flexWrap: "nowrap",
  },
});

export default withStyles(styles)(withRouter(AssignmentStudentAnswersHeader));
