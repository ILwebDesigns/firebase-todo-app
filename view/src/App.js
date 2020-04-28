import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import login from "./pages/login.js";
import signup from "./pages/singup"
import home from './pages/home';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signup}/>
          <Route exact path="/" component={home}/>     
        </Switch>
      </div>
    </Router>
  );
}

export default App;
