var { db } = require("../util/admin");

const todo = db.collection("todo");

exports.getAllTodos = (request, response) => {
  todo
    .get()
    .then((doc) => {
      let todos = [];
      doc.forEach((ele) => {
        todos.push({
          id: ele.id,
          title: ele.data().title,
          text: ele.data().text,
          createdAt: ele.data().createdAt,
        });
      });
      return response.status(200).json(todos);
    })
    .catch((err) => {
      return console.log("Error getting all todo documents", err);
    });
};

exports.getToDo = (request, response) => {
  let docRef = todo.doc(request.params.todoId);
  docRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json("ERROR: Document not found.");
      }
      return response.json([doc.data()]);
    })
    .catch((err) => {
      console.log("Error getting documents", err);
      return response.status(500).json(err);
    });
};

exports.postTodo = (request, response) => {
  if (request.body.title.trim() === "") {
    let error = `Title cannot be empty`;
    return response.status(500).json(error);
  }
  if (request.body.text.trim() === "") {
    let error = `Text cannot be empty`;
    return response.status(500).json(error);
  }

  const newTodo = {
    title: request.body.title,
    text: request.body.text,
    createdAt: new Date().toISOString(),
  };

  db.collection("todo")
    .add(newTodo)
    .then((doc) => {
      const newData = newTodo;
      newData.id = doc.id;
      return response.status(200).json(newData);
    })
    .catch((err) => {
      console.log(err);
      return response
        .status(500)
        .json("Server error. Document not created", err);
    });
};

exports.editTodo = (request, response) => {
  if (request.params.todoId && request.body) {
    console.log(request.params.todoId, request.body);
    let raw = request.body;
    let docRef = todo.doc(request.params.todoId);

    docRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return response.status(404).json("Document not found");
        }
        return docRef
          .update(raw)
          .then(() => {
            return response.json("Document updated");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    return response.status(400).json("todoId and todoBody are required");
  }
};

exports.delTodo = (request, response) => {
  docRef = todo.doc(request.params.todoId);

  docRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json("Document not found");
      }
      return docRef
        .delete()
        .then(() => {
          return response.status(200).json("Document deleted");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => response.status(500).json("Server error", err));
};
