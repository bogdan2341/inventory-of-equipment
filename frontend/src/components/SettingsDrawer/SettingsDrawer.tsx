import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import MoonIcon from "@material-ui/icons/Brightness4Outlined";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export interface ConfigDrawerProps {
  toggleDrawer: () => void;
  toggleDark: () => void;
  open: boolean;
}

const settingsDrawerWidth = 300;

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: settingsDrawerWidth,
      flexShrink: 0,
    },
    paper: {
      width: settingsDrawerWidth,
    },
  })
);

const ConfigDrawer: React.FC<ConfigDrawerProps> = (props) => {
  const isDarkTheme = () => localStorage.getItem("themeType") === "dark";
  const classes = useStyle();

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={props.toggleDrawer}
      className={classes.root}
      classes={{
        paper: classes.paper,
      }}
    >
      <List subheader={<ListSubheader>Настройки</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <MoonIcon />
          </ListItemIcon>
          <ListItemText>Темная тема</ListItemText>
          <ListItemSecondaryAction>
            <Switch checked={isDarkTheme()} onChange={props.toggleDark} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default ConfigDrawer;
