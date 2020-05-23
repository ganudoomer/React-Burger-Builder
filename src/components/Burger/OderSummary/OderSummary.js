import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const order = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
		return (
			<li key={igKey + 1}>
				<span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
			</li>
		);
	});
	return (
		<Aux>
			<h3>Your Order is Ready to Checkout</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>Continue to Checkout ?</p>
			<p>
				<strong>Total Price:₹{props.price.toFixed(2)}</strong>
			</p>
			<Button clicked={props.cancel} btnType="Danger">
				CANCEL
			</Button>
			<Button clicked={props.continue} btnType="Success">
				CONTINUE
			</Button>
		</Aux>
	);
};
export default order;
