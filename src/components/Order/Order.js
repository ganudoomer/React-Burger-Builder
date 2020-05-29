import React from 'react';
import classes from './Order.module.css';
const order = (props) => {
	let ingredients = [];
	for (let ingredientsName in props.ingredients) {
		ingredients.push({ name: ingredientsName, amount: props.ingredients[ingredientsName] });
	}
	const ingredientOutput = ingredients.map((ig) => {
		return (
			<span
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0px 8px',
					border: '2px solid #ccc',
					padding: '5px'
				}}
			>
				{ig.name}({ig.amount}){' '}
			</span>
		);
	});
	return (
		<div className={classes.Order}>
			<p>Ingredients:{ingredientOutput}</p>
			<p>
				Price:<strong>{props.price}₹</strong>
			</p>
		</div>
	);
};

export default order;
