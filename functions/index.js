//index.js

const functions = require("firebase-functions");
const app = require("express")();

const { getAllTodos, postOneTodo, deleteTodo, getOneTodo, editTodo } = require("./APIs/todos");
const { loginUser, signUpUser, uploadProfilePhoto, getUserDetail, updateUserDetails} = require("./APIs/users");
const auth = require('./util/auth');

app.get("/todos", auth, getAllTodos);
app.get('/todo/:todoId', auth, getOneTodo);
app.post("/todo", auth, postOneTodo);
app.put('/todo/:todoId',auth, editTodo);

app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);

app.post("/login", loginUser);
app.post("/signup", signUpUser);

app.delete("/todo/:todoId",  auth,deleteTodo);
exports.api = functions.https.onRequest(app);
