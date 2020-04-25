//index.js

const functions = require("firebase-functions");
const app = require("express")();

const { getAllTodos, postOneTodo, deleteTodo } = require("./APIs/todos");
const { loginUser, signUpUser } = require("./APIs/users");

app.get("/todos", getAllTodos);
app.post("/todo", postOneTodo);
app.post("/login", loginUser);
app.delete("/todo/:todoId", deleteTodo);
app.post("/signup", signUpUser);
exports.api = functions.https.onRequest(app);
