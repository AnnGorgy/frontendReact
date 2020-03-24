import React, { useState } from "react";
import { post, get } from "axios";

import { Grid, withStyles, Typography, Button } from "@material-ui/core";
import BreadCrumbs from "./BreadCrumbs";

import AddFolderIcon from "@material-ui/icons/CreateNewFolder";

const MaterialTableHeader = ({ crumbs, classes }) => {
  const [file, setFile] = useState();
  const uploadFile = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Document", file);

    const url = `/Materials/UploadFiles`;
    try {
      await post(url, formData, {
        params: { Parent_ID: crumbs[crumbs.length - 1].id }
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const createFolder = async (Name = "New Folder") => {
    const url = "/Materials/CreateFolder";
    await get(url, {
      params: { Parent_ID: crumbs[crumbs.length - 1].id, Folder_Name: Name }
    });
    window.location.reload();
  };

  return (
    <Grid container justify="space-between" alignItems="stretch">
      <Grid item>
        <Grid container direction="column">
          <Grid item className={classes.breadCrumpContainer}>
            {crumbs?.length ? (
              <BreadCrumbs crumbs={crumbs} />
            ) : (
              <React.Fragment />
            )}
          </Grid>
          <Grid item>
            <AddFolderIcon
              style={{ cursor: "pointer" }}
              onClick={() => createFolder()}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container direcion="column" alignItems="stretch" justify="center">
          <Grid item>
            <Typography variant="body2">
              Select A file to upload here
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
                <input type="file" onChange={e => setFile(e.target.files[0])} />
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
    maxWidth: "50%"
  }
});

export default withStyles(styles)(MaterialTableHeader);
