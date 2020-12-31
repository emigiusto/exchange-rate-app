import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50px',
        backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'
    },
    name: {
        margin: 'auto',
        fontSize: '.9rem',
        fontStyle: 'italic'
    }
  }));

function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <p className={classes.name}>Emiliano Giusto 2021 - Exchange Rate Website - Opeepl Test</p>
        </div>
    );
}

export default Footer;