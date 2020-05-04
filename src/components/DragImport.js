import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Typography, Button, withStyles, Grid, Box } from "@material-ui/core";
import AttachedFile from "./AttachedFile.js";

const styles = () => ({
  uploadButton: {
    width: "100%",
    height: "80px",
    backgroundColor: "#b7b7b7",
  },
  cloudIcon: {
    marginRight: "5px",
    fill: "#777777",
  },
  uploadButtonText: {
    colorInherit: "#777777",
  },
});

const DragImportFile = ({
  attachments, // files that are uploaded to the server
  onDeleteAttachment, // function to fire when you press x on any of the attachments
  blobs, // files that are ready to be uploaded to the server
  onDeleteBlob, // function to fire when press x on any of the blobs
  editable, // files editable?
  onDrop, // function to fire when a new file(s) added.
  classes,
  Extension,
}) => {
  const {
    getRootProps,
    getInputProps,
    open: openFilesBrowser,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    noKeyboard: true,
    multiple: false,
    accept: Extension,
  });

  return (
    <React.Fragment>
      <Box mb={3}>
        {editable && (
          <Button
            color="inherit"
            className={classes.uploadButton}
            variant="contained"
            size="large"
            onClick={openFilesBrowser}
            {...getRootProps()}
          >
            <CloudUploadIcon className={classes.cloudIcon} />
            <Typography className={classes.uploadButtonText} color="inherit">
              {isDragActive ? "Drag here" : "Drag here or Browse to Upload"}
              {isDragAccept && (<p>Accepted</p>)}
              {isDragReject && <p>Some files will be rejected</p>}
            </Typography>
            <input {...getInputProps()} />
          </Button>
        )}
      </Box>
      <Grid item>
        <Grid container justify="flex-start" spacing={4}>
          {attachments.map((attachment, index) => (
            <Grid item key={index}>
              <AttachedFile
                editable={editable}
                onDelete={() => onDeleteAttachment(index)}
                label={attachment.name}
                size={attachment.size}
              />
            </Grid>
          ))}
          {blobs.map((attachment, index) => (
            <Grid item key={index}>
              <AttachedFile
                editable={editable}
                onDelete={() => onDeleteBlob(index)}
                label={attachment.name}
                size={attachment.size}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

DragImportFile.defaultProps = {
  attachments: [],
  onDeleteAttachment: () => null,
  blobs: [],
  onDeleteBlob: () => null,
  onDrop: () => null,
};

export default withStyles(styles)(DragImportFile);
