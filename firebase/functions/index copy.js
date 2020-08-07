/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
"use strict";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
//const cors = require("cors")({ origin: true });
const app = express();

/* const csrfMiddleware = csurf({
  cookie: true,
}); */

/* app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); */

//app.use(cors);
app.use(cookieParser());
//app.use(csrfMiddleware);

const {
  getAllTodos,
  getToDo,
  postTodo,
  editTodo,
  delTodo,
} = require("./api/todos.js");
const { logInUser, logOutSession } = require("./api/user");
const { authCookie } = require("./util/verifyCookie");

app.get("/app/alltodo", authCookie, getAllTodos);
app.get("/app/todo/:todoId", authCookie, getToDo);
app.post("/app/addtodo", authCookie, postTodo);
app.put("/app/modtodo/:todoId", authCookie, editTodo);
app.delete("/app/deltodo/:todoId", authCookie, delTodo);

app.post("/app/session", logInUser);
app.post("/app/logout", authCookie, logOutSession);

exports.app = functions.https.onRequest(app);
