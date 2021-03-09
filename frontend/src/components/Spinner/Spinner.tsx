import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import React from "react";
import Loader from "react-loader-spinner";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    spinner: {
      width: 100,
      margin: "0 auto",
      paddingTop: "30vh",
    },
  })
);

function Spinner() {
  const theme = useTheme();
  const classes = useStyle();

  console.log(theme.palette.primary);

  return (
    <div className={classes.root}>
      <Loader
        className={classes.spinner}
        color={theme.palette.primary.main}
        type="ThreeDots"
        height={100}
        width={100}
      />
    </div>
  );
}

export default Spinner;
