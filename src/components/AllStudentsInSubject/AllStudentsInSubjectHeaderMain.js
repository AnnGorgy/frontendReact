import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { post } from "axios";
import MuiAlert from "@material-ui/lab/Alert";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  withStyles,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Icons -----------------------------------------------
import EditIcon from "@material-ui/icons/Edit";
// --------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component -------------------------------
import { BreadCrumbs } from "..";
import EditStudentGroupForm from "./EditStudentGroupForm";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function  -------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const AllStudentsInSubjectHeaderMain = ({
  classes,
  match,
  history,
  crumbs,
  setReloadStudents,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [
    EditIsOpenChangeStudentGroup,
    setEditIsOpenChangeStudentGroup,
  ] = useState(false);
  const [NumOfGroups, setNumOfGroups] = useState(0);
  const [Checked, setChecked] = useState(false);
  const [open, setOpen] = React.useState(false);
  //------------------------------------------------------------------------------------------------------
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
  // ---------------------------------------------------- Api Calls ---------------------------------------
  const EditNumberOfGroups = async (Group, callback) => {
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
          subjectId: match.params.courseId,
          semesterId: JSON.parse(localStorage.getItem("subjects")).find(
            (subject) => subject.ID == match.params.courseId
          ).SemesterID,
          currentYear: JSON.parse(localStorage.getItem("subjects")).find(
            (subject) => subject.ID == match.params.courseId
          ).currentYear,
        },
      });
      const url2 = "/DoctorManagestudentsGroups/UpdateStudentsGroup";
      await post(url2, data, {
        params: {
          subjectID: match.params.courseId,
          NumberOfGroups: Group,
        },
      });
      setReloadStudents(true);
      handleClick();
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };
  // ------------------------------------------------------------------------------------------------------
  const GetNumberOfGroups = async () => {
    const Url = `/DoctorManagestudentsGroups/NumberOfGroups`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId },
    });

    setNumOfGroups(data);
  };
  //----------------------------------------------------------------------------------------------------------
  const CheckedAvilabiltiyOfChangingTheGroupNumberOfstudent = async () => {
    const Url = `/DoctorManagestudentsGroups/UpdateGroupsNoAvailable`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId },
    });

    setChecked(data);
  };
  //---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    GetNumberOfGroups();
    CheckedAvilabiltiyOfChangingTheGroupNumberOfstudent();
  }, [match.params.courseId]);
  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        className={classes.message}
      >
        <Alert onClose={handleClose} severity="success">
          {`${match.params.coursename} group number has been changed`}
        </Alert>
      </Snackbar>
      <EditStudentGroupForm
        title="Edit Number of Groups"
        CurrentStudentGroup={NumOfGroups}
        isOpened={EditIsOpenChangeStudentGroup}
        onClose={() => setEditIsOpenChangeStudentGroup(false)}
        onSubmit={({ ChangedStudentGroup }) =>
          EditNumberOfGroups(ChangedStudentGroup, () =>
            setEditIsOpenChangeStudentGroup(false)
          )
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
        {crumbs.length == 1 &&
          history.push(
            `/course/${match.params.courseId}/${match.params.coursename}`
          )}
        <Grid
          item
          style={{
            borderRadius: "16px",
            border: "0px solid black",
            backgroundColor: "#0c6170",
            padding: "9px",
          }}
        >
          <Typography
            style={{ color: "white" }}
          >{`Number Of Groups : ${NumOfGroups}`}</Typography>
        </Grid>
        {Checked === true && (
          <Grid item>
            <Button
              onClick={() => setEditIsOpenChangeStudentGroup(true)}
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
                  <EditIcon className={classes.addIcon} />
                </Grid>
                <Grid item>
                  <Typography className={classes.buttonText}>
                    Update Number Of Groups
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
const styles = (theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  breadCrumpContainer: {
    maxWidth: "100%",
  },
  addButton: {
    borderRadius: "16px",
    width: "280px",
    color: "white",
    backgroundColor: "#0c6170",
    "&:hover, &:focus": {
      backgroundColor: "#3C808C",
      color: "black",
    },
  },
  addIcon: {
    marginTop: "4px",
  },
  buttonText: {
    "&:hover, &:focus": { color: "black" },
    color: "white",
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
  message: {
    Width: "150px",
    height: "150px",
    position: "absolute",
    zIndex: 9999,
  },
});

export default withStyles(styles)(withRouter(AllStudentsInSubjectHeaderMain));
