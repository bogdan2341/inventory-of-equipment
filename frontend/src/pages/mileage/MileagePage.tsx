import { Card } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import { EditMileage } from "../../components/EditMileage/EditMileage";
import { MonthMileage } from "../../components/MileageCalendar/MonthMileage";
import {
  SelectTrainAndDate,
  SelectTrainData,
} from "../../components/MileageCalendar/SelectTrainAndDate";
import {
  getMileagePerMonth,
  MileagePerMonth,
} from "../../services/api/mileage";

export function MileagePage() {
  const match = useRouteMatch();
  const history = useHistory();
  const [mileagePerMonth, setMileagePerMonth] = useState<MileagePerMonth>();
  const [isMileageExist, setIsMileageExist] = useState(false);
  const [isEditableMileage, setIsEditableMileage] = useState(true);
  const [data, setData] = useState<SelectTrainData>({
    trainId: "",
    year: "",
    month: "",
  });

  const onClickEditHandler = ({ trainId, year, month }: SelectTrainData) => {
    history.push(`${match.path}/edit/${trainId}/${year}/${month}`);
  };

  const fetchMileagePerMonth = async (
    trainId: string,
    year: string,
    month: string
  ) => {
    try {
      await getMileagePerMonth(trainId, year, month, (mileage) =>
        setMileagePerMonth(mileage)
      );
      setIsMileageExist(true);
    } catch (error) {
      console.log(error);
      if (error.code === 1) {
        setIsMileageExist(false);
      }
    }
  };

  useEffect(() => {
    const { trainId, year, month } = data;
    if (trainId && year && month) {
      fetchMileagePerMonth(trainId, year, month);
      setIsEditableMileage(false);
    } else {
      setIsEditableMileage(true);
      setIsMileageExist(true);
    }
  }, [data]);

  return (
    <>
      <Switch>
        <Route path={`${match.path}/edit/:trainId/:year/:month`}>
          <EditMileage />
        </Route>
        <Route path={`/`}>
          <SelectTrainAndDate
            onChange={setData}
            disableEditMileage={isEditableMileage}
            onClickEdit={() => onClickEditHandler(data)}
            isEditable={isMileageExist}
          />
          <br></br>
          {mileagePerMonth ? (
            <MonthMileage
              mileage={mileagePerMonth}
              isMileageExist={isMileageExist}
            ></MonthMileage>
          ) : (
            <Card>Error</Card>
          )}
        </Route>
      </Switch>
    </>
  );
}
