import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

async function validateSession() {
  let checkAuth = {
    status: false,
    msg: "",
    data: {},
  };

  let request = axios.post(`/verification`);

  var result = request
    .then((result) => {
      checkAuth.status = true;
      checkAuth.msg = "Session validada";
      checkAuth.data = { ...result.data };
      return checkAuth;
    })
    .catch((error) => {
      checkAuth.status = false;
      checkAuth.msg = "Session no validada";
      checkAuth.data = { ...error };
      return checkAuth;
    });

    return await result;
}

export default validateSession;
