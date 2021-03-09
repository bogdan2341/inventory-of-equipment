import { Button, Card, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { TrainDialog } from "../../components/Dialog/TrainDialog";
import Spinner from "../../components/Spinner/Spinner";
import { getAllTrains, TrainsData } from "../../services/api/trains";

const useStyle = makeStyles((theme) =>
  createStyles({
    card: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
  })
);

export function AllTrainsPage() {
  const classes = useStyle();

  const [trains, setTrains] = useState<TrainsData[]>([]);
  const [openTrainDialog, setOpenTrainDialog] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getAllTrains();
      setTrains(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const openTrainDialogHandler = () => {};

  return (
    <div>
      <Button onClick={() => setOpenTrainDialog(true)}>Добавить поезд</Button>

      <TrainDialog
        open={openTrainDialog}
        onClose={() => setOpenTrainDialog(false)}
      />

      {!trains ? (
        <Spinner />
      ) : (
        trains.map((el) => (
          <Card className={classes.card} key={el._id}>
            <Typography variant={"h4"}>{el.number}</Typography>
            <p>Hello</p>
          </Card>
        ))
      )}
    </div>
  );
}
