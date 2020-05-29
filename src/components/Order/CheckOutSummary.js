import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckOutSummary.module.css';
const checkoutsummary = (props) => {
	return (
		<div className={classes.CheckOutSummary}>
			<h1>Hope The Burger Tastes Good</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button clicked={props.cancelButtonHandler} btnType="Danger">
				Cancel
			</Button>
			<Button clicked={props.continueButtonHandler} btnType="Success">
				Continue
			</Button>
		</div>
	);
};

export default checkoutsummary;
