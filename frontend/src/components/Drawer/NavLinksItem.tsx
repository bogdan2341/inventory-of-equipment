import {
  hexToRgb,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import clsx from "clsx";
import { useLocation, useHistory } from "react-router-dom";
import { ReactNode } from "react";

export interface NavLinksItemProps {
  id?: string;
  path: string;
  text: string;
  icon: ReactNode;
}

export interface NavLinksItemPropsWithClose extends NavLinksItemProps {
  closeDrawer: () => void;
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    activeColor: {
      color: theme.palette.primary.main,
    },

    activeItem: {
      "&.MuiListItem-root.Mui-selected": {
        backgroundColor:
          hexToRgb(theme.palette.primary.main).slice(0, -1) + ", 0.10)",
      },
    },
  })
);

const NavLinksItem = (props: NavLinksItemPropsWithClose) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyle();

  const linkClickHandler = () => {
    history.push(props.path);
    props.closeDrawer();
  };

  const selected = props.path === location.pathname;

  return (
    <ListItem
      button
      selected={selected}
      className={clsx({
        [classes.activeItem]: selected,
      })}
      onClick={linkClickHandler}
    >
      <ListItemIcon
        className={clsx({
          [classes.activeColor]: selected,
        })}
      >
        {props.icon}
      </ListItemIcon>
      <ListItemText
        className={clsx({
          [classes.activeColor]: selected,
        })}
      >
        {props.text}
      </ListItemText>
    </ListItem>
  );
};

export default NavLinksItem;
