import React from "react";

import { FileUpload, MaterialTable } from "../components";
// import logo from "./logo.svg";
// import { TextField } from "@material-ui/core";
// import PrimarySearchAppBar from "./components/AppBar.js";
// import DragImportFile from "./components/DragImport.js";
// import Navigator from "./components/WebsiteLayout/Navigator.js";
// import Content from "./components/WebsiteLayout/Content.js";
// import Header from "./components/WebsiteLayout/Header.js";
// import Paperbase from "./components/WebsiteLayout/Theme.js";
// import IconLabelButtons from "./components/UploadButton.js";
export default class MaterialsPage extends React.Component {
  state = {
    blobs: []
  };

  render() {
    const onDropBlobs = blobs => {
      this.setState(state => ({
        ...state,
        blobs: [...blobs]
      }));
    };

    const onDeleteBlob = itemIndex => {
      this.setState(state => ({
        ...state,
        blobs: this.state.blobs.filter((file, index) => index !== itemIndex)
      }));
    };

    return (
      <div>
        <FileUpload />
        <MaterialTable />
      </div>
    );
  }
}
