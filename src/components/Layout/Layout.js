import Aux from '../../hoc/Aux';
import React from 'react';
import classes from '../../components/Layout/Layout.module.css';
const layout = (props) => (
	<Aux>
		<div>Toolbar,Backdrop,SideDrawer</div>
		<main className={classes.Content}>{props.children}</main>
	</Aux>
);

export default layout;
