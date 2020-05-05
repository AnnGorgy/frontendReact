import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Grades from "./Grades.png";
import materials from "./Materials.jpg";
import { post } from "axios";
import Quizs from "./Quizs.jpg";
import Assignments from "./Assignments.jpg";
import UploadExcelSheet from "../UploadExcelSheet";
import Excel from "./ExcelSheet.jpg";
import AssignmentDoctor from "./AssignmentDoctor.png";

//--------------------------------- What was used from material ui core -------------------------------------
import { Typography, ButtonBase, makeStyles } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 0,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid black",
        color: "black",
        fontWeight: "bold",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.6,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: "5px",
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const CoursesNavigationButtons = ({ history, match }) => {
  const classes = useStyles();

  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  const [ExcelSheetIsOpen, setExcelSheetIsOpen] = useState(false);

  const ExcelSheet = async ({ file, callback }) => {
    const url = "/Doctor_Manage_student/importExcelSheet";
    const formData = new FormData();
    formData.append("Document", file);
    try {
      await post(url, formData, {
        params: {
          subjectId: match.params.courseId,
        },
      });

      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };

  const images = [
    {
      url: materials,
      title: "Open Materials",
      onClick: () =>
        accountType == 2
          ? history.push(`/courses/${match.params.courseId}/materials`)
          : history.push(`/courses/${match.params.courseId}/StudentMaterials`),
    },
    {
      url: Quizs,
      title: accountType !== 2 ? "Online Quiz" : "Create Quiz",
      onClick: () =>
        accountType == 2
          ? history.push(`/quiz/${match.params.courseId}`)
          : history.push(`/quizstudent/${match.params.courseId}`),
    },
    {
      url: accountType == 2 ? AssignmentDoctor : Assignments,
      title:
        accountType !== 2
          ? "Upload assignment answers"
          : "Student Assignment Answers",
      onClick: () =>
        accountType == 2
          ? history.push(`/assignmentInstructor/${match.params.courseId}`)
          : history.push(`/assignmentstudent/${match.params.courseId}`),
    },
    {
      url: accountType == 2 ? Excel : Grades,
      title: accountType == 2 ? "Upload Grades From Excel sheet" : "Grades",
      onClick: () =>
        accountType == 2
          ? setExcelSheetIsOpen(true)
          : history.push(`/studentgrades/${match.params.courseId}`),
    },
  ];

  return (
    <React.Fragment>
      <UploadExcelSheet
        title="Upload Excel Sheet"
        isOpened={ExcelSheetIsOpen}
        onClose={() => setExcelSheetIsOpen(false)}
        onSubmit={({ blobs }) =>
          ExcelSheet({
            file: blobs,
            callback: () => setExcelSheetIsOpen(false),
          })
        }
      />
      <div className={classes.root}>
        {images.map(({ title, url, onClick }) => (
          <ButtonBase
            focusRipple
            key={title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            onClick={onClick}
            style={{
              width: "25%",
              height: "470px",
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
      </div>
    </React.Fragment>
  );
};

export default withRouter(CoursesNavigationButtons);
