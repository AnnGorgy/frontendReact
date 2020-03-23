import React from "react";

import HomeIcon from "@material-ui/icons/Home";

import { FileUpload, MaterialTable, BreadCrumbs } from "../components";

const crumbs = [
  {
    label: "Test",
    Icon: HomeIcon,
    onClick: () => console.log(1)
  },
  {
    label: "El",
    Icon: HomeIcon,
    onClick: () => console.log(2)
  },
  {
    label: "Rogola",
    Icon: HomeIcon,
    onClick: () => console.log(3)
  }
];
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
      <BreadCrumbs crumbs={crumbs} />
      // <React.Fragment>
      // <FileUpload />
      // <MaterialTable />
      // </React.Fragment>
    );
  }
}
