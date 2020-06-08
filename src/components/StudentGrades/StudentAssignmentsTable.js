import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import mime from "mime-types";
import PropTypes from "prop-types";

//------------------------------------------------- Icons ------------------------------------------------
import DownloadIcon from "@material-ui/icons/GetAppSharp";
import FolderIcon from "@material-ui/icons/Folder";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SearchIcon from "@material-ui/icons/Search";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
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
  Button,
  Tooltip,
  withStyles,
  Typography,
  Grid,
  TableFooter,
  TablePagination,
  makeStyles,
  useTheme,
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
//----------------------------------------------------------------------------------------------------------

const StudentAssignmentsTable = ({ classes, match, setCrumbs }) => {
  // -------------------------------------------- API Calls ------------------------------------------------
  const listAssignments = async () => {
    const Url = `/Student_Answers/GetAssingmentsGrades`;
    const { data } = await post(Url, null, {
      params: {
        subjectId: match.params.courseId,
        studentId: JSON.parse(localStorage.getItem("StuInformation"))[0]
          .StudentID,
      },
    });
    setAllAssignments(data);
  };
  //--------------------------------------------------------------------------------------------------------

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allAssignments, setAllAssignments] = useState();
  const [displayedGrades, setDisplayedGrades] = useState();
  const [query, setQuery] = useState("");
  const [coulmnToQuery, setCoulmnToQuery] = useState("AssignmentName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, displayedGrades?.length - page * rowsPerPage);
  //----------------------------------------------------------------------------------------------------------
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  //----------------------------------------------------------------------------------------------------------
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (allAssignments) {
      setDisplayedGrades([...allAssignments]);
    }
  }, [allAssignments]);

  useEffect(() => {
    listAssignments();
  }, [match.params.courseId]);

  useEffect(() => {
    if (query) {
      setDisplayedGrades([
        ...allAssignments?.filter((x) =>
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
        label: "Assignment Grades",
        onClick: () => {
          setCrumbs((prevState) => [...prevState.slice(0, 2)]);
        },
        Icon: FolderIcon,
      },
    ]);
  }, []);

  return (
    <TableContainer component={Paper} className={classes.tablePosition}>
        <Grid item style={{ backgroundColor: "#0c6170", padding: "20px" }}>
          <Grid item>
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search With assignment folder Name"
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
        </Grid>
      <Table
        style={{
          minWidth: "650px",
        }}
        size="large"
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>
              Assignment Name
            </TableCell>
            <TableCell className={classes.tableHeader} align="center">
              Grade
            </TableCell>
            <TableCell className={classes.tableHeader} align="center">
              Start Date
            </TableCell>
            <TableCell className={classes.tableHeader} align="center">
              End Date
            </TableCell>
            <TableCell className={classes.tableHeader} align="right">
              {}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
              ? displayedGrades?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : displayedGrades
            )?.map((grades, index) => (
            <TableRow
              key={index}
              style={
                index % 2
                  ? { background: "#FFFFFF" }
                  : { background: "#FFFFFF" }
              }
            >
              {/* Assignment Name cell */}
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item>
                    <AssignmentIcon />
                  </Grid>
                  <Grid item>
                    <Typography>{grades.AssignmentName}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              {/* grade assignmet cell */}
              <TableCell align="center">{`${grades.AssignmentGrade} / ${grades.TotalGrade}`}</TableCell>
              {/* Assignment Start Date cell */}
              <TableCell align="center">{grades.AssignmentstartDate}</TableCell>
              {/* Assignmet End Date cell */}
              <TableCell align="center">{grades.AssignmentendDate}</TableCell>
              <TableCell align="right">
                {grades.hasAnswer == true && (
                  <Tooltip title="Download" placement="bottom">
                    <Button size="small">
                      <DownloadIcon
                        onClick={async () => {
                          const response = await get(
                            "/Student_Answers/downloadAssignmentAnswer",
                            {
                              params: {
                                AnswerID: grades.AssignmentId,
                                studentID: JSON.parse(
                                  localStorage.getItem("StuInformation")
                                )[0].StudentID,
                              },
                              responseType: "blob",
                            }
                          );
                          var fileURL = window.URL.createObjectURL(
                            new Blob([response.data])
                          );
                          var fileLink = document.createElement("a");

                          fileLink.href = fileURL;
                          fileLink.setAttribute(
                            "download",
                            grades.AssignmentName +
                              "." +
                              mime.extension(response.data.type)
                          );
                          document.body.appendChild(fileLink);

                          fileLink.click();
                        }}
                      />
                    </Button>
                  </Tooltip>
                )}
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
                count={displayedGrades?.length}
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
    maxHeight: "90vh",
    overflowY: "auto",
    maxWidth: "170vh",
    marginTop: "10px",
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

export default withStyles(styles)(withRouter(StudentAssignmentsTable));
