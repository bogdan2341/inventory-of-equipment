import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  createStyles,
  makeStyles,
  Card,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { TrainsData, getAllTrains } from "../../services/api/trains";

export interface SelectTrainData {
  trainId: string;
  year: string;
  month: string;
}

export interface SelectTrainAndDateProps {
  onChange: (data: SelectTrainData) => void;
  onClickEdit: () => void;
  disableEditMileage: boolean;
  isEditable: boolean;
}

const useStyle = makeStyles((theme) =>
  createStyles({
    root: {
      padding: ".5em",
      display: "flex",
      alignItems: "center",
    },
    select: {
      minWidth: "5em",
    },
    formControl: {
      marginLeft: "1em",
      marginBottom: "1em",
    },
    editButton: {
      marginLeft: "1em",
    },
  })
);

export function SelectTrainAndDate(props: SelectTrainAndDateProps) {
  const [trains, setTrains] = useState<TrainsData[]>([]);
  const [selectData, setSelectData] = useState({
    trainId: "",
    year: "",
    month: "",
  });
  const classes = useStyle();

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const { name, value } = event.target;
    if (name) {
      setSelectData({
        ...selectData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    props.onChange(selectData);
  }, [selectData]);

  const fetchTrains = async () => {
    try {
      const trains = await getAllTrains();
      setTrains(trains);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  return (
    <Card className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="trainSelect-label">№ ДП</InputLabel>
        <Select
          className={classes.select}
          labelId="trainSelect-label"
          id="trainId"
          name="trainId"
          value={selectData.trainId}
          onChange={handleSelectChange}
        >
          <MenuItem value="">-</MenuItem>
          {trains.map((el) => (
            <MenuItem value={el._id} key={el._id}>
              {el.number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="yearSelect-label">Год</InputLabel>
        <Select
          className={classes.select}
          labelId="yearSelect-label"
          id="yearSelect"
          name="year"
          value={selectData.year}
          onChange={handleSelectChange}
        >
          <MenuItem value="">-</MenuItem>
          // TODO: [Select Year] Replace that array
          {[2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
            .reverse()
            .map((el) => (
              <MenuItem value={el} key={el}>
                {el}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="monthSelect-label">Месяц</InputLabel>
        <Select
          className={classes.select}
          labelId="monthSelect-label"
          id="monthSelect"
          name="month"
          value={selectData.month}
          onChange={handleSelectChange}
        >
          <MenuItem value="">-</MenuItem>
          {[...Array(12)].map((_, idx) => (
            <MenuItem value={idx + 1} key={idx + 1}>
              {idx + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className={classes.editButton}
        onClick={props.onClickEdit}
        variant="outlined"
        color="primary"
        disabled={props.disableEditMileage}
        startIcon={props.isEditable ? <EditIcon /> : <AddIcon />}
      >
        {props.isEditable ? "Редактировать" : "Создать"}
      </Button>
    </Card>
  );
}
