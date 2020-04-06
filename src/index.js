import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';


import { App } from "./components";
import { Home } from "./pages";
import{LoginPage} from "./pages";
import{MaterialsPage} from "./pages";
import theme from "./assets/theme";

import * as serviceWorker from "./serviceWorker";

let AppWrapper = props => {
  return (
    <React.Fragment>
      <Switch>
      <Route path="/materials" component={MaterialsPage} />
      <Route path="/login" component={LoginPage} />
        <Route path="/home" component={Home} />
        <Route path="/" component={App} />
      </Switch>
    </React.Fragment>
  );
};

AppWrapper = withRouter(AppWrapper);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <AppWrapper />
      </Router>
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();