import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withRouter } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Grades from './Grades.png';
import materials from './Materials.jpg';
import Quizs from './Quizs.jpg';
import Quiz from '../Quiz';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 0,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const CoursesNavigationButtons = ({ history , match }) => {
  const classes = useStyles();


  const [OpenQuiz, setOpenQuiz] = useState(false);
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );

  const images = [
    {
      url: materials,
      title: 'Open Materials',
      onClick: () =>
        accountType == 2
          ? history.push(`/courses/${match.params.courseId}/materials`)
          : history.push(`/courses/${match.params.courseId}/StudentMaterials`),
    },
    {
      url: Quizs,
      title: 'Create Online Quiz',
      onClick: () =>  setOpenQuiz(true),
    },
    {
      url: Grades,
      title: 'Open Grades',
      onClick: () => history.push("/home"),
    },
  ];

  return (
    <React.Fragment>
    <Quiz isOpened={OpenQuiz} onClose={() => setOpenQuiz(false)} />
    <div className={classes.root}>
      {images.map(({ title, url, onClick }) => (
        <ButtonBase
          focusRipple
          key={title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          onClick={onClick}
          style={{
            width: "33.33%",
            height: "455px"
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
}

export default withRouter(CoursesNavigationButtons);