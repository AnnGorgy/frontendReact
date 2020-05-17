import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import {
  Home,
  MaterialsPage,
  LoginPage,
  StudentsInSubjectPage,
  contactUs,
  StudentMaterialPage,
  CourseHome,
  StudentProfilePage,
  InstructorProfilePage,
  NotFoundPage,
  MainPageForQuiz,
  QuizCreation,
  ViewQuizDetails,
  MainPageForQuizStudent,
  StudentAnswerPage,
  StudentAnswerForAssignmentPage,
  AssignmentStudentAnswers,
  StudentGrades,
  ViewStudentAnswers,
  DoctorTableStudentQuizAnswers,
} from "../pages";

const App = ({ match }) => {
  return (
    <Switch>
      <Route exact path={"/courses/:courseId/:coursename/materials"} component={MaterialsPage} />
      <Route exact path={"/courses/:courseId/:coursename/students"} component={StudentsInSubjectPage} />
      <Route exact path={"/courses/:courseId/:coursename/StudentMaterials"} component={StudentMaterialPage} />
      <Route exact path={"/"} component={LoginPage} />
      <Route exact path = {"/ContactUs"}component={contactUs} />
      <Route exact path = {"home"}component={Home} />
      <Route exact path = {"/course/:courseId/:coursename"}component={CourseHome} />
      <Route exact path = {"/studentprof"}component={StudentProfilePage} />
      <Route exact path = {"/Instructorprof"}component={InstructorProfilePage} />
      <Route exact path = {"/quiz/:courseId/:coursename"} component={MainPageForQuiz} />
      <Route exact path = {"/quizstudent/:courseId/:coursename"} component={MainPageForQuizStudent} />
      <Route exact path = {"/createquiz/:courseId/:quizId/:coursename"} component={QuizCreation} />
      <Route exact path = {"/viewquiz/:courseId/:quizId"} component={ViewQuizDetails} />
      <Route exact path = {"/studentanswers/:courseId/:quizId/:coursename"} component={StudentAnswerPage} />
      <Route exact path = {"/assignmentInstructor/:courseId/:coursename"} component={StudentAnswerForAssignmentPage} />
      <Route exact path = {"/assignmentstudent/:courseId/:coursename"} component={AssignmentStudentAnswers} />
      <Route exact path = {"/studentgrades/:courseId/:coursename"} component={StudentGrades} />
      <Route exact path = {"/answers/:courseId/:quizId"} component={ViewStudentAnswers} />
      <Route exact path = {"/studentquizanswers/:courseId/:quizId"} component={DoctorTableStudentQuizAnswers} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(App);
