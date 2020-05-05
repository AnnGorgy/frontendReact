import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import { Grid, withStyles, Typography } from "@material-ui/core";
import ViewMCQ from "./ViewMCQ";
import ViewTrueFalse from "./ViewTrueFalse";

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
  const listQuizzes = async () => {
    const QuizUrl = `/DoctorMakeQuiz/GetSpecificQuiz`;
    const { data } = await post(QuizUrl, null, {
      params: { quizID: match.params.quizId },
    });
    setAllQuizzes(data);
  };
  const [allQuizzes, setAllQuizzes] = useState();
  const SubjectName = JSON.parse(localStorage.getItem("subjects")).find(
    (subject) => subject.ID == match.params.courseId
  ).Subjectname;

  const QuizInforrmation = async () => {
    const QuizUrl = `/Student_Answers/GetQuiz`;
    const { data } = await post(QuizUrl, null, {
      params: { quizID: match.params.quizId, sub_Id: match.params.courseId },
    });
    setQuizInfo(data);
  };
  const [quizInfo, setQuizInfo] = useState();

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
              height: "100px",
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
              <Typography style={{ fontSize: "20px" }}>
                Model answers for {info.Name} in {SubjectName} on quiz date
                {info.startDate}
              </Typography>
            </Grid>
          </Grid>
        ))}
        {allQuizzes?.map((quiz, index) => (
          <Grid
            item
            style={{
              align: "left",
              height: "600px",
              marginTop: "10px",
              borderRadius: "2px",
              webkitBoxShadow: "5px 5px 5px #9E9E9E",
              mozBoxShadow: "5px 5px 5px #9E9E9E",
              boxShadow: "5px 5px 5px #9E9E9E",
              padding: "5px 5px 5px 5px",
              marginRight: "9px",
              backgroundColor: "white",
              width: "1240px",
            }}
          >
            <Grid item>
              <Grid item>
                <Typography
                  style={{
                    marginLeft: "200px",
                    fontFamily: "Monaco",
                    fontSize: "25px",
                    marginTop: "20px",
                    width: "140px",
                    padding: "2px 2px 2px 20px",
                    borderRadius: "16px",
                    border: "3px solid black",
                  }}
                >
                  {`Question: ${index + 1}`}
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  style={{
                    marginLeft: "500px",
                    fontFamily: "Monaco",
                    fontSize: "25px",
                    marginTop: "-45px",
                    width: "200px",
                    padding: "2px 2px 2px 20px",
                    borderRadius: "16px",
                    border: "3px solid black",
                  }}
                >
                  {`Question Grade: ${quiz.grade}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              {quiz.Type == "mcq" ? (
                <ViewMCQ questionData={quiz} />
              ) : (
                <ViewTrueFalse questionData={quiz} />
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default withStyles(useStyles)(withRouter(ViewQuizForInstructor));
