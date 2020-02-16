import React from 'react';

import libraryLogo from '../../assets/images/pngguru.com.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={libraryLogo} alt="DigitalLibrary" />
    </div>
);

export default logo;