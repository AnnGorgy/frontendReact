import React from "react";

import { Breadcrumbs, Chip, withStyles, Box } from "@material-ui/core";

const styles = theme => ({
  root: {
    backgroundColor: "#3a6364",
    height: "30px",
    marginTop: "2px",
    color: "#ffffff",
    fontWeight: "600",
    "&:hover, &:focus": {
      backgroundColor: "#3a6364d1"
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: "#3a6364"
    } 
  }
});

const Crumb = withStyles(styles)(Chip);

const BreadCrumbs = ({ crumbs }) => (
  <Breadcrumbs>
    {crumbs.map(({ label, Icon, onClick }, index) => (
      <Box
        key={index}
        onClick={onClick}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none"
        }}
      >
        <Crumb
          label={label}
          icon={
            <Icon
              fontSize="small"
              style={{ color: "#ffffff", marginLeft: "6px" }}
            />
          }
        />
      </Box>
    ))}
  </Breadcrumbs>
);

export default BreadCrumbs;