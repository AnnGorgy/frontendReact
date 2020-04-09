import React from "react";

import { Breadcrumbs, Chip, withStyles, Box } from "@material-ui/core";

const styles = theme => ({
  root: {
    backgroundColor: "#315354",
    height: "30px",
    marginTop: "2px",
    color: "black",
    fontWeight: "600",
    "&:hover, &:focus": {
      backgroundColor: "#ADFCFF"
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: "#315354"
    }
  }
});

const Crumb = withStyles(styles)(Chip);

const BreadCrumbs = ({ crumbs }) => (
  <Breadcrumbs itemsAfterCollapse={1} itemsBeforeCollapse={1} maxItems={5}>
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
              style={{ color: "black", marginLeft: "6px" }}
            />
          }
        />
      </Box>
    ))}
  </Breadcrumbs>
);

export default BreadCrumbs;
