import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { NotFoundPage, MaterialsPage , AssignmentPage, LoginPage} from "../pages";

const App = ({match}) => {

console.log(match);

  return (
    <Switch>
      <Route exact path={"/materials"} component={MaterialsPage} />
      <Route exact path={"/assignments"} component={AssignmentPage} />
      <Route exact path={"/login"} component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(App);


// TODO:

// 1 . Add the create button. [DONE]
// 1`. Fix Table Header styles. [DONE]
// 2 . Create component for the creation window. [3/5 DONE] (y)
// 2a. Folder, Link Form 
// 2b. File, Video, Assignment Form [DONE]
// 2bA. Wire up.

// 2 - add folder 
// ( name , create )

// 5 - add url 
// ( name , text , descreption )