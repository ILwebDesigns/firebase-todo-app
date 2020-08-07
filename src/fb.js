import firebase from "firebase/app";
import "firebase/auth";

const config = {
  /*
  FIREBASE CONFIG
  */
};

firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export default firebase;
