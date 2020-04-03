import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import {
  NotFoundPage,
  MaterialsPage,
  AssignmentPage,
  LoginPage,
  StudentsInSubjectPage,
  DoctorProfilePage
} from "../pages";

const App = ({ match }) => {
  return (
    <Switch>
      <Route exact path={"/materials"} component={MaterialsPage} />
      <Route exact path={"/assignments"} component={AssignmentPage} />
      <Route exact path={"/students"} component={StudentsInSubjectPage} />
      <Route exact path={"/login"} component={LoginPage} />
      <Route exact path={"/profile"} component={DoctorProfilePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(App);
