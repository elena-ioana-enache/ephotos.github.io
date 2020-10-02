import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Viwer</NavigationItem>
        <NavigationItem link="/upload">Uploader</NavigationItem>
        <NavigationItem link="/flickr">Filckr Search</NavigationItem>
    </ul>
);

export default navigationItems;