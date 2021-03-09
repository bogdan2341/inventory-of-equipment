import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { MileagePerDay } from "../../services/api/mileage";
import { isDark } from "../../theme";

export interface TableMilageProps {
  data?: [MileagePerDay];
  className?: string;
  chooseDay: (d: MileagePerDay) => void;
}

const useStyle = makeStyles((theme) =>
  createStyles({
    row: {
      "&:hover": {
        backgroundColor: isDark
          ? theme.palette.grey[700]
          : theme.palette.grey[200],
        transition: ".3s ease-out",
      },
    },
  })
);

export function TableMilage(props: TableMilageProps) {
  const classes = useStyle();
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>День</TableCell>
            <TableCell>Пробег</TableCell>
            <TableCell>Дней после ремонта</TableCell>
            <TableCell>Ремонт</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data ? (
            props.data
              .sort((curr, next) => curr.day - next.day)
              .map((row) => (
                <TableRow
                  key={row.day}
                  className={classes.row}
                  onClick={() => {
                    console.log(row);
                    props.chooseDay(row);
                  }}
                >
                  <TableCell>{row.day}</TableCell>
                  <TableCell>{row.mileageToday}</TableCell>
                  <TableCell>{row.dayAfterService}</TableCell>
                  <TableCell>{row.typeOfService}</TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow></TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
