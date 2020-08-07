import React from "react";
import { connect } from "react-redux";
import SignInForm from "../components/LogInForm";
import {
  signInUser,
  signInUserSuccess,
  signInUserFailure,
} from "../actions/users_actions";
//import firebase from "../fb";
import axios from "axios";

class LogInContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  // With react-persist
  /*  componentWillMount(){
    if(user.status === "authenticated"){
      alert('You are logged in');
      return this.props.history.push('/dashboard');
    }
  } */

  componentDidUpdate() {
    let userProps = this.props.user;
    if (userProps.status === "signin") {
      
      /* firebase
        .auth()
        .signInWithEmailAndPassword(userProps.auth.email, userProps.auth.password)
        .then((result) => {
          let idToken = result.user.getIdToken();
          return console.log(idToken);
        })
        .catch((error) => {
          console.log(error);
        });
 */
      // ==============================================================//

      const request = axios.post("/app/session", userProps.auth, {
        withCredentials: true,
      });
      request
        .then((result) => {
          let data = result.data;
          this.props.signInSuccess(data);
          this.props.history.push("/dashboard");
        })
        .catch((error) => {
          let err = error.response.data.error || "Undefined error at login proccess";
          this.props.withError(err);
        });
    }
  }

  render() {
    const { user } = this.props;
    return (
      <SignInForm
        loading={user.loading}
        signIn={this.props.signIn}
        errors={user.error}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (values) => {
      dispatch(signInUser(values));
    },
    withError: (values) => {
      dispatch(signInUserFailure(values));
    },
    signInSuccess: (values) => {
      dispatch(signInUserSuccess(values));
    },
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer);
