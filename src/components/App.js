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
} from "../pages";

const App = ({ match }) => {
  return (
    <Switch>
      <Route exact path={"/courses/:courseId/materials"} component={MaterialsPage} />
      <Route exact path={"/courses/:courseId/students"} component={StudentsInSubjectPage} />
      <Route exact path={"/courses/:courseId/StudentMaterials"} component={StudentMaterialPage} />
      <Route exact path={"/"} component={LoginPage} />
      <Route exact path = {"/ContactUs"}component={contactUs} />
      <Route exact path = {"home"}component={Home} />
      <Route exact path = {"/course/:courseId"}component={CourseHome} />
      <Route exact path = {"/studentprof"}component={StudentProfilePage} />
      <Route exact path = {"/Instructorprof"}component={InstructorProfilePage} />
      <Route exact path = {"/quiz/:courseId"} component={MainPageForQuiz} />
      <Route exact path = {"/quizstudent/:courseId"} component={MainPageForQuizStudent} />
      <Route exact path = {"/createquiz/:quizId"} component={QuizCreation} />
      <Route exact path = {"/viewquiz/:courseId/:quizId"} component={ViewQuizDetails} />
      <Route exact path = {"/studentanswers/:courseId/:quizId"} component={StudentAnswerPage} />
      <Route exact path = {"/assignmentInstructor/:courseId"} component={StudentAnswerForAssignmentPage} />
      <Route exact path = {"/assignmentstudent/:courseId"} component={AssignmentStudentAnswers} />
      <Route exact path = {"/studentgrades/:courseId"} component={StudentGrades} />
      <Route exact path = {"/answers/:courseId/:quizId"} component={ViewStudentAnswers} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(App);
