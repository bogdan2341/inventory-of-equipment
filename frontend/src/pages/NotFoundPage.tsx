import { Button, createStyles, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";


const useStyle = makeStyles((theme) =>
  createStyles({
    root:{
      marginTop: '25vh',
      textAlign: 'center'
    },
    main:{
      fontWeight: 'bold',
      color: theme.palette.primary.main
    },
    button:{
      marginTop: '2rem'
    }
  })
);

export function NotFoundPage() {
  const history = useHistory();
  const classes = useStyle();
  return(
    <div className={classes.root}>
      <Typography className={classes.main} variant="h1">404</Typography>
      <Typography variant="h4">Страница не найдена.</Typography>
      <Button
        className={classes.button} 
        variant="outlined" 
        color="primary" 
        onClick={()=> history.push('/')}>
          На главную
      </Button>
    </div>
  )
}