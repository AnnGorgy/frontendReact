import React from "react";

//--------------------------------- What was used from material ui core -------------------------------------
import { Breadcrumbs, Chip, withStyles, Box } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

// Bread Crumbs styles
const styles = theme => ({
  root: {
    backgroundColor: "#0A5764 ",
    height: "30px",
    marginTop: "2px",
    color: "white",
    fontWeight: "600",
    "&:hover, &:focus": {
      backgroundColor: "#3C808C"
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: "#3C808C "
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
              style={{ color: "white", marginLeft: "6px" }}
            />
          }
        />
      </Box>
    ))}
  </Breadcrumbs>
);

export default BreadCrumbs;
