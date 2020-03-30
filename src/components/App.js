import React, { useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, withRouter } from "react-router-dom";

import { NotFoundPage, MaterialsPage , AssignmentPage, LoginPage} from "../pages";

const App = ({match}) => {

console.log(match);

  return (
    <Switch>
      <Route exact path={"/materials"} component={MaterialsPage} />
      <Route exact path={"/assignments"} component={AssignmentPage} />
      <Route exact path={"/login"} component={Loginpage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(App);
