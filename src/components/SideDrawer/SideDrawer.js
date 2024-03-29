import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems';
import Aux from '../../hoc/Aux';
import DropBox from '../UI/DropBox/DropBox';
const sidedrawer = (props) => {
	let conditionClass = [ classes.SideDrawer, classes.Close ];
	if (props.show) {
		conditionClass = [ classes.SideDrawer, classes.Open ];
	}
	return (
		<Aux>
			<DropBox show={props.show} close={props.closeSide} />
			<div className={conditionClass.join(' ')} onClick={props.closeSide}>
				<div className={classes.Logo}>
					<Logo />
				</div>

				<nav>
					<NavItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</Aux>
	);
};

export default sidedrawer;
