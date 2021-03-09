import * as React from "react";
import {
  createStyles,
  makeStyles,
  Drawer as DrawerCore,
  SwipeableDrawer,
  Theme,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import linksArray from "./links";
import NavLinks from "./NavLinks";

const desktopDrawerWidth = 260;
const mobileDrawerWith = "70vw";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: desktopDrawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: desktopDrawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    mobileDrawer: {
      width: mobileDrawerWith,
      flexShrink: 0,
    },
    mobileDrawerPaper: {
      width: mobileDrawerWith,
    },
  })
);

export interface DrawerProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Drawer = (props: DrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyle();

  const DrawerContent = (
    <div className={classes.drawerContainer}>
      <NavLinks linksArray={linksArray} closeDrawer={props.onClose} />
    </div>
  );

  return (
    <>
      {!isMobile ? (
        <DrawerCore
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          {DrawerContent}
        </DrawerCore>
      ) : (
        <SwipeableDrawer
          className={classes.mobileDrawer}
          classes={{
            paper: classes.mobileDrawerPaper,
          }}
          anchor={"left"}
          swipeAreaWidth={50}
          open={props.open}
          onClose={props.onClose}
          onOpen={props.onOpen}
        >
          {DrawerContent}
        </SwipeableDrawer>
      )}
    </>
  );
};

export default Drawer;
