import React from 'react';
import classes from './NavigationItems.module.css';
import NavItem from './NavigationItem/NavigationItem';
const navItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavItem link="/" exact>
			Burger Builder
		</NavItem>
		{props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null}

		{props.isAuthenticated ? (
			<NavItem link="/logout">Logout</NavItem>
		) : (
			<NavItem link="/authenticate">Authenticate</NavItem>
		)}
	</ul>
);
export default navItems;
