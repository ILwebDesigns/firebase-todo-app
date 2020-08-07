import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Avatar, Link } from "@material-ui/core";
import { Link as RLink } from "react-router-dom";
import TodoContainer from "../containers/TodoContainer";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#bbdefb",
    minHeight: "100vh",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  task: {
    margin: theme.spacing(2),
    maxWidth: "30%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    margin: theme.spacing(3),
    width: "4rem",
    height: "4rem",
  }
}));

export default function Home({ history, logOut }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Personal Tasks            
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <center>
          <Avatar className={classes.avatar}>N</Avatar>
        </center>
        <div className={classes.drawerContainer}>
          <Divider />
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Tareas" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Cuenta" />
            </ListItem>
            <ListItem button onClick={ logOut } >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Session" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.main}>
        <Toolbar />
        <div className={classes.content}>
          <TodoContainer history={history} />
        </div>
      </main>
    </div>
  );
}
