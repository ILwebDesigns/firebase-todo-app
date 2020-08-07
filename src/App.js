import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import getCrsfToken from "./session/getCsrf";
import axios from "axios";

import { getCsrf, csrfSuccess, csrfFailure } from "./actions/users_actions";

import Login from "./containers/LogInContainer";
import Home from "./containers/HomeContainer";
import Public from "./components/Public";
import Spinner from "./containers/Spinner";

class App extends React.Component {
  componentDidMount() {
    const { getCsrf, csrfSuccess, csrfFailure } = this.props;
    getCsrf();
    const request = axios("/app/v1/auth", { withCredentials: true });
    request
      .then((result) => {
        axios.defaults.headers.common['csrf-token'] = result.data.csrfToken;
        return csrfSuccess();
      })
      .catch(() => {
        return csrfFailure("Service Unavalible");
      }); 
  }
  render() {
    return (
      <Router>
        <Spinner />
        <Switch>
          <Route exact path="/home" component={Public} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    progress: state.progress,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCsrf: () => {
      dispatch(getCsrf());
    },
    csrfSuccess: (token) => {
      dispatch(csrfSuccess(token));
    },
    csrfFailure: (err) => {
      dispatch(csrfFailure(err));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
