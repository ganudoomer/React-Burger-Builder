import React from 'react';
import classes from './DropBox.module.css';

const dropbox = (props) => (props.show ? <div onClick={props.close} className={classes.DropBox} /> : null);

export default dropbox;
