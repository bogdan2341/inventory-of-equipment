import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { TrainsData } from "../../services/api/trains";
import { dateFormat } from "../../utils/date";

export interface TrainDialogProps {
  open: boolean;
  onClose: () => void;
}

export function TrainDialog(props: TrainDialogProps) {
  const [fieldsData, setFieldsData] = useState<TrainsData>({
    number: "",
    dateOfLastKR: new Date(Date.now()),
    manufactureYear: 0,
  });

  const changeFieldHandler = (cb: (data: any) => any) => (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    if (name)
      setFieldsData((prevProps) => ({ ...prevProps, [name]: cb(value) }));
  };

  return (
    <Dialog onClose={props.onClose} open={props.open} fullWidth>
      <DialogTitle>Добавить новый поезд</DialogTitle>
      <DialogContent>
        <TextField
          onChange={changeFieldHandler(String)}
          value={fieldsData.number}
          name="number"
          margin="dense"
          label="№ вагона"
          fullWidth
        />
      </DialogContent>
      <DialogContent>
        <TextField
          onChange={changeFieldHandler(Number)}
          value={fieldsData.manufactureYear}
          name="manufactureYear"
          margin="dense"
          label="Год"
          fullWidth
        />
      </DialogContent>
      <DialogContent>
        <TextField
          onChange={changeFieldHandler((d) => new Date(d))}
          value={dateFormat(fieldsData.dateOfLastKR, "yyyy-MM-DD")}
          name="dateOfLastKR"
          type="date"
          margin="dense"
          label="Дата последнего КР"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions onClick={() => console.log(fieldsData)}>
        <Button variant="contained" color="primary">
          Добавить
        </Button>
        <Button variant="outlined" color="primary">
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
}
