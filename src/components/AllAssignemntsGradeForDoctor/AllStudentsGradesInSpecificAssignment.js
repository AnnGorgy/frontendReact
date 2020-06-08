import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

//------------------------------------------------- Icons ------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import EditGradesStudentForm from "../AllQuizzesGradesForDoctor/EditGradesStudentForm";
//-----------------------------------------------------------------------------------------------------------

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
  Button,
  Tooltip,
  Snackbar,
  useTheme,
  TableFooter,
  TablePagination,
  makeStyles,
  Select,
  FormControl,
  IconButton,
  InputBase,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

// -------------------------------------- table pagination with it's style ----------------------------------
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <Tooltip title="First Page" placement="bottom">
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Previous Page" placement="bottom">
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Next Page" placement="bottom">
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Last Page" placement="bottom">
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function  -------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const AllStudentsGradesInSpecificAssignment = ({
  match,
  classes,
  setCrumbs,
  reloadAssignmnets,
  setReloadAssignmnets,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allAssignment, setAllAssignment] = useState();
  const [displayedAssignemnt, setDisplayedAssignemnt] = useState();
  const [EditIsOpenAssignmnetGrade, setEditIsOpenAssignmentGrade] = useState(
    false
  );
  const [currentEditedAssignment, setCurrentEditedAssignment] = useState();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = useState("");
  const [coulmnToQuery, setCoulmnToQuery] = useState("studentName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, displayedAssignemnt?.length - page * rowsPerPage);
  //----------------------------------------------------------------------------------------------------

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
  const EditStudentAssignmentGrade = async (
    assignment,
    ChangedGrade,
    callback
  ) => {
    const url = "/Doctor_Manage_student/UpdateAssignmentGrade";
    await post(url, null, {
      params: {
        studentID: assignment.studentID,
        AssignmentID: match.params.assignemntId,
        Newgrade: ChangedGrade,
      },
    });
    setReloadAssignmnets(true);
    handleClick();
    if (callback) callback();
  };
  //--------------------------------------------------------------------------------------------------------

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  //-------------------------------------------------------------------------------------------------------
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //----------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const Url = `/Doctor_Manage_student/getAssignmentsGrades`;
    const { data } = await post(Url, null, {
      params: { AssignmentID: match.params.assignemntId },
    });
    setAllAssignment(data);
  };
  //--------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (allAssignment) {
      setDisplayedAssignemnt([...allAssignment]);
    }
  }, [allAssignment]);

  useEffect(() => {
    listQuizzes();
  }, [match.params.courseId]);

  useEffect(() => {
    if (reloadAssignmnets === true) {
      listQuizzes();
      setReloadAssignmnets(false);
    }
  }, [reloadAssignmnets]);

  useEffect(() => {
    if (query) {
      setDisplayedAssignemnt([
        ...allAssignment?.filter((x) =>
          x[coulmnToQuery].toLowerCase()?.includes(query.toLowerCase())
        ),
      ]);
    }
  }, [query, coulmnToQuery]);

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
      {
        label: match.params.assignmentname,
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 4)]);
        },
        Icon: FolderIcon,
      },
    ]);
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        className={classes.message}
      >
        <Alert onClose={handleClose} severity="success">
          {`${currentEditedAssignment?.studentName} assignment grade has been changed`}
        </Alert>
      </Snackbar>
      <EditGradesStudentForm
        title="Edit Assignment Grade"
        CurrentGrade={currentEditedAssignment?.Grade}
        isOpened={EditIsOpenAssignmnetGrade}
        onClose={() => setEditIsOpenAssignmentGrade(false)}
        onSubmit={({ ChangedGrade }) =>
          EditStudentAssignmentGrade(
            currentEditedAssignment,
            ChangedGrade,
            () => setEditIsOpenAssignmentGrade(false)
          )
        }
      />
      <TableContainer component={Paper} className={classes.tablePosition}>
        <Grid item style={{ backgroundColor: "#0c6170", padding: "20px" }}>
          <Grid item>
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search With assignment File Name"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item style={{ marginTop: "-40px", marginLeft: "450px" }}>
            <Tooltip title="Search Type" placement="bottom">
              <FormControl className={classes.formControl}>
                <Select
                  native
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={coulmnToQuery}
                  onChange={(event) => {
                    setCoulmnToQuery(event.target.value);
                  }}
                  style={{ backgroundColor: "white" }}
                >
                  <option value="studentName">Name</option>
                  <option value="SeatNo">Seat Number</option>
                </Select>
              </FormControl>
            </Tooltip>
          </Grid>
        </Grid>
        <Table
          style={{
            minWidth: 650,
          }}
          size="small"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader} width="30%">
                Student Name
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="center"
                width="20%"
              >
                SeatNo
              </TableCell>
              <TableCell
                className={classes.tableHeader}
                align="center"
                width="10%"
              >
                Grade
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                {}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? displayedAssignemnt?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : displayedAssignemnt
            )?.map((assignemnt, index) => (
              <TableRow
                key={index}
                style={
                  index % 2
                    ? { background: "#FFFFFF" }
                    : { background: "#FFFFFF" }
                }
              >
                {/* Student Name cell */}
                <TableCell width="30%">
                  <Grid container spacing={1}>
                    <Grid item>
                      <AssignmentIcon />
                    </Grid>
                    <Grid item>
                      <Typography>{assignemnt.studentName}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                {/* SeatNo cell */}
                <TableCell align="center" width="20%">
                  {assignemnt.SeatNo}
                </TableCell>
                {/* grade cell */}
                <TableCell
                  align="center"
                  width="10%"
                >{`${assignemnt.Grade} / ${assignemnt.AssignmentTotalGrade}`}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit Student Grade" placement="bottom">
                    <Button size="small">
                      <EditIcon
                        onClick={() => {
                          setEditIsOpenAssignmentGrade(true);
                          setCurrentEditedAssignment(assignemnt);
                        }}
                      />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                colSpan={3}
                count={displayedAssignemnt?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                backIconButtonProps={{
                  "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page",
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

const styles = (theme) => ({
  tablePosition: {
    maxHeight: "90vh",
    overflowY: "auto",
    maxWidth: "170vh",
    marginLeft: "28px",
  },
  tableHeader: {
    backgroundColor: "#0c6170",
    fontSize: "17px",
    color: "white",
    fontweight: "bold",
    fontFamily: '"Lucida Sans Unicode","Helvetica","Arial"',
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

export default withStyles(styles)(
  withRouter(AllStudentsGradesInSpecificAssignment)
);
