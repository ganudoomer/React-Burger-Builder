import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
	let inputElement = null;
	const inputClasses = [ classes.InputElement ];
	if (props.invaild && props.touch) {
		inputClasses.push(classes.Invaild);
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} />
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					onChange={props.changed}
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select onChange={props.changed} className={inputClasses.join(' ')} value={props.value}>
					{props.elementConfig.option.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					onChange={props.changed}
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
	}
	return (
		<div className={classes.Input}>
			<label className>{props.label}</label>
			{inputElement}
		</div>
	);
};
export default input;
