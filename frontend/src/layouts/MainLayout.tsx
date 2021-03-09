import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "../components/Drawer/Drawer";
import AppBar from "../components/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingsDrawer from "../components/SettingsDrawer/SettingsDrawer";
import { AllTrainsPage } from "../pages/trains/AllTrainsPage";
import { MileagePage } from "../pages/mileage/MileagePage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export interface DashboardProps {
  // children: ReactNode;
  toggleDark: () => void;
}

export default function Dashboard(props: DashboardProps) {
  const classes = useStyles();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const toggleSettingsDrawer = () => {
    setSettingsOpen((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <AppBar
        title="Remont/Depo"
        openDrawer={() => setDrawerOpen(true)}
        openSettings={toggleSettingsDrawer}
      />
      <Drawer
        open={isDrawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      />
      <SettingsDrawer
        open={isSettingsOpen}
        toggleDrawer={toggleSettingsDrawer}
        toggleDark={props.toggleDark}
      />
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route exact path="/app">
            {"Hello"}
          </Route>
          <Route path="/app/trains" exact>
            <AllTrainsPage/>
          </Route>
          <Route path="/app/mileage">
            <MileagePage/>
          </Route>
          <Route path="/app/*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
