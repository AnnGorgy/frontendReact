import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { truncate } from "lodash";
import { withRouter } from "react-router-dom";
import { post, get } from "axios";

//------------------------------------------------- Icons ------------------------------------------------
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
//--------------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Toolbar,
  Collapse,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  Drawer,
  withStyles,
  Divider,
  useTheme,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Images ---------------------------------------------------
import Theimage from "./UniLogo.png";
import ContactUsImage from "../NavBarImages/ContactUsImage.png";
import CoursesImage from "../NavBarImages/CoursesImage.png";
import HomeImage from "../NavBarImages/HomeImage.png";
import SignOutImage from "../NavBarImages/SignOutImage.png";
import CourseImageee from "../NavBarImages/CourseImage.png";
import ProfileImage from "../NavBarImages/ProfileImage.png";
//------------------------------------------------------------------------------------------------------------

// mostafa20191701201@cis.asu.edu.eg //
// instructor@chpsis.cis.asu.edu.eg //

function Navigator({ classes, history, match }) {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [openCourses, setOpenCourse] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  // Set The First Letter Of The Users' Name To capial //
  const EnName = JSON.parse(localStorage.getItem("Information")).NameEN;
  const ViewingName = EnName.charAt(0).toUpperCase() + EnName.substring(1);
  //-------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------
  const isUserLoggedIn = () => {
    if (localStorage.getItem("subjects") === null) {
      history.push("/login");
      return false;
    }
    return true;
  };

  //---------------------------------------------------------------------------------------------------------
  const DoctorInformation = async (CourseID) => {
    try {
      const url = "/Login/getDoctor";
      const { data } = await post(url, null, {
        params: {
          subjectId: CourseID,
        },
      });
      localStorage.setItem("DrInformation", JSON.stringify(data));
      const url2 = "/Login/getuserObject";
      const { data: data2 } = await get(url2, {
        params: {
          email: data[0].doctorEmail,
        },
      });
      localStorage.setItem("DocInformation", JSON.stringify(data2));
      /* window.location.reload(); */
    } catch (err) {
      console.error(err);
    }
  };
  //----------------------------------------------------------------------------------------------------------

  const createRootFolder = async (courseId) => {
    //FIXME: This shouldn't be a function or endpoint, otherwise it should be handled in the backend
    const url = "/Doctor_Materials/Create_First_Folder_Subject";
    /*  
    Get syntax (
     url " url (The local host that We Use IT To Add Root To New Subject ) ",
     body "no body cause this function use parametares only ", 
     options "It takes (2) Parameter"
     [1] sub_Id ... [2] Folder_Name ...
     ) 
     "folderName : We Add It From Subject LocalStorage To Set The Root To SubjectName"
    */
    const folderName = JSON.parse(localStorage.getItem("subjects")).find(
      (subject) => subject.ID == courseId
    ).Subjectname;
    await get(url, {
      params: { sub_Id: courseId, Folder_Name: folderName },
    });
  };

  //----------------------------------------------------------------------------------------------

  const listMaterials = async (courseId) => {
    const materialsUrl = `/Doctor_Materials/GetFiles`;
    /*  
    post syntax (
     url " materialsUrl (The local host that Get Materials In a specific subject) ",
     body "no body cause this function use parametares only", 
     options "It takes (1) Parameter"
     [1] sub_Id ... 
     ) 
    */
    const { data } = await post(materialsUrl, null, {
      params: { sub_Id: courseId },
    });
    if (data.length === 0) {
      await createRootFolder(courseId);
      window.location.reload();
    }
  };

  //----------------------------------------------------------------------------------------------
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const CourseIcon = (
    <img src={CourseImageee} className={classes.courseImage} alt="img" />
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
          style={{ width: "80px", hegith: "80px" , marginLeft:"-10px" }}
          src={HomeImage}
          alt="Home_LOGO"
        />
      ),
      onClick: () => history.push("/home"),
    },
    {
      title: ViewingName,
      Icon: (
        <img
          style={{ width: "70px", hegith: "70px" , marginLeft:"-2px" }}
          src={ProfileImage}
          alt="profile_LOGO"
        />
      ),

      onClick: () =>
        accountType == 2
          ? history.push("/Instructorprof")
          : history.push("/studentprof"),
    },
    {
      title: "Courses",
      Icon: (
        <img
          style={{ width: "55px", hegith: "55px" }}
          src={CoursesImage}
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
          style={{ width: "65px", hegith: "65px" , marginLeft:"-10px" }}
          src={ContactUsImage}
          alt="ContactUs_LOGO"
        />
      ),
      onClick: () => history.push("/ContactUs"),
    },
    {
      title: "Sign Out",
      Icon: (
        <img
          style={{ width: "100px", hegith: "100px" , marginLeft:"-20px" }}
          src={SignOutImage}
          alt="SignOut_LOGO"
        />
      ),
      onClick: () => {
        localStorage.clear();
        history.push("/");
      },
    },
  ];

  return (
    <React.Fragment>
      <Toolbar style={{ backgroundColor: "#1C1C1C", width: "12px" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon style={{ color: "white" }} />
        </IconButton>
      </Toolbar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={classes.drawerHeader}
          style={{ backgroundColor: "#1C1C1C", height: "4px" }}
        >
          <IconButton onClick={handleDrawerClose} fontSize={"small"}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color: "white" }} />
            ) : (
              <ChevronRightIcon style={{ color: "white" }} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List disablePadding>
          <ListItem className={clsx(classes.firebase, classes.item)}>
            <img
              src={Theimage}
              alt="FCIS_LOGO"
              style={{
                width: "auto",
                height:"auto",
                marginLeft: theme.spacing(4),
                marginBottom: theme.spacing(3),
                marginTop: theme.spacing(2),
              }}
            />
          </ListItem>
          <Divider />
          {categories.map(({ Icon, children, title, active, onClick }, index) =>
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
                    {children.map(({ Subjectname, ID }) => (
                      <ListItem
                        key={ID}
                        button
                        onClick={() => {
                          DoctorInformation(ID);
                          history.push(`/course/${ID}`);
                          listMaterials(ID);
                        }}
                        className={clsx(
                          classes.nested,
                          active && classes.itemActiveItem
                        )}
                      >
                        <ListItemIcon>{CourseIcon}</ListItemIcon>
                        <ListItemText
                          classes={{
                            primary: classes.itemPrimary,
                          }}
                          primary={truncate(Subjectname, { length: 25 })}
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
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{Icon}</ListItemIcon>
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

// Page Style //
const drawerWidth = 280;
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "black",
    backgroundColor: "#1C1C1C",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    backgroundColor: "#1C1C1C",
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1C1C1C",
    color: "white",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    color: "White",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  ///////////////////////////////////////////////////
  item: {
    backgroundColor: "#1C1C1C",
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 0.2,
    color: "rgba(255, 255, 255, 1.0)",
    width: "auto",
    height: "auto",
  },
  itemCategory: {
    backgroundColor: "#1C1C1C",
    boxShadow: "0 -1px 0 #404854 inset",
    color: "rgba(255, 255, 255, 1.0)",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  courseImage: {
    width: "45px",
    paddingLeft: "18px",
    paddingRight: "8px",
  },
  firebase: {
    fontSize: 24,
    height: "auto",
  },
  itemActiveItem: {
    color: "#4A4A4A",
    backgroundColor: "#4A4A4A",
  },
  itemPrimary: {
    fontSize: 30,
    fontWeight:600,
    color: "rgba(255, 255, 255, 1.0)",
  },
  itemIcon: {
    color: "#4A4A4A",
    minWidth: "auto",
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    paddingLeft:"10px"
  },
  nested: {
    paddingLeft: theme.spacing(1.5),
    backgroundColor: "#1C1C1C",
    width: "235px",
  },
});

export default withStyles(styles)(withRouter(Navigator));
