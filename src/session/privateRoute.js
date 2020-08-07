import React from "react";
import {Route, Redirect} from 'react-router-dom';
import validateSession from "./validateSession";


function PrivateRoute({ component: Component, user, ...rest }){
  
  return (
    <Route
      {...rest}
      render={(props) =>
         user.status === 'authenticated' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
