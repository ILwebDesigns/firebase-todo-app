var admin = require("firebase-admin");

const serviceAccount = require("../secret/admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://personal-todo-5abdc.firebaseio.com",
});

const db = admin.firestore();

module.exports = { db, admin };
