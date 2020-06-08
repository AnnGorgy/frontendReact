import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { truncate } from "lodash";
import { withRouter } from "react-router-dom";
import { post, get } from "axios";

//------------------------------------------------- Icons ------------------------------------------------
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
//--------------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  Drawer,
  withStyles,
  useTheme,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import StudentGroupsNumberForm from "../WebsiteLayoutForm/StudentGroupsNumberForm";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Images ---------------------------------------------------
import Theimage from "../NavBarImages/UniLogo.png";
import ContactUsImage from "../NavBarImages/ContactUsImage.png";
import CoursesImage from "../NavBarImages/CoursesImage.png";
import HomeImage from "../NavBarImages/HomeImage.png";
import SignOutImage from "../NavBarImages/SignOutImage.png";
import CourseImageee from "../NavBarImages/CourseImage.png";
import ProfileImage from "../NavBarImages/ProfileImage.png";
//------------------------------------------------------------------------------------------------------------

// mostafa20191701201@cis.asu.edu.eg //
// instructor@chpsis.cis.asu.edu.eg //
// osama20161702013@cis.asu.edu.eg //

function Navigator({ classes, history }) {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [openCourses, setOpenCourse] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseID, setCourseId] = useState("");
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  // Set The First Letter Of The Users' Name To capial //
  const EnName = JSON.parse(localStorage.getItem("Information")).NameAR;
  /*   const ViewingName = EnName.charAt(0).toUpperCase() + EnName.substring(1);
   */ const [NumberOfGroupsIsOpen, setNumberOfGroupsIsOpen] = useState(false);
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
    }
  };

  //----------------------------------------------------------------------------------------------
  const CheckNumberOfGroups = async (courseId, coursename) => {
    const Url = `/DoctorManagestudentsGroups/StudentGroupsExist`;
    const { data } = await post(Url, null, {
      params: { subjectId: courseId },
    });
    if (accountType == 2) {
      if (data == true) {
        history.push(`/course/${courseId}/${coursename}`);
      } else {
        setCourseId(courseId);
        setCourseName(coursename);
        setNumberOfGroupsIsOpen(true);
        console.log(courseId,coursename);
      }
    } else {
      history.push(`/course/${courseId}/${coursename}`);
    }
  };
  //--------------------------------------------------------------------------------------------------
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
          style={{ width: "80px", hegith: "80px", marginLeft: "-10px" }}
          src={HomeImage}
          alt="Home_LOGO"
        />
      ),
      onClick: () => history.push("/home"),
    },
    {
      title: EnName,
      Icon: (
        <img
          style={{ width: "70px", hegith: "70px", marginLeft: "-2px" }}
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
          style={{ width: "65px", hegith: "65px", marginLeft: "-10px" }}
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
          style={{ width: "100px", hegith: "100px", marginLeft: "-20px" }}
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
      <StudentGroupsNumberForm
        title="Grouping Students"
        isOpened={NumberOfGroupsIsOpen}
        CourseIDD={courseID}
        CourseNamee={courseName}
      />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List disablePadding>
          <ListItem className={clsx(classes.firebase, classes.item)}>
            <img
              src={Theimage}
              alt="FCIS_LOGO"
              style={{
                width: "auto",
                height: "auto",
                marginLeft: theme.spacing(2),
                marginBottom: theme.spacing(3),
                marginTop: theme.spacing(0.2),
              }}
            />
          </ListItem>
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
                          listMaterials(ID);
                          CheckNumberOfGroups(ID, Subjectname);
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
const drawerWidth = 240;
const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    backgroundColor: "#021316  ",
    flexShrink: 0,
  },
  drawerPaper: {
    overflowY: "auto",
    overflowX: "hidden",
    width: drawerWidth,
    backgroundColor: "#021316  ",
    color: "white",
  },
  item: {
    backgroundColor: "#021316  ",
    paddingLeft: 0.2,
    paddingBottom: 12,
    paddingTop: 12,
    color: "rgba(255, 255, 255, 1.0)",
    width: "auto",
    height: "auto",
  },
  courseImage: {
    width: "30px",
    paddingLeft: "12px",
  },
  firebase: {
    fontSize: 20,
    height: "auto",
  },
  itemActiveItem: {
    color: "#4A4A4A",
    backgroundColor: "#4A4A4A",
  },
  itemPrimary: {
    fontSize: 20,
    fontWeight: 600,
    color: "rgba(255, 255, 255, 1.0)",
  },
  itemIcon: {
    color: "#021316",
    minWidth: "auto",
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    paddingLeft: "10px",
  },
  nested: {
    paddingLeft: theme.spacing(1.5),
    backgroundColor: "#021316",
    width: "240px",
  },
});

export default withStyles(styles)(withRouter(Navigator));
