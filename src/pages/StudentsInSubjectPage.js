import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { post } from "axios";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import {
  SideBar,
  AllStudentsInSubjectHeaderMain,
  StudentsInSubject,
} from "../components";
//-----------------------------------------------------------------------------------------------------------

const StudentsInSubjectPage = ({ reloadStudents, match, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [crumbs, setCrumbs] = useState([]);
  const [reloadStudentss, setReloadStudentss] = useState(false);
  //----------------------------------------------------------------------------------------------------------

  return (
    <Grid container style={{ flexWrap: "nowrap" }}>
      {/* Navigation bar */}
      <Grid item xs={2}>
        <SideBar />
      </Grid>

      <Grid item xs={10}>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justify="center"
          spacing={1}
          style={{ flexWrap: "nowrap" }}
        >
          <Grid item>
            <AllStudentsInSubjectHeaderMain
              crumbs={crumbs}
              setReloadStudents={setReloadStudentss}
            />
          </Grid>
          <Grid item>
            <StudentsInSubject
              setCrumbs={setCrumbs}
              reloadStudents={reloadStudentss}
              setReloadStudents={setReloadStudentss}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = () => ({
  tableHeader: {
    backgroundColor: "#0c6170",
    fontSize: "17px",
    color: "white",
    fontweight: "bold",
    fontFamily: '"Lucida Sans Unicode","Helvetica","Arial"',
  },
  tablePosition: {
    maxHeight: "90vh",
    overflowY: "auto",
    maxWidth: "165vh",
    marginLeft: "28px",
    marginTop: "20px",
  },
  mainPage: {
    flexWrap: "nowrap",
  },
});

export default withStyles(styles)(withRouter(StudentsInSubjectPage));
