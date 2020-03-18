import React from "react";

import { Grid, Typography, withStyles } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const styles = theme => ({
  displayedIcon: {
    width: "32px",
    height: "32px",
    zIndex: 3
  },
  iconFrame: {
    width: "48px",
    height: "48px",
    borderRadius: "4px",
    marginTop: 8,
    marginBottom: 8,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: '#f7f7f7',
    zIndex: -1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  closeIcon: {
    fontSize: 18,
    color: '#ffffff',
    cursor: "pointer",
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: '#ff0000',
    borderRadius: "50%"
  },
  label: {
    marginTop: 8,
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "1.38",
    textAlign: "left",
    color: '#f4f4f4'
  },
  sizeLabel: {
    marginTop: 4,
    fontSize: "12px",
    lineHeight: "1.5",
    textAlign: "left",
    color: '#f1f1f1'
  },
  link: {
    cursor: "pointer"
  }
});

const AttachedFile = ({
  classes, // this prop contain the style classes passed from the withStyles HOC
  label, // label to be displayed next to the icon
  size, // size to be displayed next to icon
  editable, // either display the x icon or not
  onDelete // function to be called when the x button is pressed
}) => (
  <Grid container>
    <Grid item style={{ position: "relative" }}>
      <div className={classes.iconFrame}>
        <div className={classes.link}>
          <img
            src="https://img.icons8.com/plasticine/100/000000/file.png"
            alt="Attachment type"
            className={classes.displayedIcon}
          />
        </div>
      </div>
      {editable && (
        <HighlightOffIcon
          onClick={onDelete}
          color="error"
          className={classes.closeIcon}
        />
      )}
    </Grid>
    <div className={classes.link}>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.label}>
              {label}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.sizeLabel}>
              {size}
              {/* size come as one integer mainly, so if you need to make operation on it make it here */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  </Grid>
);

AttachedFile.defaultProps = {
  extension: "none",
  label: "Attachment",
  url: "",
  editable: false,
  onDelete: () => null
};

export default withStyles(styles)(AttachedFile);
