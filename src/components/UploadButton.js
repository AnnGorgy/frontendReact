import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import Icon from "@material-ui/core/Icon";
import ControlledOpenSelect from "./MaterialTypeDDL.js";

class IconLabelButtons extends Component {
  render() {
    const { blobs, type } = this.props;
    return (
      <div style={{ marginTop: "250px", marginLeft: "650px" }}>
        {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}

        <Button
          onClick={() => {
           
          }}
          variant="contained"
          color="default"
          style={{ margin: "2px" }}
          startIcon={<CloudUploadIcon />}
          disabled={blobs.length === 0 || type === "NULL"}
        >
          Upload
        </Button>
      </div>
    );
  }
}

export default IconLabelButtons;
