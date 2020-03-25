import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { NotFoundPage, MaterialsPage , AssignmentPage} from "../pages";

const App = ({match}) => {

console.log(match);

  return (
    <Switch>
      <Route exact path={"/materials"} component={MaterialsPage} />
      <Route exact path={"/assignments"} component={AssignmentPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(App);
