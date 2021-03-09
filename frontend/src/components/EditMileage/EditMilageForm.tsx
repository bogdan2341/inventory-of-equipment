import {
  Card,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MileagePerDay, MileagePerMonth } from "../../services/api/mileage";

export interface EditMilageFormProps {
  monthData?: [MileagePerDay];
  onSave: (data: MileagePerDay) => void;
  dataPerDay: MileagePerDay;
  setDataPerDay: (d: MileagePerDay) => void;
}

const useStyle = makeStyles((theme) =>
  createStyles({
    form: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    controller: {
      marginBottom: "1em",
    },
  })
);

export function EditMilageForm(props: EditMilageFormProps) {
  const [isEditable, setIsEditable] = useState(false);

  const searchDayInMonth = (day: string): void => {
    const currDay = props.monthData?.find((el) => el.day === parseInt(day));
    if (currDay) {
      props.setDataPerDay(currDay);
      setIsEditable(true);
    } else {
      props.setDataPerDay({
        day: parseInt(day),
        dayAfterService: 0,
        typeOfService: "",
        mileageToday: 0,
      });
      setIsEditable(false);
    }
  };

  const inputChangeHandler = (callback: (a: any) => any) => (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    if (name === "day") {
      return searchDayInMonth(value as string);
    }
    if (name)
      props.setDataPerDay({ ...props.dataPerDay, [name]: callback(value) });
  };

  const classes = useStyle();
  return (
    <>
      <Card className={classes.controller}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="day"
            label="День"
            variant="standard"
            name="day"
            type="number"
            value={props.dataPerDay.day || ""}
            onChange={inputChangeHandler(Number)}
          />
          <TextField
            id="mileage"
            label="Пробег"
            type="number"
            variant="standard"
            name="mileageToday"
            value={props.dataPerDay.mileageToday || ""}
            onChange={inputChangeHandler(Number)}
          />
          <TextField
            id="dayAfterService"
            label="Дней после ремонта"
            type="number"
            variant="standard"
            name="dayAfterService"
            value={props.dataPerDay.dayAfterService || ""}
            onChange={inputChangeHandler(Number)}
          />
          <FormControl>
            <InputLabel id="serviceType-label">Тип ремонта</InputLabel>
            <Select
              value={props.dataPerDay.typeOfService}
              labelId="serviceType-label"
              id="serviceType"
              name="typeOfService"
              onChange={inputChangeHandler(String)}
            >
              <MenuItem value={""}>-</MenuItem>
              <MenuItem value={"ТО-3"}>ТО-3</MenuItem>
              <MenuItem value={"ТР-1"}>ТР-1</MenuItem>
              <MenuItem value={"ТР-3"}>ТР-3</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => props.onSave(props.dataPerDay)}
          >
            {isEditable ? "Редактировать" : "Добавить"}
          </Button>
        </form>
      </Card>
    </>
  );
}
