import React, { useState, useEffect } from "react";
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
import Collapse from "@material-ui/core/Collapse";
import Theimage from "./UniLogo.png";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Typography } from "@material-ui/core";
import { display } from '@material-ui/system';

const styles = (theme) => ({
  item: {
    backgroundColor: "#232f3e",
    paddingTop: 8.2,
    paddingBottom: 8.2,
    color: "rgba(255, 255, 255, 0.7)",
    width: "260px",
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  courseImage: {
    width: "45px",
    paddingLeft: "15px",
  },
  firebase: {
    fontSize: 24,
    height: "220px",
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    fontSize: 26,
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: "#232f3e",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 20,
  },
});

function Navigator({ classes, history }) {
  const [openCourses, setOpenCourse] = useState(false);
  useEffect(() => {
    // lma hnzbot al login isa htzbot (y)
  }, []);
  const navigate = (url = "./pages/MaterialsPage") => {
    history.push(url);
  };

  const categories = [
    {
      title: "Home",
      Icon: (
        <img
          src="https://img.icons8.com/metro/55/000000/home.png"
          alt="Home_LOGO"
        />
      ),
      route: "/materials",
    },
    {
      title: "Profile",
      Icon: (
        <img
          src="https://img.icons8.com/ios/55/000000/gender-neutral-user.png"
          alt="profile_LOGO"
        />
      ),
      route: "/profile",
    },
    {
      title: "Students",
      Icon: (
        <img
          src="https://img.icons8.com/dotty/55/000000/grades.png"
          alt="Students_LOGO"
        />
      ),
      route: "/students",
    },

    {
      title: "Courses",
      Icon: (
        <img
          src="https://img.icons8.com/ios-filled/55/000000/courses.png"
          alt="Courses_LOGO"
        />
      ),
      route: null,
      children: [
        {
          title: "object oriented design patterns",
          Icon: (
            <img
              src="https://img.icons8.com/wired/30/000000/book.png"
              className={classes.courseImage}
              alt="img"
            />
          ),
        },
        {
          title: "Course 1",
          Icon: (
            <img
              src="https://img.icons8.com/wired/30/000000/book.png"
              className={classes.courseImage}
              alt="img"
            />
          ),
        },
      ],
    },
    {
      title: "Contact Us",
      Icon: (
        <img
          src="https://img.icons8.com/ios-filled/50/000000/add-contact-to-company.png"
          alt="ContactUs_LOGO"
        />
      ),
      route: "/materials",
    },
    {
      title: "Sign Out",
      Icon: (
        <img
          src="https://img.icons8.com/ios/55/000000/exit.png"
          alt="SignOut_LOGO"
        />
      ),
      route: "/materials",
    },
  ];

  return (
    <Drawer variant="permanent">
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          <img src={Theimage} alt="FCIS_LOGO" width="210" />
        </ListItem>

        {categories.map(({ Icon, children, title, active, route }, index) =>
          children ? (
            <React.Fragment>
              <ListItem
                key={index}
                button
                onClick={() => setOpenCourse((prev) => !prev)}
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{Icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                  primary={title}
                />
                {openCourses ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openCourses} timeout="auto" unmountOnExit >
                <List component="div" disablePadding  >
                  {children.map(({ Icon: SubIcon, title }, index) => (
                    <ListItem key={index} button className={classes.nested}>
                      <ListItemIcon>{SubIcon}</ListItemIcon>
                      <ListItemText
                        classes={{
                          primary: classes.itemPrimary,
                        }}
                        primary={title}
                       
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem
              key={index}
              button
              onClick={() => navigate(route)}
              className={clsx(classes.item, active && classes.itemActiveItem)}
            >
              <ListItemIcon className={classes.itemIcon}>{Icon}</ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
                primary={title}
              />
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Navigator));
