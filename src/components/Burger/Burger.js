import React from 'react';
import classes from './Burger.module.css';
import Burgeringredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
	let transformedingredients = Object.keys(props.ingredients)
		.map((igKey) => {
			return [ ...Array(props.ingredients[igKey]) ].map((_, i) => {
				//Loop the values of the object
				return <Burgeringredient type={igKey} key={igKey + i} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);
	if (transformedingredients.length === 0) {
		transformedingredients = <p>Please Start Adding Ingredients</p>;
	}
	return (
		<div className={classes.Burger}>
			<Burgeringredient type="bread-top" />
			{transformedingredients}
			<Burgeringredient type="bread-bottom" />
		</div>
	);
};
export default burger;
