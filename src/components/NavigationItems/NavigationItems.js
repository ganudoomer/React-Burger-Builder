import React from 'react';
import classes from './NavigationItems.module.css';
import NavItem from './NavigationItem/NavigationItem';
const navItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavItem link="/" active>
			Burger Builder
		</NavItem>
		<NavItem link="/">CheckOut</NavItem>
	</ul>
);
export default navItems;
