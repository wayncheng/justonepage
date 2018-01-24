import React from "react";
import { Route, BrowserRouter, HashRouter, Switch, Redirect } from "react-router-dom";
import OnePage from "../OnePage";


const Routes = (
		<BrowserRouter >
        <Switch>
            {/* <Route path="/@" component={OnePage} /> */}
            <Route path="/:username?" component={OnePage} />
            <Route component={NoMatch} />
        </Switch>
    </BrowserRouter>
);
export default Routes;

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)