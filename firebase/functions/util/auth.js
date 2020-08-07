var admin = require("firebase-admin");

exports.validateSession = (req, res, next) => {
  
  let token = req.headers.authorization;

  if (token) {
    token = token.split("Bearer ")[1].trim();

    admin
      .auth()
      .verifyIdToken(token)
      .then(function (decodedToken) {
        let uid = decodedToken.uid;
        return next();
      })
      .catch(function (error) {
        return res.status(401).json("Unauthorized request");
      });
  } else {
    return res.status(401).json("Unauthorized request");
  }
};
