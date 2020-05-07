import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  withStyles,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component -------------------------------
import ViewMCQStudentAnswers from "./ViewMCQStudentAnswers";
import ViewTrueFalseStudentAnswers from "./ViewTrueFalseStudentAnswers";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
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
  addButton: {
    borderRadius: "16px",
    width: "200px",
    color: "black",
    "&:hover, &:focus": {
      backgroundColor: "#CCF6FF",
      color: "black",
    },
  },
  addIcon: {
    marginTop: "4px",
  },
  buttonText: {
    color: "black",
    paddingLeft: "5px",
    fontSize: "16px",
    fontWeight: "600",
  },
  addButtonBody: {
    marginLeft: "4px",
    marginRight: "4px",
  },
  tableHeader: {
    paddingRight: "20px",
    paddingLeft: "1000px",
    marginTop: "20px",
    marginLeft: "30px",
    flexWrap: "nowrap",
  },
}));

const ViewStudentQuizAnswers = ({ match, history }) => {
  
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const classes = useStyles();
  const [allQuizzes, setAllQuizzes] = useState();
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  const SubjectName = JSON.parse(localStorage.getItem("subjects")).find(
    (subject) => subject.ID == match.params.courseId
  ).Subjectname;
  const [quizInfo, setQuizInfo] = useState();
  //--------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const QuizUrl = `/Student_Answers/GetQuizAnswerforStudent`;
    const { data } = await post(QuizUrl, null, {
      params: {
        QuizID: match.params.quizId,
        studentId: 1 /* JSON.parse(localStorage.getItem("StuInformation"))[0].StudentID */,
      },
    });
    setAllQuizzes(data);
  };
  //-----------------------------------------------------------------------------------------------------------
  const QuizInforrmation = async () => {
    const QuizUrl = `/Student_Answers/GetQuiz`;
    const { data } = await post(QuizUrl, null, {
      params: { quizID: match.params.quizId, sub_Id: match.params.courseId },
    });
    setQuizInfo(data);
  };
  //-----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    listQuizzes();
  }, [match.params.quizId]);

  useEffect(() => {
    if (accountType == 1) {
      QuizInforrmation();
    }
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
                your answers for {info.Name} in {SubjectName} on quiz date{" "}
                {info.startDate}
              </Typography>
            </Grid>

            <Grid item style={{ marginLeft: "970px", marginTop: "-40px" }}>
              <Button
                variant="outlined"
                color="default"
                size="small"
                className={classes.addButton}
                onClick={() => {
                  history.push(`/viewquiz/${match.params.courseId}/${info.id}`);
                }}
              >
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  className={classes.addButtonBody}
                >
                  <Grid item>
                    <QuestionAnswerIcon className={classes.addIcon} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.buttonText}>
                      Model Answers
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
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
                <ViewMCQStudentAnswers questionData={quiz} />
              ) : (
                <ViewTrueFalseStudentAnswers questionData={quiz} />
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default withStyles(useStyles)(withRouter(ViewStudentQuizAnswers));
