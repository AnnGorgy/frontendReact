import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons() {
  const classes = useStyles();

  return (
    <div style={{marginTop:'250px' , marginLeft:'650px'}}>
      
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
     
      <Button
        variant="contained"
        color="default"
       
        className={classes.button}
        startIcon={<CloudUploadIcon />}
       
      >
        Upload
      </Button>
     
      
    </div>
  );
}
