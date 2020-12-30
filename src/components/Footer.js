import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50px',
        fontSize: '1rem',
        fontFamily: 'Roboto'
    },
  }));

function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            Emiliano Giusto 2021 - Opeepl Test
        </div>
    );
}

export default Footer;