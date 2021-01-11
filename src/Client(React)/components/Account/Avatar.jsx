import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    
  },
}));

export default function ImageAvatars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="containerprofile-dice" className={classes.large} src={props.photo}/>
    </div>
  );
}
