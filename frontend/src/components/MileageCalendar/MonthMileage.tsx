import { Card, createStyles, makeStyles, Paper } from "@material-ui/core";
import { useState } from "react";
import { MileagePerDay, MileagePerMonth } from "../../services/api/mileage";
import { getMonthByWeeks } from "../../utils/date";
import { DayInMonth } from "./DayInMonth";

export interface MonthMileageProps {
  mileage: MileagePerMonth;
  isMileageExist: boolean;
}

const useStyle = makeStyles((theme) =>
  createStyles({
    card: {
      color: "#ccc",
      height: "5rem",
      textAlign: "center",
    },
    empty: {
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
    },
    week: {
      display: "flex",
      flexWrap: "nowrap",
    },
    weekNames: {
      "& > *": {
        width: "5em",
        padding: "0.1rem",
        margin: "0.1rem",
        borderRadius: "0.5rem",
        overflow: "hidden",
        transition: "0.3s ease-in",
        textAlign: "center",
        fontWeight: "bold",
      },
    },
  })
);

export function MonthMileage(props: MonthMileageProps) {
  const classes = useStyle();
  const { year, month, days } = props.mileage;

  const calendar = (
    <>
      <div className={`${classes.week} ${classes.weekNames}`}>
        <Paper elevation={0}>Пн</Paper>
        <Paper elevation={0}>Вт</Paper>
        <Paper elevation={0}>Ср</Paper>
        <Paper elevation={0}>Чт</Paper>
        <Paper elevation={0}>Пт</Paper>
        <Paper elevation={0}>Сб</Paper>
        <Paper elevation={0}>Нд</Paper>
      </div>
      {getMonthByWeeks(year, month).map((week, wIdx) => (
        <div className={classes.week} key={wIdx}>
          {week.map((day, dIdx) => {
            const dayData = days.find((d) => d.day === day);
            if (!day) {
              return (
                <Paper
                  key={"" + wIdx + dIdx}
                  elevation={0}
                  className={classes.empty}
                ></Paper>
              );
            }
            if (dayData) {
              return (
                <DayInMonth
                  key={"" + wIdx + dIdx}
                  day={dayData.day}
                  dayAfterService={dayData.dayAfterService}
                  mileage={dayData.mileageToday}
                  serviceType={dayData.typeOfService}
                />
              );
            } else {
              return <DayInMonth key={"" + wIdx + dIdx} day={day} />;
            }
          })}
        </div>
      ))}
    </>
  );

  return (
    <>
      {props.isMileageExist ? (
        calendar
      ) : (
        <Card className={classes.card}>
          Еще не созданны пробеги за этот месяц
        </Card>
      )}
    </>
  );
}
