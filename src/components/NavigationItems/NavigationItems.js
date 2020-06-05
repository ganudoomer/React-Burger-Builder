import React from 'react';
import classes from './NavigationItems.module.css';
import NavItem from './NavigationItem/NavigationItem';
const navItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavItem link="/" exact>
			Burger Builder
		</NavItem>
		<NavItem link="/orders">Orders</NavItem>
		<NavItem link="/authenticate">Authenticate</NavItem>
	</ul>
);
export default navItems;
