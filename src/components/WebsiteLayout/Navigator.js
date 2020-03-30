import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import PublicIcon from "@material-ui/icons/Public";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import TimerIcon from "@material-ui/icons/Timer";
import SettingsIcon from "@material-ui/icons/Settings";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Theimage from "./UniLogo.png";

const categories = [
  {
    className: "FCIS LMS",
    children: [
      {
        id: "Home",
        icon: <img src="https://img.icons8.com/metro/50/000000/home.png" />,
        route: "/materials"
      },
      {
        id: "Profile",
        icon: (
          <img src="https://img.icons8.com/ios/50/000000/gender-neutral-user.png" />
        ),
        route: "/materials"
        
      },
      {
        id: "Materials",
        icon: <img src="https://img.icons8.com/ios/50/000000/courses.png" />,
        route: "/materials", children:[{ id: "oop",
        icon: <img src="https://img.icons8.com/metro/50/000000/home.png" />,
        route: "/materials"}, {id: "sw",
        icon: <img src="https://img.icons8.com/metro/50/000000/home.png" />,
        route: "/materials"}

        ]
      },
      {
        id: "Assignments",
        icon: <img src="https://img.icons8.com/dotty/50/000000/grades.png" />,
        route: "/assignments"
      },
      {
        id: "Help",
        icon: (
          <img src="https://img.icons8.com/carbon-copy/50/000000/question-mark.png" />
        ),
        route: "/materials"
      },
      {
        id: "Sign Out",
        icon: <img src="https://img.icons8.com/ios/50/000000/exit.png" />,
        route: "/materials"
      }
    ]
  }
];

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    backgroundColor: "#232f3e"
  },
  categoryHeaderPrimary: {
    //color: theme.palette.common.white,
  },
  item: {
    backgroundColor: "#232f3e",
    paddingTop: 6,
    paddingBottom: 5,
    color: "rgba(255, 255, 255, 0.7)"
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  firebase: {
    fontSize: 24
    //color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: "#4fc3f7"
  },
  itemPrimary: {
    fontSize: 20
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(2)
  },
  divider: {
    //  marginTop: theme.spacing(2),
  }
});

function Navigator(props) {
  const { classes, history, ...other } = props;

  const navigate = (url = "./pages/MaterialsPage") => {
    history.push(url);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          <img src={Theimage} width="210" />
        </ListItem>

        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, route }) => (
              <ListItem
                key={childId}
                button
                onClick={() => navigate(route)}
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            {/* <Divider className={classes.divider} /> */}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Navigator));
