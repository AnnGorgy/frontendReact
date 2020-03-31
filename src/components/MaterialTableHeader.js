import React, { useState } from "react";
import { post, get } from "axios";

import { Grid, withStyles, Button, Typography } from "@material-ui/core";
import { BreadCrumbs, AddMaterialPopOver, CreateFileForm,CreateFolderForm } from "./";

import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FolderIcon from "@material-ui/icons/CreateNewFolder";

const MaterialTableHeader = ({
  crumbs,
  classes,
  uploadUrl,
  createUrl,
  setReloadMaterials
}) => {
  const [fileIsOpen, setFileIsOpen] = useState(false);
  const [videoIsOpen, setVideoIsOpen] = useState(false);
  const [linkIsOpen, setLinkIsOpen] = useState(false);
  const [assignmentIsOpen, setAssignmentIsOpen] = useState(false);
  const [FolderIsOpen, setFolderIsOpen] = useState(false);

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
      
    }
  };

  const [createButtonReference, setCreateButtonReference] = useState();

  const [file, setFile] = useState();
  const [folderName, setFolderName] = useState();
  const uploadFile = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Document", file);

    const url = uploadUrl;
    try {
      await post(url, formData, {
        params: { Parent_ID: crumbs[crumbs.length - 1].id }
      });
      setReloadMaterials(true);
    } catch (err) {
      console.error(err);
    }
  };

  const createFolder = async (Name = "New Folder") => {
    const url = createUrl;
    await get(url, {
      params: { Parent_ID: crumbs[crumbs.length - 1].id, Folder_Name: Name }
    });
    setFolderName("");
    setReloadMaterials(true);
  };

  return (
    <React.Fragment>
      <AddMaterialPopOver
        createButtonReference={createButtonReference}
        setCreateButtonReference={setCreateButtonReference}
        onClick={handlePopOverClick}
      />
      <CreateFileForm
        title="Create New File"
        isOpened={fileIsOpen}
        onClose={() => setFileIsOpen(false)}
        onSubmit={null}
      />
      <CreateFileForm
        title="Create New Video"
        isOpened={videoIsOpen}
        onClose={() => setVideoIsOpen(false)}
        onSubmit={null}
      />
      <CreateFileForm
        title="Create New Assignment"
        hasDate
        isOpened={assignmentIsOpen}
        onClose={() => setAssignmentIsOpen(false)}
        onSubmit={null}
      />
      <CreateFolderForm
        title="Create New Folder"
        isOpened={FolderIsOpen}
        onClose={() => setFolderIsOpen(false)}
        onSubmit={null}
      />
      <CreateFolderForm
        title="Create New URL"
        isOpened={linkIsOpen}
        onClose={() => setLinkIsOpen(false)}
        onSubmit={null}
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
        </Grid>
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
    color: "white",
    backgroundColor: "#3a6364",
    "&:hover, &:focus": {
      backgroundColor: "#3a6364d1",
      color: "white"
    }
  },
  addIcon: {
    marginTop: "4px"
  },
  buttonText: {
    color: "white"
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

export default withStyles(styles)(MaterialTableHeader);
