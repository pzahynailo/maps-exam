import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#f8f8f8',
    fontWeight: 500,
    fontSize: '20px',
    padding: '15px 0',
    textAlign: 'center'
  }
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      Examination
    </div>
  );
};
