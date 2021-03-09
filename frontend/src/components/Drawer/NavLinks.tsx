import { List } from "@material-ui/core";
import NavLinksItem, { NavLinksItemProps } from "./NavLinksItem";

export interface NavLinksProps {
  linksArray: NavLinksItemProps[];
  closeDrawer: () => void;
}

const NavLinks = (props: NavLinksProps) => {
  return (
    <List>
      {props.linksArray.map((item) => (
        <NavLinksItem
          key={item.id}
          text={item.text}
          icon={item.icon}
          path={item.path}
          closeDrawer={props.closeDrawer}
        />
      ))}
    </List>
  );
};

export default NavLinks;
