import React, { useState } from "react";
import { post, get } from "axios";

import { Grid, withStyles, Typography, Button, TextField } from "@material-ui/core";
import BreadCrumbs from "./BreadCrumbs";

import AddFolderIcon from "@material-ui/icons/CreateNewFolder";

const MaterialTableHeader = ({ crumbs, classes, uploadUrl, createUrl, setReloadMaterials }) => {
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
      setReloadMaterials(true)
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
    setReloadMaterials(true)
  };

  return (
    <Grid container justify="space-between">
      <Grid item xs={5}>
        <Grid container direction="column">
          <Grid item className={classes.breadCrumpContainer}>
            {crumbs?.length ? (
              <BreadCrumbs crumbs={crumbs} />
            ) : (
              <React.Fragment />
            )}
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <TextField
                  placeholder="Choose folder name.." // hwaryk 7aga kdh kman bs m3rfna4 nzbtha
                  value={folderName}
                  onChange={e => setFolderName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <AddFolderIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => createFolder(folderName)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="stretch" justify="center">
          <Grid item style={{ alignSelf: "center" }}>
            <Typography variant="body2">
              Select A file to upload here
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <input type="file" onChange={e => setFile(e.target.files[0])} />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  disabled={!file}
                  onClick={uploadFile}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = () => ({
  breadCrumpContainer: {
    maxWidth: "100%"
  }
});

export default withStyles(styles)(MaterialTableHeader);
