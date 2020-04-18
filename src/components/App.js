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
} from "../pages";

const App = ({ match }) => {
  return (
    <Switch>
      {/* hn add link that can take params .. e7na 3awzeno y match m3
      localhost:xxxx://courses/yy/materials
      ely hyegy f yy da mo3tmd 3la anhi course galna
      fa in order to declare variable fl link bn3mlo by adding : before it
      da hy match m3 courses/1/materials and courses/2/materials and courses/3/materials w ay 7aga bl shkl da
      */}
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
      <Route exact path = {"/createquiz"} component={QuizCreation} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(App);
