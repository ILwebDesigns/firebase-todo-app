var admin = require("firebase-admin");
var serviceAccount = require("../keys/admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todo-app-firebase-92d6e.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
