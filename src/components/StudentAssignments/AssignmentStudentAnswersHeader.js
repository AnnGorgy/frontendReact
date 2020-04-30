import React, { useState } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import { Grid, withStyles, Button, Typography } from "@material-ui/core";
import UploadAssignmentAnswers from "./UploadAssignmentAnswers";
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";

const AssignmentStudentAnswersHeader = ({
  classes,
  setReloadAssignments,
  match,
}) => {
  const [OpenAssignment, setOpenAssignment] = useState(false);
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );

  const UploadAssignment = async ({ AssName, file, callback }) => {
    const url = "/Student_Answers/upload_Assignment_Answer";
    const formData = new FormData();
    formData.append("Document", file);
    try {
      // post syntax (url, body, options)
      await post(url, formData, {
        params: {
          Parent_ID: 1,
          Assignment_Id: 4,
          Name: AssName,
          Student_ID: 1,
        },
      });
      setReloadAssignments(true);
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
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
      </Grid>
    </React.Fragment>
  );
};
const styles = () => ({
  addButton: {
    borderRadius: "16px",
    width: "220px",
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
    paddingLeft: "5px",
  },
  addButtonBody: {
    marginLeft: "4px",
    marginRight: "4px",
  },
  tableHeader: {
    paddingRight: "20px",
    paddingLeft: "1000px",
    marginTop: "20px",
    marginLeft: "30px",
    flexWrap: "nowrap",
  },
});

export default withStyles(styles)(withRouter(AssignmentStudentAnswersHeader));
