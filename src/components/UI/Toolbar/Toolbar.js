import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../../NavigationItems/NavigationItems';
import DrawToggle from '../../SideDrawer/DrawToggle/DrawToggle';
const classesPro = [ classes.Logo, classes.DesktopOnly ];
const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawToggle clicked={props.showHandler} />
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavItems />
		</nav>
	</header>
);

export default toolbar;
