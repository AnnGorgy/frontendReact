import React, { useState } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  withStyles,
  Button,
  Typography,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import {
  BreadCrumbs,
  AddMaterialPopOver,
  CreateFileForm,
  CreateFolderForm,
} from "..";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ---------------------------------------------------
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
//-----------------------------------------------------------------------------------------------------------

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

const MaterialTableHeader = ({
  crumbs,
  classes,
  uploadUrl,
  createUrl,
  match,
  setReloadMaterials,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [fileIsOpen, setFileIsOpen] = useState(false);
  const [videoIsOpen, setVideoIsOpen] = useState(false);
  const [linkIsOpen, setLinkIsOpen] = useState(false);
  const [assignmentIsOpen, setAssignmentIsOpen] = useState(false);
  const [FolderIsOpen, setFolderIsOpen] = useState(false);
  const [createButtonReference, setCreateButtonReference] = useState();
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  const [open, setOpen] = React.useState(false);
  const [MessageTitle, setMessageTitle] = useState("");
  //-----------------------------------------------------------------------------------------------------------

  // ---- Switch case to Open The Dialog (file/video/link/assignment/folder) Based On the Click Of user ----
  const handlePopOverClick = (eventName) => {
    switch (eventName) {
      case "File":
        setFileIsOpen(true);
        setCreateButtonReference(null);
        break;
      case "Video":
        setVideoIsOpen(true);
        setCreateButtonReference(null);
        break;
      case "Assignment":
        setAssignmentIsOpen(true);
        setCreateButtonReference(null);
        break;
      case "Link":
        setLinkIsOpen(true);
        setCreateButtonReference(null);
        break;
      case "Folder":
        setFolderIsOpen(true);
        setCreateButtonReference(null);
        break;
      default:
        break;
    }
  };
  // -------------------------------------------------------------------------------------------------------

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

  const uploadFile = async ({ file, name, description, callback }) => {
    const url = uploadUrl;
    /*  
    post syntax (
     url " url (The local host that we can use it to add new file in material table) ",
     body " we use formDate to add it in body (The File That the Doctor Will upload it) ", 
     options "It takes (4) Parameter"
     [1] Parent_ID ...  [2] sub_Id ... [3] Description ... [4] File_Name ...
     ) 
    */
    const formData = new FormData();
    formData.append("Document", file);
    try {
      await post(url, formData, {
        params: {
          Parent_ID: crumbs[crumbs.length - 1].id,
          sub_Id: match.params.courseId,
          Description: description,
          File_Name: name,
        },
      });
      setReloadMaterials(true);
      handleClick();
      /* Set the Message that will appear after the doctor upload the file with the name Of file itself */
      setMessageTitle(name);
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFileAssignment = async ({
    file,
    name,
    description,
    date,
    callback,
  }) => {
    const url = "/assignment/uploadFiles";
    /*  
    post syntax (
     url " url (The local host that we can use it to add new assignment in material table) ",
     body " we use formDate to add it in body (The assignment That the Doctor Will upload it) ", 
     options "It takes (6) Parameter"
     [1] Parent_ID ...  [2] sub_Id ... [3] Description ... [4] File_Name ... [5] start ... [6] end ...
     ) 
    */
    const formData = new FormData();
    formData.append("Document", file);
    try {
      await post(url, formData, {
        params: {
          Parent_ID: crumbs[crumbs.length - 1].id,
          sub_Id: match.params.courseId,
          Description: description,
          File_Name: name,
          start: date.start,
          end: date.end,
        },
      });
      setReloadMaterials(true);
      /* Set the Message that will appear after the doctor upload the assignment with the name Of assignment itself */
      setMessageTitle(name);
      handleClick();
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadVideo = async ({ file, name, description, callback }) => {
    const url = "/Doctor_Materials/uploadVideos";
    /*  
    post syntax (
     url " url (The local host that we can use it to add new video in material table) ",
     body " we use formDate to add it in body (The video That the Doctor Will upload it) ", 
     options "It takes (4) Parameter"
     [1] Parent_ID ...  [2] sub_Id ... [3] Video_Name ... [4] description ... 
     ) 
    */
    const formData = new FormData();
    formData.append("Document", file);
    try {
      await post(url, formData, {
        params: {
          Parent_ID: crumbs[crumbs.length - 1].id,
          sub_Id: match.params.courseId,
          Video_Name: name,
          description: description,
        },
      });
      setReloadMaterials(true);
      handleClick();
      /* Set the Message that will appear after the doctor upload the video with the name Of video itself */
      setMessageTitle(name);
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };

  const createFolder = async ({ name, callback }) => {
    const url = createUrl;
    /*  
    get syntax (
     url " url (The local host that we can use it to add new folder in material table) ",
     options "It takes (3) Parameter"
     [1] Parent_ID ...  [2] Folder_Name ... [3] sub_Id ... 
     ) 
    */
    await get(url, {
      params: {
        Parent_ID: crumbs[crumbs.length - 1].id,
        Folder_Name: name,
        sub_Id: match.params.courseId,
      },
    });
    setReloadMaterials(true);
    /* Set the Message that will appear after the doctor upload the Folder with the name Of Folder itself */
    setMessageTitle(name);
    handleClick();
    if (callback) callback();
  };

  const createLink = async ({ name, description, link, callback }) => {
    const url = "/Doctor_Materials/Add_URL";
    /*  
    get syntax (
     url " url (The local host that we can use it to add new URL in material table) ",
     options "It takes (3) Parameter"
     [1] Parent_ID ...  [2] Name ... [3] sub_Id ... [4] description ... [5] Url ...
     ) 
    */
    await get(url, {
      params: {
        Parent_ID: crumbs[crumbs.length - 1].id,
        Name: name,
        sub_Id: match.params.courseId,
        description: description,
        Url: link,
      },
    });
    setReloadMaterials(true);
    /* Set the Message that will appear after the doctor upload the URL with the name Of URL itself */
    setMessageTitle(name);
    handleClick();
    if (callback) callback();
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
      <AddMaterialPopOver
        createButtonReference={createButtonReference}
        setCreateButtonReference={setCreateButtonReference}
        onClick={handlePopOverClick}
        Crumbs={crumbs}
      />
      <CreateFileForm
        title="Create New File"
        isOpened={fileIsOpen}
        onClose={() => setFileIsOpen(false)}
        onSubmit={({ blobs, name, description }) =>
          uploadFile({
            file: blobs,
            name,
            description,
            callback: () => setFileIsOpen(false),
          })
        }
      />
      <CreateFileForm
        title="Create New Video"
        videoExtension
        isOpened={videoIsOpen}
        onClose={() => setVideoIsOpen(false)}
        onSubmit={({ blobs, name, description }) =>
          uploadVideo({
            file: blobs,
            name,
            description,
            callback: () => setVideoIsOpen(false),
          })
        }
      />
      <CreateFileForm
        title="Create New Assignment"
        hasDate
        isOpened={assignmentIsOpen}
        onClose={() => setAssignmentIsOpen(false)}
        onSubmit={({ blobs, name, description, date }) =>
          uploadFileAssignment({
            file: blobs,
            name,
            description,
            date,
            callback: () => setAssignmentIsOpen(false),
          })
        }
      />
      <CreateFolderForm
        title="Create New Folder"
        isOpened={FolderIsOpen}
        onClose={() => setFolderIsOpen(false)}
        onSubmit={({ name }) =>
          createFolder({ name, callback: () => setFolderIsOpen(false) })
        }
      />
      <CreateFolderForm
        title="Create New URL"
        isUrl
        isOpened={linkIsOpen}
        onClose={() => setLinkIsOpen(false)}
        onSubmit={({ name, description, link }) =>
          createLink({
            name,
            description,
            link,
            callback: () => setLinkIsOpen(false),
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
        {accountType == 2 && (
          <Grid item>
            <Button
              ref={createButtonReference}
              onClick={(event) => {
                setCreateButtonReference(event.currentTarget);
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
                    Add New Resourses
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
    width: "240px",
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

export default withStyles(styles)(withRouter(MaterialTableHeader));
