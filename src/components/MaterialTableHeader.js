import React, { useState } from "react";
import { post, get } from "axios";

import { Grid, withStyles, Button, Typography } from "@material-ui/core";
import {
  BreadCrumbs,
  AddMaterialPopOver,
  CreateFileForm,
  CreateFolderForm
} from "./";

import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { withRouter } from "react-router-dom";

const MaterialTableHeader = ({
  crumbs,
  classes,
  uploadUrl,
  createUrl,
  match,
  setReloadMaterials
}) => {
  const [fileIsOpen, setFileIsOpen] = useState(false);
  const [videoIsOpen, setVideoIsOpen] = useState(false);
  const [linkIsOpen, setLinkIsOpen] = useState(false);
  const [assignmentIsOpen, setAssignmentIsOpen] = useState(false);
  const [FolderIsOpen, setFolderIsOpen] = useState(false);
  const [createButtonReference, setCreateButtonReference] = useState();
  const [accountType, setaccountType] = useState(JSON.parse(localStorage.getItem("Information")).AccountType);

  const handlePopOverClick = eventName => {
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

  const uploadFile = async ({ file, name, description, callback }) => {
    // TODO: make it constant on this service
    const url = uploadUrl;
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
    callback
  }) => {
    const url = "/assignment/uploadFiles";
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
          end: date.end
        }
      });
      setReloadMaterials(true);
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadVideo = async ({ file, name, description, callback }) => {
    const url = "/Doctor_Materials/uploadVideos";
    const formData = new FormData();
    formData.append("Document", file);
    try {
      await post(url, formData, {
        params: {
          Parent_ID: crumbs[crumbs.length - 1].id,
          sub_Id: match.params.courseId,
          Video_Name: name,
          description: description
        }
      });
      setReloadMaterials(true);
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };

  const createFolder = async ({ name, callback }) => {
    // TODO: make it constant on this service
    const url = createUrl;
    await get(url, {
      params: {
        Parent_ID: crumbs[crumbs.length - 1].id,
        Folder_Name: name,
        sub_Id: match.params.courseId
      }
    });
    setReloadMaterials(true);
    if (callback) callback();
  };

  const createLink = async ({ name, description, link, callback }) => {
    const url = "/Doctor_Materials/Add_URL";
    await get(url, {
      params: {
        Parent_ID: crumbs[crumbs.length - 1].id,
        Name: name,
        sub_Id: match.params.courseId,
        description: description,
        Url: link
      }
    });
    setReloadMaterials(true);
    if (callback) callback();
  };

  return (
    <React.Fragment>
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
            callback: () => setFileIsOpen(false)
          })
        }
      />
      <CreateFileForm
        title="Create New Video"
        isOpened={videoIsOpen}
        onClose={() => setVideoIsOpen(false)}
        onSubmit={({ blobs, name, description }) =>
          uploadVideo({
            file: blobs,
            name,
            description,
            callback: () => setVideoIsOpen(false)
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
            callback: () => setAssignmentIsOpen(false)
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
            callback: () => setLinkIsOpen(false)
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
              onClick={event => {
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
          </Grid>)}
      </Grid>
    </React.Fragment>
  );
};

const styles = () => ({
  breadCrumpContainer: {
    maxWidth: "100%"
  },
  addButton: {
    borderRadius: "16px",
    width: "240px",
    color: "black",
    backgroundColor:  "#7dbbb9",
    "&:hover, &:focus": {
      backgroundColor: "#CCE6E5",
      color: "black"
    }
  },
  addIcon: {
    marginTop: "4px"
  },
  buttonText: {
    color: "black"
  },
  addButtonBody: {
    marginLeft: "4px",
    marginRight: "4px"
  },
  tableHeader: {
    paddingRight: "20px",
    paddingLeft: "20px",
    marginTop: "8px",
    flexWrap: "nowrap"
  },
  noWrap: {
    flexWrap: "nowrap"
  }
});

export default withStyles(styles)(withRouter(MaterialTableHeader));
