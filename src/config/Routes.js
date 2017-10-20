import React from "react";
import { Route, BrowserRouter, HashRouter, Switch, Redirect } from "react-router-dom";
import OnePage from "../OnePage";


const Routes = (
		<BrowserRouter >
        <Switch>
            <Route exact path="/" component={OnePage} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
