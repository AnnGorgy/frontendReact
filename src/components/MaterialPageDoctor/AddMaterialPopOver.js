import React from "react";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Popover,
  Grid,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

import FolderIcon from "@material-ui/icons/CreateNewFolder";
import VideoIcon from "@material-ui/icons/Videocam";
import LinkIcon from "@material-ui/icons/Link";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FileIcon from "@material-ui/icons/Description";

const AddMaterialPopOver = ({
  createButtonReference,
  Crumbs,
  setCreateButtonReference,
  onClick,
  classes,
}) => {
  return (
    Boolean(createButtonReference) && (
      <Popover
        open={Boolean(createButtonReference)}
        anchorEl={createButtonReference}
        onClose={() => setCreateButtonReference(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid container direction="column" alignItems="stretch">
          <Grid item>
            <Button
              className={classes.optionButton}
              onClick={() => onClick("Folder")}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <FolderIcon className={classes.optionIcon} />
                </Grid>
                <Grid item>
                  <Typography className={classes.optionText} variant="h6">
                    Add New Folder
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          {Crumbs.length != 1 && (
            <Grid item>
              <Grid item>
                <Button
                  className={classes.optionButton}
                  disabled={Crumbs.length == 1}
                  onClick={() => onClick("Assignment")}
                >
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <AssignmentIcon className={classes.optionIcon} />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.optionText} variant="h6">
                        Add New Assignment
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.optionButton}
                  disabled={Crumbs.length == 1}
                  onClick={() => onClick("File")}
                >
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <FileIcon className={classes.optionIcon} />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.optionText} variant="h6">
                        Add New File
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.optionButton}
                  disabled={Crumbs.length == 1}
                  onClick={() => onClick("Link")}
                >
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <LinkIcon className={classes.optionIcon} />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.optionText} variant="h6">
                        Add New Link
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.optionButton}
                  disabled={Crumbs.length == 1}
                  onClick={() => onClick("Video")}
                >
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <VideoIcon className={classes.optionIcon} />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.optionText} variant="h6">
                        Add New Video
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Popover>
    )
  );
};

const styles = () => ({
  optionButton: {
    width: "250px",
  },
  optionText: {
    fontWeight: "550",
  },
  optionIcon: {
    marginTop: "4px",
    fontSize: "30px",
    color: "#5e5e5e",
  },
});

export default withStyles(styles)(AddMaterialPopOver);
