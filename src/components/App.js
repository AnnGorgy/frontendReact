import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import {
  Home,
  MaterialsPage,
  AssignmentPage,
  LoginPage,
  StudentsInSubjectPage,
} from "../pages";

const App = ({ match }) => {
  return (
    <Switch>
      <Route exact path={"/materials"} component={MaterialsPage} />
      <Route exact path={"/assignments"} component={AssignmentPage} />
      <Route exact path={"/students"} component={StudentsInSubjectPage} />
      <Route exact path={"/"} component={LoginPage} />
      <Route exact path = {"home"}component={Home} />
    </Switch>
  );
};

export default withRouter(App);
