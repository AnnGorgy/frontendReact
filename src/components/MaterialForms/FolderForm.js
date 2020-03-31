import React, { useState } from "react";

import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button
} from "@material-ui/core";


const CreateFolderForm = ({  onClose, isOpened, title, onSubmit, hasDate, classes }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
 

  return (
    isOpened && (
      <Dialog
        onClose={onClose}
        open={isOpened}
        maxWidth="sm"
        fullWidth
        PaperProps={{ className: classes.dialogPaper }}
      >
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justify="center"
          className={classes.dialog}
        >
          <Grid item className={classes.titleContainer}>
            <Typography
              variant="h3"
              className={classes.boldText}
              align="center"
            >
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify="space-around">
              <Grid item xs={11}>
                <Grid
                  container
                  direction="column"
                  alignItems="stretch"
                  justify="center"
                  spacing={3}
                >
                  <Grid item>
                    <TextField
                      label="Name"
                      fullWidth
                      value={name}
                      onChange={e => {
                        setName(e.target.value);
                      }}
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline
                        }
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label
                        }
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label={"Description"}
                      fullWidth
                      multiline
                      rows={3}
                      value={description}
                      onChange={e => {
                        setDescription(e.target.value);
                      }}
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline
                        }
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label
                        }
                      }}
                    />
                  </Grid>
                 
                  
                
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            setName("");
                            setDescription("");
                           
                            onClose();
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={classes.boldText}
                            color="error"
                          >
                            Cancel
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.createButton}
                          disabled={
                         
                            name === "" 
                          }
                          onClick={() =>
                            onSubmit({
                              
                              name,
                              description
                             
                            })
                          }
                        >
                          <Typography
                            variant="h6"
                            className={
                          
                              (name === "" )
                                ? classes.createText
                                : classes.boldText
                            }
                          >
                            Create
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    )
  );
};

CreateFolderForm.defaultProps = {
  
  isLink:  false,
};

const styles = () => ({
  dialog: {
    padding: "10px 0px"
  },
  titleContainer: {
    marginBottom: "18px"
  },
  textFieldRoot: {
    backgroundColor: "white",
    borderRadius: "7px"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `black !important`
  },
  label: {
    color: "black !important",
    fontWeight: "600"
  },
  dialogPaper: {
    minHeight: "50vh",
    padding: "20px 0px"
  },
  createButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px black solid"
  },
  cancelButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px red solid"
  },
  boldText: {
    fontWeight: "600"
  },
  createText: {
    color: "silver"
  }
});

export default withStyles(styles)(CreateFolderForm);
