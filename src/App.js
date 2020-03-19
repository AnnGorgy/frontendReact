import React from 'react';
import logo from './logo.svg';
import { TextField } from "@material-ui/core";
import './App.css';
import  PrimarySearchAppBar  from "./components/AppBar.js";
import DragImportFile from  "./components/DragImport.js";
import Navigator from "./components/WebsiteLayout/Navigator.js";
import Content from "./components/WebsiteLayout/Content.js";
import Header from "./components/WebsiteLayout/Header.js";
import Paperbase from "./components/WebsiteLayout/Theme.js";
import {MaterialTable} from "./components/MaterialTable.js"
import IconLabelButtons from './components/UploadButton.js';
export default class App extends React.Component {
  state = {
    blobs: []
  };

  render() {
    const onDropBlobs = blobs => {
      this.setState(state => ({
        ...state,
        blobs: [...this.state.blobs, ...blobs]
      }));
    };

    const onDeleteBlob = (itemIndex) => {
      this.setState(state => ({
        ...state,
        blobs: this.state.blobs.filter((file, index) => index !== itemIndex)
      }));
    };
  

    return ( 
    // <MaterialTable/>
  /*      <DragImportFile
        editable
        blobs={this.state.blobs}
        onDrop={onDropBlobs}
        onDeleteBlob={onDeleteBlob}
      />   */
    
    );
  }
}