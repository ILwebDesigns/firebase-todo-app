import React from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Todo from "./Todo";

const useStyles = makeStyles((theme) => ({
  modal: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  new: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(2, 1),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const TodoList = ({ todos, addTodo, delTodo }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      title: title,
      text: text,
    });
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addButton = (
    <Container className={classes.modal}>
      <Container>
        <h2>Nueva Tarea</h2>
        <Divider />
        <form
          className={classes.new}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="title"
            type="text"
            label="Titulo"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="text"
            type="text"
            label="Contenido"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={10}
            onChange={(e) => setText(e.target.value)}
          />
          <div>
            <Button
              className={classes.submit}
              type="submit"
              variant="contained"
              color="primary"
            >
              Agregar
            </Button>
            <Button
              onClick={handleClose}
              type="cancel"
              variant="contained"
              color="primary"
              type="button"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Container>
    </Container>
  );

  
    return (
      <>
        {todos && todos.map((task) => (
          <Todo key={task.id} task={task} delTodo={delTodo} />
        ))}
        <Modal open={open}>{addButton}</Modal>
        <Fab
          onClick={handleOpen}
          className={classes.fab}
          color="primary"
          aria-label="New"
        >
          <AddIcon />
        </Fab>
      </>
    );
  }

export default TodoList;
