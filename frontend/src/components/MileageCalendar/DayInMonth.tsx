import { makeStyles, createStyles, Paper, Card } from "@material-ui/core";
import { isDark } from "../../theme";

export interface DayInMonthProps {
  day: number;
  mileage?: number;
  dayAfterService?: number;
  serviceType?: "ТО-3" | "ТР-1" | "ТР-3" | "";
}

const useStyle = makeStyles((theme) =>
  createStyles({
    dayInMonth: {
      position: "relative",
      width: "5em",
      height: "5em",
      padding: "0.1rem",
      margin: "0.1rem",
      borderRadius: "0.5rem",
      overflow: "hidden",
      transition: "0.3s ease-in",
      textAlign: "center",
      display: "inline-block",
      "&:after": {
        position: "absolute",
        content: `""`,
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 1,
      },
      "& > *": {
        zIndex: 100,
        position: "relative",
      },
    },
    day: {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    to3: {
      "&:after": {
        background: `linear-gradient(
          to bottom left,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0) calc(50% - 0.8px),
          rgba(0, 0, 0, 0) 50%,
          rgba(255, 70, 70, 0.2) calc(50% + 0.8px),
          rgba(255, 70, 70, 1) 100%
        )`,
      },
    },
    none: {
      "&:after": {
        background: `radial-gradient(
        circle,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 35%,
        rgba(255, 70, 70, 0.2) 35%,
        rgba(255, 70, 70, 0.2) 55%,
        rgba(255, 70, 70, 0) 60%
      )`,
        borderRadius: "100%",
      },
    },
    tr1: {
      "&:after": {
        background: `linear-gradient(
          to bottom left,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0) calc(50% - 0.8px),
          rgba(0, 0, 0, 0) 50%,
          rgba(70, 70, 255, 0.2) calc(50% + 0.8px),
          rgba(70, 70, 255, 1) 100%
        )`,
      },
    },
    tr3: {
      "&:after": {
        background: `linear-gradient(
          to bottom left,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0) calc(50% - 0.8px),
          rgba(0, 0, 0, 0) 50%,
          rgba(70, 70, 255, 0.2) calc(50% + 0.8px),
          rgba(70, 70, 255, 1) 100%
        )`,
      },
    },
  })
);

export function DayInMonth(props: DayInMonthProps) {
  const classes = useStyle();
  const rootClass = [classes.dayInMonth];
  if (!props.mileage && !props.serviceType) {
    rootClass.push(classes.none);
  }

  switch (props.serviceType) {
    case "ТО-3":
      rootClass.push(classes.to3);
      break;
    case "ТР-1":
      rootClass.push(classes.tr1);
      break;
    case "ТР-3":
      rootClass.push(classes.tr3);
      break;
  }

  return (
    <Paper className={rootClass.join(" ")} elevation={0}>
      <div>{props.dayAfterService || "-"}</div>
      <div className={classes.day}>{props.day}</div>
      <div>{props.mileage || "-"}</div>
    </Paper>
  );
}
