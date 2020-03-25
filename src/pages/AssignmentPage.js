import React, { useState } from "react";

import {
  TableHeader,
  AssignmentTable,
  SideBar, 
} from "../components";
import HomeIcon from "@material-ui/icons/Home";
import { Grid } from "@material-ui/core";

const AssignmentPage = () => {
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
          spacing={3}
        >
          <Grid item>
            <TableHeader
              crumbs={crumbs}
              uploadUrl="/assignment/UploadFiles"
              createUrl="/assignment/CreateFolder"
              setReloadMaterials={setReloadMaterials}
            />
          </Grid>
          <Grid item>
            <AssignmentTable
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

export default AssignmentPage;