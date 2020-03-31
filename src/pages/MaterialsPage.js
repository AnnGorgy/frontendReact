import React, { useState } from "react";

import {
  TableHeader,
  MaterialTable,
  SideBar, 
} from "../components";
import { Grid } from "@material-ui/core";

const MaterialsPage = () => {
  const [crumbs, setCrumbs] = useState([]);
  const [reloadMaterials, setReloadMaterials] = useState(true);

  return (
    <Grid container style={{ flexWrap: "nowrap" }}>
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justify="center"
          spacing={1}
          style={{ flexWrap: "nowrap" }}
        >
          <Grid item>
            <TableHeader
              crumbs={crumbs}
              uploadUrl="/Materials/UploadFiles"
              createUrl="/Materials/CreateFolder"
              setReloadMaterials={setReloadMaterials}
            />
          </Grid>
          <Grid item>
            <MaterialTable
              setCrumbs={setCrumbs}
              reloadMaterials={reloadMaterials}
              setReloadMaterials={setReloadMaterials}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MaterialsPage;