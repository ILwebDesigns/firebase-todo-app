import React from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loading: {
    position: "relative",
    width: "40px",
    height: "40px",
    top: "30vh",
  },
  wrapper: {
    backgroundColor: "white",
    zIndex: theme.zIndex.drawer + 2,
    position: "absolute",
    textAlign: "center",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}));

const Spinner = ({ todo, user }) => {
  const classes = useStyles();

  if (todo.loading || user.loading) {
    return (
      <div className={classes.wrapper}>
        <CircularProgress size={120} className={classes.loading} />
      </div>
    );
  }
  return null;
};

const mapStateToProps = ({ progress, todo, user }) => ({
  progress,
  todo,
  user,
});

export default connect(mapStateToProps, null)(Spinner);
