import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const styles = makeStyles((theme) => ({
  task: {
    margin: theme.spacing(2),
    maxWidth: "30%",
  },
}));

const Todo = ({ delTodo, task }) => {
  const classes = styles();
  
  const handleDelete = () => {    
     delTodo(task.id);
  };

  return (
    <Card elevation={2} className={classes.task}>
      <CardContent>
        <Typography
          component="h2"
          variant="h5"
          color="textSecondary"
          gutterBottom
        >
          {task.title}
        </Typography>
        <Typography variant="body2" component="p">
          {task.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Open</Button>
        <Button size="small">Archive</Button>
        <Button size="small" onClick={()=>handleDelete()}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Todo;
