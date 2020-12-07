import React from "react";

import { Switch, Route } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import Song from "./pages/Song";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:songId" component={Song} />
    </Switch>
  );
};

export default Routes;
