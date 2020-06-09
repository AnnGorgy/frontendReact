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
  Tooltip,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component -------------------------------
import ViewMCQStudentAnswers from "./ViewMCQStudentAnswers";
import ViewTrueFalseStudentAnswers from "./ViewTrueFalseStudentAnswers";
import ViewMatchStudentAnswer from "./ViewMatchStudentAnswer";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------ Images ---------------------------------------------------
import Grades from "../QuizImages/Grades.png";
import QuestionNumber from "../QuizImages/QuestionNumber.png";
import CourseImage from "../QuizImages/CourseImage.png";
import DateImage from "../QuizImages/DateImage.png";
import QuizImage from "../QuizImages/QuizImage.png";
import NAME from "../QuizImages/StudentName.png";
import ID from "../QuizImages/StudentId.png";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
//-----------------------------------------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1257,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 60,
    webkitBoxShadow: "5px 5px 5px #9E9E9E",
    mozBoxShadow: "5px 5px 5px #9E9E9E",
    boxShadow: "5px 5px 5px #9E9E9E",
    backgroundColor: theme.palette.background.default,
    font: 50,
  },
  addButton: {
    borderRadius: "16px",
    width: "auto",
    height: "auto",
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
  const [studentName, setStudentName] = useState("");
  const [studentIdd, setStudentID] = useState(0);
  const [allQuizzes, setAllQuizzes] = useState();
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  const SubjectName = JSON.parse(localStorage.getItem("subjects")).find(
    (subject) => subject.ID == match.params.courseId
  ).Subjectname;
  const [quizInfo, setQuizInfo] = useState();
  const [StudentSeatNumber, setStudentSeatNumber] = useState(0);
  //--------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const QuizUrl = `/Student_Answers/GetQuizAnswerforStudent`;
    const { data } = await post(QuizUrl, null, {
      params: {
        QuizID: match.params.quizId,
        studentId: studentIdd,
      },
    });
    setAllQuizzes(data);
  };
  //-----------------------------------------------------------------------------------------------------------
  const QuizInforrmation = async () => {
    const QuizUrl = `/DoctorMakeQuiz/GetQuiz`;
    const { data } = await post(QuizUrl, null, {
      params: {
        quizID: match.params.quizId,
        sub_Id: match.params.courseId,
      },
    });
    setQuizInfo(data);
  };
  //-----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    listQuizzes();
  }, [match.params.quizId, studentIdd]);

  useEffect(() => {
    QuizInforrmation();
  }, [match.params.quizId, match.params.courseId]);

  useEffect(() => {
    if (accountType == 1) {
      setStudentName(
        JSON.parse(localStorage.getItem("StuInformation"))[0].NameAR
      );
      setStudentID(
        JSON.parse(localStorage.getItem("StuInformation"))[0].StudentID
      );
      setStudentSeatNumber(
        JSON.parse(localStorage.getItem("StuInformation"))[0].SeatNo
      );
    } else {
      setStudentName(localStorage.getItem("StudentName"));
      setStudentID(localStorage.getItem("StudentID"));
      setStudentSeatNumber(localStorage.getItem("StudentSeatNumber"));
    }
  }, [accountType]);

  return (
    <React.Fragment>
      <Grid item style={{ marginTop: "20px" }}>
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
          {accountType == 1 ? (
            <Grid
              item
              style={{
                borderRadius: "16px",
                border: "5px solid black",
                width: "330px",
                padding: "10px",
                marginLeft: "380px",
              }}
            >
              <Typography style={{ fontSize: "50px" }}>Your Answer</Typography>
            </Grid>
          ) : (
            <Grid
              item
              style={{
                borderRadius: "16px",
                border: "5px solid black",
                width: "400px",
                padding: "10px",
                marginLeft: "350px",
              }}
            >
              <Typography style={{ fontSize: "50px" }}>
                Student Answer
              </Typography>
            </Grid>
          )}
        </Grid>
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
              marginTop: "10px",
            }}
          >
            <Grid item>
              {accountType == 1 ? (
                <Grid item>
                  <Grid item style={{ marginLeft: "800px" }}>
                    <Grid item style={{ marginLeft: "300px" }}>
                      <img
                        src={NAME}
                        alt="StudentNameImage"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Grid>
                    <Grid item style={{ marginTop: "-50px" }}>
                      <Typography style={{ fontSize: "25px" }}>
                        {studentName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginLeft: "30px", marginTop: "-35px" }}>
                    <Grid item>
                      <img
                        src={ID}
                        alt="StudentIdImage"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Grid>
                    <Grid
                      item
                      style={{ marginTop: "-50px", marginLeft: "70px" }}
                    >
                      <Typography style={{ fontSize: "25px" }}>
                        {`ID:  ${StudentSeatNumber}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid item>
                  <Grid item style={{ marginLeft: "800px" }}>
                    <Grid item style={{ marginLeft: "300px" }}>
                      <img
                        src={NAME}
                        alt="StudentNameImage"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Grid>
                    <Grid item style={{ marginTop: "-50px" }}>
                      <Typography style={{ fontSize: "25px" }}>
                        {studentName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginLeft: "30px", marginTop: "-35px" }}>
                    <Grid item>
                      <img
                        src={ID}
                        alt="StudentIdImage"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Grid>
                    <Grid
                      item
                      style={{ marginTop: "-50px", marginLeft: "70px" }}
                    >
                      <Typography style={{ fontSize: "25px" }}>
                        {`ID:  ${StudentSeatNumber}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item style={{ marginLeft: "450px", marginTop: "10px" }}>
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
              <Grid item style={{ marginLeft: "430px", marginTop: "10px" }}>
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
              <Grid item style={{ marginLeft: "295px", marginTop: "10px" }}>
                <Grid item>
                  <img
                    src={DateImage}
                    alt="DateImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Grid>
                <Grid item style={{ marginTop: "-55px", marginLeft: "80px" }}>
                  <Typography style={{ fontSize: "35px" }}>
                    {info.Start}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {accountType == 1 && (
              <Grid item style={{ marginLeft: "910px", marginTop: "-40px" }}>
                <Tooltip
                  title={
                    <div style={{ fontSize: "14px" }}>
                      Click to see the model answer
                    </div>
                  }
                  placement="bottom"
                >
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    disabled={info.Finish == false}
                    className={classes.addButton}
                    onClick={() => {
                      history.push(
                        `/viewquiz/${match.params.courseId}/${info.id}`
                      );
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
                          {info.Name} Model Answers
                        </Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </Tooltip>
              </Grid>
            )}
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

            <Grid item>
              <Grid item style={{ marginTop: "20px", marginLeft: "700px" }}>
                <Grid
                  container
                  justify="center"
                  style={{
                    padding: "10px 10px 10px 10px",
                    borderRadius: "16px",
                    border: "3px solid black",
                    width: "auto",
                    height: "auto",
                    marginRight: "100px",
                    alignItems: "center",
                  }}
                >
                  <Grid item>
                    <img
                      src={Grades}
                      alt="GradeImage"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{
                        marginLeft: "10px",
                        fontFamily: "Monaco",
                        fontSize: "25px",
                      }}
                    >
                      {`Mark: ${quiz.grade}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: "-70px" }}>
                {quiz.Type == "mcq" && (
                  <ViewMCQStudentAnswers questionData={quiz} Index={index} />
                )}
                {quiz.Type == "tf" && (
                  <ViewTrueFalseStudentAnswers questionData={quiz} Index={index} />
                )}
                {quiz.Type == "match" && (
                  <ViewMatchStudentAnswer questionData={quiz} Index={index} />
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default withStyles(useStyles)(withRouter(ViewStudentQuizAnswers));
