import React, { useState,useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import mime from "mime-types";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  withStyles,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import { BreadCrumbs } from "..";
import ExportExcelSheet from "./ExportExcelSheet";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ---------------------------------------------------
import DownloadIcon from "@material-ui/icons/GetAppSharp";

//-----------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function  -------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const QuizGradesHeaderMain = ({ crumbs, classes, match, history }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [open, setOpen] = React.useState(false);
  const [MessageTitle, setMessageTitle] = useState("");
  const [ExportExcelSheetIsOpen, setExportExcelSheetIsOpen] = useState(false);
  const [CanExport, setCanExport] = useState(false);
  //-----------------------------------------------------------------------------------------------------------

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

  // -------------------------------------------- API Calls ------------------------------------------------
  const ExportQuizExcelSheet = async (method, callback) => {
    const response = await post("/ExcelSheet/ExportExcelSheetForQuiz", null, {
      params: { SubjectID: match.params.courseId, TotalGrade: method },
      responseType: "blob",
    });
    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement("a");

    fileLink.href = fileURL;
    fileLink.setAttribute(
      "download",
      match.params.coursename + "." + mime.extension(response.data.type)
    );
    document.body.appendChild(fileLink);
    fileLink.click();
    handleClick();
    setMessageTitle("Excel Sheet Has been Exported ");
    if (callback) callback();
  };

  //----------------------------------------------------------------------------------------------------
  const CheckQuiz = async () => {
    const Url = `/Doctor_Manage_student/AppearExport`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId , type:"Quiz" },
    });
    setCanExport(data);
  };
  //-----------------------------------------------------------------------------------------------------

  useEffect(() => {
    CheckQuiz();
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
          {MessageTitle}
        </Alert>
      </Snackbar>
      <ExportExcelSheet
        title="Export Excel Sheet For Quiz"
        isOpened={ExportExcelSheetIsOpen}
        onClose={() => setExportExcelSheetIsOpen(false)}
        onSubmit={({ methodInExcelSheet }) =>
          ExportQuizExcelSheet(methodInExcelSheet, () =>
            setExportExcelSheetIsOpen(false)
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
        {crumbs.length == 2 &&
          history.push(
            `/grades/${match.params.courseId}/${match.params.coursename}`
          )}
        {CanExport === true  && (
          <Grid item>
            <Button
              onClick={() => setExportExcelSheetIsOpen(true)}
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
                  <DownloadIcon className={classes.addIcon} />
                </Grid>
                <Grid item>
                  <Typography className={classes.buttonText}>
                    Export Excel Sheet
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
    width: "210px",
    color: "white",
    backgroundColor: "#0c6170",
    "&:hover, &:focus": {
      backgroundColor: "#3C808C",
      color: "black",
    },
  },
  addIcon: {
    marginTop: "8px",
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

export default withStyles(styles)(withRouter(QuizGradesHeaderMain));
