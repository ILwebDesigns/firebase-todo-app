import React from "react";
import TodoList from "../components/TodoList";
import { connect } from "react-redux";
import axios from "axios";

import {
  addTodo,
  addTodoSuccess,
  addTodoFailure,
  getAllTodos,
  delTodoSuccess,
  delTodoFailure,
  delTodo,
} from "../actions/todos_actions";

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllTodos();
    const request = axios.get("/app/alltodo");
    request
      .then((result) => {
        this.props.addSuccess(result.data);
      })
      .catch((error) => {
        this.props.addFail(error.response.data);
        this.props.history.push("/login");
      });
  }

  componentDidUpdate() {
    let todo = this.props.todo;
    if (todo.status === "adding") {
      const request = axios.post(`/app/addtodo`, todo.new);
      request
        .then((result) => {
          let data = [...todo.todos, result.data];
          this.props.addSuccess(data);
        })
        .catch((error) => {
          let err =
            error.response.data.error || "Undefined error adding a new To Do";
          this.props.addFail(err);
        });
    }
    if (todo.status === "deltodo") {
      const request = axios.delete(`/app/deltodo/${todo.new}`);
      request
        .then(() => {
          let newTodos = todo.todos.filter((ele) => ele.id !== todo.new);
          this.props.delTodoSuccess(newTodos);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  render() {
    const props = this.props;
    return (
      <TodoList
        todos={props.todo.todos}
        addTodo={props.addingTodo}
        delTodo={props.delTodo}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTodos: () => dispatch(getAllTodos()),
    addingTodo: (form) => dispatch(addTodo(form)),
    addSuccess: (todos) => dispatch(addTodoSuccess(todos)),
    addFail: (error) => dispatch(addTodoFailure(error)),
    delTodo: (todoId) => dispatch(delTodo(todoId)),
    delTodoSuccess: (todos) => dispatch(delTodoSuccess(todos)),
    delTodoFailure: (error) => dispatch(delTodoFailure(error)),
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    todo: state.todo,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
