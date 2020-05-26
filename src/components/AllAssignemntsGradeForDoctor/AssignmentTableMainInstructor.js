import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//------------------------------ Another Components Used In This Component -------------------------------

//--------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
//--------------------------------------------------------------------------------------------------------

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
  Tooltip,
  withStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const AssignmentTableMainInstructor = ({
  classes,
  reloadAssigenmnt,
  setReloadAssignment,
  match,
  history,
  setCrumbs,
}) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listAssignments = async () => {
    const Url = `/Doctor_Manage_student/getAssignmentsNames`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId },
    });
    setAllAssignment(data);
  };

  //----------------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allAssignment, setAllAssignment] = useState();
  const [displayedAssignemnt, setDisplayedAssignemnt] = useState();
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (reloadAssigenmnt === true) {
      listAssignments();
      setReloadAssignment(false);
    }
  }, [reloadAssigenmnt]);

  useEffect(() => {
    if (allAssignment) {
      setDisplayedAssignemnt([...allAssignment]);
    }
  }, [allAssignment]);

  useEffect(() => {
    listAssignments();
  }, [match.params.courseId]);

  useEffect(() => {
    setCrumbs([
      {
        label: match.params.coursename,
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 1)]);
        },
        Icon: FolderIcon,
      },
      {
        label: "Grades",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 2)]);
        },
        Icon: FolderIcon,
      },
      {
        label: "Assignments",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 3)]);
        },
        Icon: FolderIcon,
      },
    ]);
  }, []);

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.tablePosition}>
        <Table
          style={{
            minWidth: 650,
          }}
          size="small"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            {/* The Header Of the Table That contains [1] Name ...  */}
            <TableRow>
              <TableCell className={classes.tableHeader}>
                Assignment Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedAssignemnt?.map((assignment, index) => (
              <Tooltip
                title={
                  <div style={{ fontSize: "14px" }}>
                    Double Click For Student Answers and Grades
                  </div>
                }
              >
                <TableRow
                  key={index}
                  onDoubleClick={() => {
                    history.push(
                      `/studentassignemntgrades/${assignment.name}/${match.params.coursename}/${match.params.courseId}/${assignment.id}`
                    );
                  }}
                  style={
                    index % 2
                      ? { background: "#FFFFFF" }
                      : { background: "#FFFFFF" }
                  }
                  style={{ cursor: "pointer" }}
                >
                  {/* Assignment Name cell */}
                  <TableCell>
                    <Grid container spacing={1}>
                      <Grid item>
                        <FolderIcon />
                      </Grid>
                      <Grid item>
                        <Typography>{assignment.name}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

const styles = () => ({
  tablePosition: {
    maxHeight: "90vh",
    overflowY: "auto",
    maxWidth: "170vh",
    marginLeft: "15px",
  },
  tableHeader: {
    backgroundColor: "#0c6170",
    fontSize: "17px",
    color: "white",
    fontweight: "bold",
    fontFamily: '"Lucida Sans Unicode","Helvetica","Arial"',
  },
});

export default withStyles(styles)(withRouter(AssignmentTableMainInstructor));
