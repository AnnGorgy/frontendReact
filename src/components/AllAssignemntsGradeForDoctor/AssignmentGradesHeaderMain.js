import React, { useState } from "react";
import { post, get } from "axios";
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
import { BreadCrumbs, UploadExcelSheet } from "..";
import ExportExcelSheet from "../AllQuizzesGradesForDoctor/ExportExcelSheet";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ---------------------------------------------------
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
import DownloadIcon from "@material-ui/icons/GetAppSharp";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function  -------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const AssignmentGradesHeaderMain = ({
  crumbs,
  classes,
  match,
  history,
  setReloadAssignments,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [ExcelSheetIsOpen, setExcelSheetIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [MessageTitle, setMessageTitle] = useState("");
  const [ExportExcelSheetIsOpen, setExportExcelSheetIsOpen] = useState(false);
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
  const ExcelSheet = async ({ file, callback }) => {
    const url = "/ExcelSheet/importExcelSheet";
    const formData = new FormData();
    formData.append("Document", file);
    try {
      await post(url, formData, {
        params: {
          subjectId: match.params.courseId,
        },
      });
      setReloadAssignments(true);
      handleClick();
      setMessageTitle("Excel Sheet Has been Imported");
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };
  // -------------------------------------------------------------------------------------------------------
  const ExportAssignemntExcelSheet = async (method, callback) => {
    const response = await post(
      "/ExcelSheet/ExportExcelSheetForAssignment",
      null,
      {
        params: { SubjectID: match.params.courseId, TotalGrade: method },
        responseType: "blob",
      }
    );
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
        title="Export Excel Sheet For Assignment"
        isOpened={ExportExcelSheetIsOpen}
        onClose={() => setExportExcelSheetIsOpen(false)}
        onSubmit={({ methodInExcelSheet }) =>
          ExportAssignemntExcelSheet(methodInExcelSheet, () =>
            setExportExcelSheetIsOpen(false)
          )
        }
      />
      <UploadExcelSheet
        title="Upload Excel Sheet"
        isOpened={ExcelSheetIsOpen}
        onClose={() => setExcelSheetIsOpen(false)}
        onSubmit={({ blobs }) =>
          ExcelSheet({
            file: blobs,
            callback: () => setExcelSheetIsOpen(false),
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
        {crumbs.length == 1 &&
          history.push(
            `/course/${match.params.courseId}/${match.params.coursename}`
          )}
        {crumbs.length == 2 &&
          history.push(
            `/grades/${match.params.courseId}/${match.params.coursename}`
          )}

        <Grid item>
          <Button
            onClick={(a) => {
              setExcelSheetIsOpen(true);
            }}
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
                  import Excel sheet
                </Typography>
              </Grid>
            </Grid>
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              setExportExcelSheetIsOpen(true);
            }}
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
                  Export Excel sheet
                </Typography>
              </Grid>
            </Grid>
          </Button>
        </Grid>
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

export default withStyles(styles)(withRouter(AssignmentGradesHeaderMain));
