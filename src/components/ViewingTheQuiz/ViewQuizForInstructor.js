import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { post } from "axios";
import { withRouter } from "react-router-dom";
//--------------------------------- What was used from material ui core -------------------------------------
import { Grid, withStyles, Typography } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component -------------------------------
import ViewMCQ from "./ViewMCQ";
import ViewTrueFalse from "./ViewTrueFalse";
import ViewMatch from "./ViewMatch";
//---------------------------------------------------------------------------------------------------------

//------------------------------------------------ Images ---------------------------------------------------
import Grades from "./Grades.png";
import QuestionNumber from "../QuizCreationComponents/QuestionNumber.png";
import CourseImage from "../QuizImages/CourseImage.png";
import DateImage from "../QuizImages/DateImage.png";
import QuizImage from "../QuizCreationComponents/QuizImage.png";

//-----------------------------------------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1257,
    flexGrow: 1,
    //marginTop:"100px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 60,
    webkitBoxShadow: "5px 5px 5px #9E9E9E",
    mozBoxShadow: "5px 5px 5px #9E9E9E",
    boxShadow: "5px 5px 5px #9E9E9E",
    //paddingLeft: theme.spacing(120),
    backgroundColor: theme.palette.background.default,
    font: 50,
  },
}));

const ViewQuizForInstructor = ({ match }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuizzes, setAllQuizzes] = useState();
  const SubjectName = JSON.parse(localStorage.getItem("subjects")).find(
    (subject) => subject.ID == match.params.courseId
  ).Subjectname;
  const [quizInfo, setQuizInfo] = useState();
  //---------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const QuizUrl = `/DoctorMakeQuiz/GetSpecificQuiz`;
    const { data } = await post(QuizUrl, null, {
      params: { quizID: match.params.quizId },
    });
    setAllQuizzes(data);
  };
  //----------------------------------------------------------------------------------------------------------
  const QuizInforrmation = async () => {
    const QuizUrl = `/Student_Answers/GetQuiz`;
    const { data } = await post(QuizUrl, null, {
      params: { quizID: match.params.quizId, sub_Id: match.params.courseId },
    });
    setQuizInfo(data);
  };
  //---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    listQuizzes();
  }, [match.params.quizId]);

  useEffect(() => {
    QuizInforrmation();
  }, [match.params.quizId, match.params.courseId]);

  return (
    <React.Fragment>
      <Grid item style={{ marginTop: "20px" }}>
        {quizInfo?.map((info) => (
          <Grid
            item
            style={{
              height: "auto",
              borderRadius: "2px",
              webkitBoxShadow: "5px 5px 5px #9E9E9E",
              mozBoxShadow: "5px 5px 5px #9E9E9E",
              boxShadow: "5px 5px 5px #9E9E9E",
              padding: "40px 40px 40px 40px",
              marginRight: "9px",
              backgroundColor: "white",
              width: "1240px",
            }}
          >
            <Grid item>
              <Grid item style={{marginLeft:"450px" , marginTop:"10px"}}>
                <Grid item>
                  <img
                    src={QuizImage}
                    alt="CourseImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Grid>
                <Grid item style={{ marginTop: "-55px", marginLeft: "80px" }}>
                  <Typography style={{ fontSize: "35px" }}>
                    {info.Name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item style={{marginLeft:"430px" , marginTop:"10px"}}>
                <Grid item>
                  <img
                    src={CourseImage}
                    alt="CourseImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Grid>
                <Grid item style={{ marginTop: "-55px", marginLeft: "80px" }}>
                  <Typography style={{ fontSize: "35px" }}>
                    {SubjectName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item style={{marginLeft:"295px" , marginTop:"10px"}}>
                <Grid item>
                  <img
                    src={DateImage}
                    alt="DateImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Grid>
                <Grid item style={{ marginTop: "-55px", marginLeft: "80px" }}>
                  <Typography style={{ fontSize: "35px" }}>
                    {info.startDate}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
        {allQuizzes?.map((quiz, index) => (
          <Grid
            item
            style={{
              align: "left",
              height: "auto",
              marginTop: "10px",
              borderRadius: "2px",
              webkitBoxShadow: "5px 5px 5px #9E9E9E",
              mozBoxShadow: "5px 5px 5px #9E9E9E",
              boxShadow: "5px 5px 5px #9E9E9E",
              padding: "10px 10px 10px 10px",
              marginRight: "9px",
              backgroundColor: "white",
              width: "1240px",
            }}
          >
            <Grid
              item
              style={{
                padding: "10px 10px 10px 10px",
                borderRadius: "16px",
                border: "3px solid black",
                width: "220px",
                height: "75px",
                marginLeft: "109px",
                marginTop: "15px",
              }}
            >
              <Grid item style={{ marginLeft: "10px" }}>
                <img
                  src={QuestionNumber}
                  alt="QuestionNumberImage"
                  style={{ width: "50px", height: "50px" }}
                />
              </Grid>
              <Grid item style={{ marginTop: "-50px", marginLeft: "40px" }}>
                <Typography
                  style={{
                    marginLeft: "30px",
                    fontFamily: "Monaco",
                    fontSize: "25px",
                  }}
                >
                  {`Question ${index + 1}`}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Grid item style={{ marginTop: "10px" }}>
                <Grid
                  item
                  style={{
                    padding: "10px 10px 10px 10px",
                    borderRadius: "16px",
                    border: "3px solid black",
                    width: "180px",
                    height: "75px",
                    marginLeft: "880px",
                  }}
                >
                  <Grid item style={{ marginLeft: "10px" }}>
                    <img
                      src={Grades}
                      alt="GradeImage"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "-50px", marginLeft: "40px" }}>
                    <Typography
                      style={{
                        marginLeft: "30px",
                        fontFamily: "Monaco",
                        fontSize: "25px",
                      }}
                    >
                      {`Mark: ${quiz.grade}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: "-100px" }}>
                {quiz.Type == "mcq" && (
                  <ViewMCQ questionData={quiz} />
                )} 
                {quiz.Type == "tf" && (
                  <ViewTrueFalse questionData={quiz} />
                )}
                {quiz.Type == "match" && (
                  <ViewMatch questionData={quiz} />
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default withStyles(useStyles)(withRouter(ViewQuizForInstructor));
