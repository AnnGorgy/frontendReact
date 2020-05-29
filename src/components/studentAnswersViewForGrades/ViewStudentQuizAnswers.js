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
import Grades from "../ViewingTheQuiz/Grades.png";
import QuestionNumber from "../QuizCreationComponents/QuestionNumber.png";
import CourseImage from "../QuizImages/CourseImage.png";
import DateImage from "../QuizImages/DateImage.png";
import QuizImage from "../QuizCreationComponents/QuizImage.png";
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
  const studentName = localStorage.getItem("StudentName");
  const studentId = localStorage.getItem("StudentID");
  const [allQuizzes, setAllQuizzes] = useState();
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  const SubjectName = JSON.parse(localStorage.getItem("subjects")).find(
    (subject) => subject.ID == match.params.courseId
  ).Subjectname;
  const [quizInfo, setQuizInfo] = useState();
  useEffect(() => {
    console.log({ studentName }, "ahmed", { studentId });
  }, []);
  //--------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------
  const listQuizzes = async () => {
    const QuizUrl = `/Student_Answers/GetQuizAnswerforStudent`;
    const { data } = await post(QuizUrl, null, {
      params: {
        QuizID: match.params.quizId,
        studentId: 3 /* JSON.parse(localStorage.getItem("StuInformation"))[0].StudentID */,
      },
    });
    setAllQuizzes(data);
  };
  //-----------------------------------------------------------------------------------------------------------
  const QuizInforrmation = async () => {
    const QuizUrl = `/Student_Answers/GetQuiz`;
    const { data } = await post(QuizUrl, null, {
      params: {
        quizID: match.params.quizId,
        sub_Id: match.params.courseId,
        StudID: 3,
      },
    });
    setQuizInfo(data);
  };
  //-----------------------------------------------------------------------------------------------------------

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
                        {JSON.parse(localStorage.getItem("Information")).NameAR}
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
                        {
                          JSON.parse(localStorage.getItem("StuInformation"))[0]
                            .SeatNo
                        }
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
                        {`ID:  ${studentId}`}
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
                    {info.startDate}
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
                  <ViewMCQStudentAnswers questionData={quiz} />
                )}
                {quiz.Type == "tf" && (
                  <ViewTrueFalseStudentAnswers questionData={quiz} />
                )}
                {quiz.Type == "match" && (
                  <ViewMatchStudentAnswer questionData={quiz} />
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
