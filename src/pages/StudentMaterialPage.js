import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { TableHeader, MaterialTableStudent , SideBar } from "../components";

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------


const StudentMaterialPage = () => {

  // ---------------------------- variables with it's states that we use it in this Page ------------------- 
  const [crumbs, setCrumbs] = useState([]);
  const [reloadMaterials, setReloadMaterials] = useState(true);
  //--------------------------------------------------------------------------------------------------------
  return (
    <Grid container style={{ flexWrap: "nowrap" }}>
      {/* Navigation bar */}
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
              uploadUrl="/Doctor_Materials/uploadFiles"
              createUrl="/Doctor_Materials/CreateFolder"
              setReloadMaterials={setReloadMaterials}
            />
          </Grid>
          <Grid item>
            <MaterialTableStudent
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
export default withRouter(StudentMaterialPage);
