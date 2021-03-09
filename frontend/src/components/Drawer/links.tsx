import Train from "@material-ui/icons/TrainOutlined";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import TodayIcon from "@material-ui/icons/TodayOutlined";
import ViewListIcon from "@material-ui/icons/ViewListOutlined";

import { NavLinksItemProps } from "./NavLinksItem";

const linksArray: NavLinksItemProps[] = [
  {
    text: "Главная",
    path: "/app",
    icon: <DashboardIcon />,
    id: "1",
  },
  {
    text: "Дизель-поезда",
    path: "/app/trains",
    icon: <Train />,
    id: "2",
  },
  {
    text: "Пробеги",
    path: "/app/mileage",
    icon: <TodayIcon />,
    id: "3",
  },
  {
    text: "Оборудывание",
    path: "/app/equipment",
    icon: <ViewListIcon />,
    id: "4",
  },
];

export default linksArray;
