import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBarCore from "@material-ui/core/AppBar";
import { IconButton, useMediaQuery } from "@material-ui/core";
import MenuOpen from "@material-ui/icons/Menu";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToAppOutlined";
import { auth } from "../../services/auth/FirebaseAuth";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: "0 1px 10px 1px rgba(0,0,0,0.18)",
      flexGrow: 1,
    },
    openMenuIcon: {
      marginRight: 20,
      marginLeft: 0,
    },
    toolbar: {
      paddingLeft: 10,
    },
    title: {
      flexGrow: 1,
    },
    openConfig: {
      justifySelf: "flex-end",
    },
  })
);

export interface AppBarProps {
  title: String;
  openDrawer: () => void;
  openSettings: () => void;
}

const AppBar = (props: AppBarProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const classes = useStyle();

  return (
    <AppBarCore position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {isMobile && (
          <IconButton
            className={classes.openMenuIcon}
            onClick={props.openDrawer}
          >
            <MenuOpen />
          </IconButton>
        )}
        <Typography variant="h6" noWrap className={classes.title}>
          {props.title}
        </Typography>
        <IconButton
          className={classes.openConfig}
          onClick={async () => {
            try {
              await auth.signOut();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <ExitToAppIcon />
        </IconButton>
        <IconButton className={classes.openConfig} onClick={props.openSettings}>
          <SettingsOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBarCore>
  );
};

export default AppBar;
