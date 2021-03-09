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

export interface TrainDialogProps {
  open: boolean;
  onClose: () => void;
}

export function TrainDialog(props: TrainDialogProps) {
  const [fieldsData, setFieldsData] = useState<TrainsData>();
  return (
    <Dialog onClose={props.onClose} open={props.open} fullWidth>
      <DialogTitle>Добавить новый поезд</DialogTitle>
      <DialogContent>
        <TextField name="number" margin="dense" label="№ вагона" fullWidth />
      </DialogContent>
      <DialogContent>
        <TextField
          name="manufactureYear"
          margin="dense"
          label="Год"
          fullWidth
        />
      </DialogContent>
      <DialogContent>
        <TextField
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
      <DialogActions>
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
