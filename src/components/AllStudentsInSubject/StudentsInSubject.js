import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { post } from "axios";
import PropTypes from "prop-types";
import MuiAlert from "@material-ui/lab/Alert";
//--------------------------------- What was used from material ui core -------------------------------------
import {
  Table,
  TableBody,
  TableCell,
  Tooltip,
  TableContainer,
  Button,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  withStyles,
  Snackbar,
  Select,
  FormControl,
  useTheme,
  TablePagination,
  TableFooter,
  IconButton,
  InputBase,
  makeStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import EditNumberOfGroupForStudent from "./EditNumberOfGroupForStudent";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------------- Icons ---------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
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

//------------------------------------------------------------------------------------------------------------
//--------------------------------------  Message Function  -------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const StudentsInSubject = ({
  match,
  classes,
  setCrumbs,
  reloadStudents,
  setReloadStudents,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [open, setOpen] = React.useState(false);
  const [allStudents, setAllStudents] = useState();
  const [displayedStudents, setDisplayedStudents] = useState();
  const [
    EditIsOpenChangeStudentGroup,
    setEditIsOpenChangeStudentGroup,
  ] = useState(false);
  const [currentEditedStudentGroup, setCurrentEditedStudentGroup] = useState();
  const [query, setQuery] = useState("");
  const [coulmnToQuery, setCoulmnToQuery] = useState("studentNameAR");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, displayedStudents?.length - page * rowsPerPage);
  //--------------------------------------------------------------------------------------------------------
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
  // ------------------------------------- API Calls ---------------------------------------------------------
  const listStudents = async () => {
    const StudentsUrl = `/DoctorManagestudentsGroups/GetEnrolledStudentsForSubject`;

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
      },
    });

    setAllStudents(data);
  };
  //--------------------------------------------------------------------------------------------------------
  const EditStudentGroup = async (Group, student, callback) => {
    const url = "/DoctorManagestudentsGroups/updateStudentGroup";
    await post(url, null, {
      params: {
        StudentID: student.StudentID,
        SubjectID: match.params.courseId,
        NewNumber: Group,
      },
    });
    handleClick();
    setReloadStudents(true);
    if (callback) callback();
  };
  //--------------------------------------------------------------------------------------------------------
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (reloadStudents === true) {
      listStudents();
      setReloadStudents(false);
      window.location.reload();
    }
  }, [reloadStudents]);

  useEffect(() => {
    listStudents();
  }, [match.params.courseId]);

  useEffect(() => {
    if (allStudents) {
      setDisplayedStudents([...allStudents]);
    }
  }, [allStudents]);

  useEffect(() => {
    if (query) {
      setDisplayedStudents([
        ...allStudents?.filter((x) =>
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
        label: "Enrolled Students",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 2)]);
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
          {`${currentEditedStudentGroup?.studentNameAR} group number has been changed`}
        </Alert>
      </Snackbar>
      <EditNumberOfGroupForStudent
        title="Edit Student Group"
        CurrentGroup={currentEditedStudentGroup?.GroupNo}
        isOpened={EditIsOpenChangeStudentGroup}
        onClose={() => setEditIsOpenChangeStudentGroup(false)}
        onSubmit={({ ChosenNumberOfGroup }) =>
          EditStudentGroup(ChosenNumberOfGroup, currentEditedStudentGroup, () =>
            setEditIsOpenChangeStudentGroup(false)
          )
        }
      />

      <Grid container className={classes.mainPage}>
        <TableContainer className={classes.tablePosition} component={Paper}>
          <Grid item style={{ backgroundColor: "#0c6170", padding: "20px" }}>
            <Grid item>
              <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="Search"
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
            <Grid item style={{ marginTop: "-50px", marginLeft: "450px" }}>
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
                    <option value="studentNameAR">Name</option>
                    <option value="studentSeatNo">Seat Number</option>
                    <option value="studentEmail">E-mail</option>
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
              {/* The Header Of the Table That contains [1] Name ... [2] ID ... [3] E-Mail ... [4] Group Number  */}
              <TableRow>
                <TableCell className={classes.tableHeader} align="left">
                  Name
                </TableCell>
                <TableCell className={classes.tableHeader} align="center">
                  ID
                </TableCell>
                <TableCell className={classes.tableHeader} align="center">
                  E-Mail
                </TableCell>
                <TableCell className={classes.tableHeader} align="center">
                  Group Number
                </TableCell>
                <TableCell className={classes.tableHeader} align="right">
                  {}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? displayedStudents?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : displayedStudents
              )?.map((Student, index) => (
                <TableRow
                  key={index}
                  style={
                    index % 2
                      ? { background: "#FFFFFF" }
                      : { background: "#FFFFFF" }
                  }
                >
                  {/* Student Name cell */}
                  <TableCell align="left">
                    <Grid container spacing={1}>
                      <Typography>{Student.studentNameAR}</Typography>
                    </Grid>
                  </TableCell>
                  {/* Student ID cell */}
                  <TableCell align="center">{Student.studentSeatNo}</TableCell>
                  {/* Student Email cell */}
                  <TableCell align="center">{Student.studentEmail}</TableCell>
                  {/* Student Group cell */}
                  <TableCell align="center">{Student.GroupNo}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Student Group" placement="bottom">
                      <Button size="small">
                        <EditIcon
                          onClick={() => {
                            setEditIsOpenChangeStudentGroup(true);
                            setCurrentEditedStudentGroup(Student);
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
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={displayedStudents?.length}
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
      </Grid>
    </React.Fragment>
  );
};

const styles = (theme) => ({
  tableHeader: {
    backgroundColor: "#0c6170",
    fontSize: "17px",
    color: "white",
    fontweight: "bold",
    fontFamily: '"Lucida Sans Unicode","Helvetica","Arial"',
  },
  tablePosition: {
    maxHeight: "85vh",
    overflowY: "auto",
    maxWidth: "165vh",
    marginLeft: "28px",
    marginTop: "20px",
  },
  mainPage: {
    flexWrap: "nowrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
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

export default withStyles(styles)(withRouter(StudentsInSubject));
