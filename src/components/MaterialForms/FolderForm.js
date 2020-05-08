import React, { useState } from "react";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

/* The dialog that appear in materials Page for "Folders-URL" */
const CreateFolderForm = ({
  onClose,
  isOpened,
  title,
  onSubmit,
  isUrl,
  classes,
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  // ---------------------------------------------------------------------------------------------------------

  /* this function reset Dialogs when it opened "Clear all textboxs" + when we press a create button */
  const resetStates = () => {
    setName("");
    setDescription("");
    setLink("");
    onClose();
    setUrlArray([]);
  };

  return (
    isOpened && (
      <Dialog
        onClose={() => {
          resetStates();
          onClose();
        }}
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
                  {/* Dialog Name */}
                  <Grid item>
                    <TextField
                      label="Name"
                      fullWidth
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      variant="outlined"
                      classes={{
                        root: classes.textFieldRoot,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                    />
                  </Grid>

                  {/* URL Field that we can add any URL but with a fixed start http:// */}
                  {isUrl && (
                    <Grid item>
                      {/* FIXME: Add validation for URL creation to add http at
                      the begging of the link. */}
                      <TextField
                        label="URL"
                        fullWidth
                        value={link}
                        onChange={(e) => {
                          setLink(e.target.value);
                         /*  setUrlArray(link.split(":"));
                          {
                            UrlArray.length == 0 &&
                              setLink(`${UrlFirst}${link}`);
                          } */
                        }}
                        variant="outlined"
                        classes={{
                          root: classes.textFieldRoot,
                        }}
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline,
                          },
                        }}
                        InputLabelProps={{
                          classes: {
                            root: classes.label,
                          },
                        }}
                      />
                    </Grid>
                  )}

                  {/* Diaglog Description */}
                  {isUrl && (
                    <Grid item>
                      <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        variant="outlined"
                        classes={{
                          root: classes.textFieldRoot,
                        }}
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline,
                          },
                        }}
                        InputLabelProps={{
                          classes: {
                            root: classes.label,
                          },
                        }}
                      />
                    </Grid>
                  )}
                  {/* Dialog Cancel Button */}
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            resetStates();
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
                      {/* Dialog Create Button */}
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.createButton}
                          disabled={name === "" || (isUrl && link === "")}
                          onClick={() => {
                            resetStates();
                            onSubmit({
                              name,
                              description,
                              link,
                            });
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={
                              name === "" || (isUrl && link === "")
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
  isUrl: false,
};

const styles = () => ({
  dialog: {
    padding: "10px 0px",
  },
  titleContainer: {
    marginBottom: "18px",
  },
  textFieldRoot: {
    backgroundColor: "white",
    borderRadius: "7px",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `black !important`,
  },
  label: {
    color: "black !important",
    fontWeight: "600",
  },
  dialogPaper: {
    minHeight: "15vh",
    padding: "20px 0px",
  },
  createButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px black solid",
  },
  cancelButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px red solid",
  },
  boldText: {
    fontWeight: "600",
  },
  createText: {
    color: "silver",
  },
});

export default withStyles(styles)(CreateFolderForm);
