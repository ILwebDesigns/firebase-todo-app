import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import Home from "../components/Home";
import { logoutUser, logoutUserComplete } from "../actions/users_actions";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const { user } = this.props;
    if (user.status === "logout") {
      let request = axios.post("/app/logout");
      request
        .then((respond) => {
          this.props.logOutComplete();
          this.props.history.push("/login");
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { logOut, history } = this.props;
    return (
      <>
        <Home history={history} logOut={logOut} />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logoutUser()),
    logOutComplete: () => dispatch(logoutUserComplete()),
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
