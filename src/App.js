import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes } from "./untils/route";
import React from "react";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route path={route.path} key={index} exact>
              {route.component}
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
