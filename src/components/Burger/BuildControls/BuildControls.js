import React from 'react';
import classes from './BuildControls.module.css';
import Buildcontrol from './BuildControl/BuildControl';
const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];
const buildcontrols = (props) => (
	<div className={classes.BuildControls}>
		<p>
			Current Price: <strong>₹{props.price.toFixed(2)}</strong>
		</p>
		{controls.map((crl) => (
			<Buildcontrol
				key={crl.label}
				label={crl.label}
				added={() => props.addHandeler(crl.type)}
				removed={() => props.removeHandler(crl.type)}
				disable={props.disabled[crl.type]}
			/>
		))}
		<button onClick={props.purchaseOrder} disabled={!props.purchasable} className={classes.OrderButton}>
			{props.isAuth ? 'ORDER NOW!' : 'LOGIN TO ORDER'}
		</button>
	</div>
);
export default buildcontrols;
