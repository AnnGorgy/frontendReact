import React, { useState } from "react";

import { FileUpload, MaterialTableHeader, MaterialTable } from "../components";
import HomeIcon from "@material-ui/icons/Home";
import { Grid } from "@material-ui/core";

const MaterialsPage = () => {
  const [crumbs, setCrumbs] = useState([]);

  // const onDropBlobs = blobs => {
  //   this.setState(state => ({
  //     ...state,
  //     blobs: [...blobs]
  //   }));
  // };

  // const onDeleteBlob = itemIndex => {
  //   this.setState(state => ({
  //     ...state,
  //     blobs: this.state.blobs.filter((file, index) => index !== itemIndex)
  //   }));
  // };

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      justify="center"
      spacing={3}
    >
      <Grid item>
        <MaterialTableHeader crumbs={crumbs} />
      </Grid>
      <Grid item>
        <MaterialTable setCrumbs={setCrumbs} mainFolderId={'id1'} />
      </Grid>
    </Grid>
  );
};

export default MaterialsPage;