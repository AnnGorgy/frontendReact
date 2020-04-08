import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { truncate } from "lodash";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { UserProfile } from "../";
// Images // 
import Theimage from "./UniLogo.png";


// Page Style // 
const styles = (theme) => ({
  item: {
    backgroundColor: "#232f3e",
    paddingTop: 17.3,
    paddingBottom: 17.3,
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
    paddingLeft: theme.spacing(3),
  },
});

function Navigator({ classes, history, match }) {
  const [openCourses, setOpenCourse] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const isUserLoggedIn = () => {
    if (localStorage.getItem("subjects") === null) {
      history.push("/login");
      return false;
    }
    return true;
  };

  // Set The First Letter Of The Users' Name To capial // 
  const   EnName =(JSON.parse(localStorage.getItem("Information")).NameEN);
  const ViewingName =EnName.charAt(0).toUpperCase()+EnName.substring(1);

  useEffect(() => {
    if (isUserLoggedIn()) {
      setSubjects(JSON.parse(localStorage.getItem("subjects")));
    }
  }, []);

  
  /* 
  courseIcon: IT Contains the Image for the course and it's style .
  Title : The name of the Buttom in the navigation bar "For The course".
  img : 
  1- src : the Image of the button in the navigation bar "For the Course".
  2- alt : The name that will appear when the image does not exist .
  */ 
  const CourseIcon = (
    <img
      src="https://img.icons8.com/wired/30/000000/book.png"
      className={classes.courseImage}
      alt="img"
    />
  );

  /* 
  categories : IT Contains an array for the navigation bars' Name .
  Title : The name of the Buttom in the navigation bar.
  img : 
  1- src : the Image of the button in the navigation bar.
  2- alt : The name that will appear when the image does not exist .
  */ 
  const categories = [
    {
      title: "Home",
      Icon: (
        <img
          src="https://img.icons8.com/metro/55/000000/home.png"
          alt="Home_LOGO"
        />
      ),
      onClick: () => history.push("/home"),
    },
    {
      title: ViewingName,
      Icon: (
        <img
          src="https://img.icons8.com/ios/55/000000/gender-neutral-user.png"
          alt="profile_LOGO"
        />
      ),
      onClick: () => setOpenProfile(true),
    },
    {
      title: "Students",
      needCourse: true,
      Icon: (
        <img
          src="https://img.icons8.com/wired/55/000000/students.png"
          alt="Students_LOGO"
        />
      ),
      onClick: () => {
        const coursesUrl = match.url.split("/");
        if (coursesUrl.length === 4) coursesUrl.pop();
        history.push(`${coursesUrl.join("/")}/students`);
      },
    },
    {
      title: "Materials",
      needCourse: true,
      Icon: (
        <img
          src="https://img.icons8.com/pastel-glyph/55/000000/saving-book.png"
          alt="MATERIALS_LOGO"
        />
      ),
      onClick: () => {
        const coursesUrl = match.url.split("/");
        if (coursesUrl.length === 4) coursesUrl.pop();
        history.push(`${coursesUrl.join("/")}/materials`);
      },
    },
    {
      title: "Courses",
      Icon: (
        <img
          src="https://img.icons8.com/ios-filled/55/000000/courses.png"
          alt="Courses_LOGO"
        />
      ),
      onClick: null,
      children: subjects,
    },
    {
      title: "Contact Us",
      Icon: (
        <img
          src="https://img.icons8.com/ios-filled/55/000000/add-contact-to-company.png"
          alt="ContactUs_LOGO"
        />
      ),
      onClick: () => history.push("/materials"),
    },
    {
      title: "Sign Out",
      Icon: (
        <img
          src="https://img.icons8.com/ios/55/000000/exit.png"
          alt="SignOut_LOGO"
        />
      ),
      onClick: () => history.push("/materials"),
    },
  ];

  return (
    <React.Fragment>
      <UserProfile
        isOpened={openProfile}
        onClose={() => setOpenProfile(false)}
      />
      <Drawer variant="permanent">
        <List disablePadding>
          <ListItem
            className={clsx(
              classes.firebase,
              classes.item,
              classes.itemCategory
            )}
          >
            <img src={Theimage} alt="FCIS_LOGO" width="210" />
          </ListItem>

          {categories
            .filter((category) =>
              category.needCourse ? Boolean(match.params.courseId) : true
            )
            .map(({ Icon, children, title, active, onClick }, index) =>
              children ? (
                <React.Fragment>
                  <ListItem
                    key={index}
                    button
                    onClick={() => setOpenCourse((prev) => !prev)}
                    className={clsx(
                      classes.item,
                      active && classes.itemActiveItem
                    )}
                  >
                    <ListItemIcon className={classes.itemIcon}>
                      {Icon}
                    </ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.itemPrimary,
                      }}
                      primary={truncate(title, { length: 20 })}
                    />
                    {openCourses ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={openCourses} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {children.map(({ Subjectname, $id }) => (
                        <ListItem
                          key={$id}
                          button
                          onClick={() => history.push(`/courses/${$id}/materials`)}
                          className={clsx(
                            classes.item,
                            classes.nested,
                            active && classes.itemActiveItem
                          )}
                        >
                          <ListItemIcon>{CourseIcon}</ListItemIcon>
                          <ListItemText
                            classes={{
                              primary: classes.itemPrimary,
                            }}
                            primary={truncate(Subjectname, { length: 20 })}
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
                  onClick={onClick}
                  className={clsx(
                    classes.item,
                    active && classes.itemActiveItem
                  )}
                >
                  <ListItemIcon className={classes.itemIcon}>
                    {Icon}
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                    primary={truncate(title, { length: 20 })}
                  />
                </ListItem>
              )
            )}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Navigator));
