import { Card, createStyles, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMileagePerMonth,
  MileagePerDay,
  MileagePerMonth,
  saveMileagePerDay,
} from "../../services/api/mileage";
import { getTrainNumberById } from "../../services/api/trains";
import axiosInstance from "../../utils/axios";
import { getMonthAsString } from "../../utils/date";
import { EditMilageForm } from "./EditMilageForm";
import { TableMilage } from "./TableMilage";

export interface EditMileageProps {}

interface EditMileageUrlParams {
  trainId: string;
  year: string;
  month: string;
}

const useStyle = makeStyles((theme) =>
  createStyles({
    summaryCard: {
      paddingLeft: "1em",
      marginTop: "1em",
      "& > p": {},
    },
  })
);

export function EditMileage(props: EditMileageProps) {
  const { trainId, year, month } = useParams<EditMileageUrlParams>();
  const [mileagePerMonth, setMileagePerMonth] = useState<MileagePerMonth>();
  const [trainNumber, setTrainNumber] = useState("");
  const [dataPerDay, setDataPerDay] = useState<MileagePerDay>({
    day: 0,
    dayAfterService: 0,
    typeOfService: "",
    mileageToday: 0,
  });

  const classes = useStyle();

  const saveMileagePerDayHandler = (
    trainId: string,
    year: string,
    month: string
  ) => async (data: MileagePerDay) => {
    try {
      if (data.day && data.mileageToday) {
        await saveMileagePerDay(trainId, year, month, data);
        getMileagePerMonth(trainId, year, month, (month) =>
          setMileagePerMonth(month)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrainNumberById(trainId, setTrainNumber);
    getMileagePerMonth(trainId, year, month, setMileagePerMonth);
  }, []);

  return (
    <>
      <h2>
        №:{trainNumber} за {getMonthAsString(month)} {year} года.
      </h2>
      <EditMilageForm
        monthData={mileagePerMonth?.days}
        dataPerDay={dataPerDay}
        setDataPerDay={setDataPerDay}
        onSave={saveMileagePerDayHandler(trainId, year, month)}
      />

      <TableMilage data={mileagePerMonth?.days} chooseDay={setDataPerDay} />
      <Card className={classes.summaryCard}>
        <p>Всего дней: {mileagePerMonth?.days.length}</p>
        <p>Пробег за месяц: {mileagePerMonth?.mileagePerMonth}</p>
      </Card>
    </>
  );
}
