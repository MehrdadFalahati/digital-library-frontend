import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>کتابخانه</NavigationItem>
        {props.isAuthenticated && props.hasAdmin ? <NavigationItem link="/content">محتواها</NavigationItem> : null}
        {props.isAuthenticated && props.hasAdmin ? <NavigationItem link="/library">کتابخانه ها</NavigationItem> : null}
        {props.isAuthenticated && props.hasAdmin ? <NavigationItem link="/content-type">نوع محتوا</NavigationItem> : null}
        {props.isAuthenticated && props.hasAdmin ? <NavigationItem link="/attachment-type">نوع پيوست</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">ورود به سامانه</NavigationItem>
            : <NavigationItem link="/logout">خروج</NavigationItem>}
    </ul>
);

export default navigationItems;