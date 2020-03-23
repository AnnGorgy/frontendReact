import React from "react";
import { Switch, Route } from "react-router-dom";

import { NotFoundPage, MaterialsPage } from "../pages";

const App = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={MaterialsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;
