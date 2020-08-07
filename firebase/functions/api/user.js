var firebase = require("firebase/app");
var admin = require("firebase-admin");
var config = require("../secret/firebaseConfig.json");
require("firebase/auth");

firebase.initializeApp(config);

exports.logInUser = (request, response) => {
  const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let email = request.body.email ? request.body.email.trim() : "";
  let pass = request.body.password ? request.body.password.trim() : "";

  if (email === "" || !checkEmail.test(email)) {
    return response
      .status(400)
      .json({ error: "Email invalid, please try again" });
  }
  if (pass === "") {
    return response
      .status(400)
      .json({ error: "Password must not be empty, please try again" });
  }

  let user = {
    email: email,
    password: pass,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((idToken) => {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      return admin.auth().createSessionCookie(idToken, { expiresIn });
    })
    .then((sessionCookie) => {
      const expires = 60 * 60 * 24 * 5 * 1000;
      const options = { maxAge: expires, httpOnly: true, secure: true };
      response.cookie("__session", sessionCookie, options);
      return response.status(200).json({ status: "success" });
    })
    .catch((error) => {
      return response.status(403).json({ error: error.message });
    });
};

exports.logOutSession = (request, response) => {
  const sessionCookie = request.cookies.__session || "";
  response.clearCookie("__session");
  admin
    .auth()
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      admin.auth().revokeRefreshTokens(decodedClaims.sub);
      return response.status(200).json("success logout");
    })
    .catch((error) => {
      return response.status(500).json(error);
    });
};

/* function setCookie(idToken, res) {
   const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  }; 

  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then((sessionCookie) => {
      const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };
      return res.cookie("__session", sessionCookie, options);
       admin
        .auth()
        .verifyIdToken(idToken)
        .then(function (decodedClaims) {
          return res.status(200).json(decodedClaims.uid);
        })
        .catch((error) => {
          return res.status(401).json("UNAUTHORIZED REQUEST!", error);
        }); 
    })
    .catch((error) => {
      return res.status(401).json("UNAUTHORIZED REQUEST!", error);
    });
} */

/* exports.autoLogin = (request, response) => {
  const sessionCookie = request.cookies.__session || "";
  
  admin
    .auth()
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      
    })
    .then(() => {
      
    })
    .catch((error) => {
      return response.status(500).json(error);
    });
}; */
