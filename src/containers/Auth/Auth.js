import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail-Id'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touch: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'password'
				},
				value: '',
				validation: {
					required: true,
					minLength: '6'
				},
				valid: false,
				touch: false
			}
		}
	};

	checkVaild(value, rules) {
		if (!rules) {
			return true;
		}
		let isVaild = true;
		if (rules.required) {
			isVaild = value.trim() !== '' && isVaild;
		}
		if (rules.minLength) {
			isVaild = value.length >= rules.minLength && isVaild;
		}
		if (rules.maxLength) {
			isVaild = value.length <= rules.maxLength && isVaild;
		}
		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isVaild = pattern.test(value) && isVaild;
		}
		return isVaild;
	}
	onChnageHandler = (event, controlName) => {
		const updatedControl = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkVaild(event.target.value, this.state.controls[controlName].validation),
				touch: true
			}
		};
		this.setState({ controls: updatedControl });
		const valur = this.state.controls[controlName].value;
		console.log(valur);
	};
	render() {
		let fromInformationArray = [];
		for (let key in this.state.controls) {
			fromInformationArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		const form = fromInformationArray.map((form) => (
			<Input
				key={form.id}
				elementConfig={form.config.elementConfig}
				elementType={form.config.elementType}
				value={form.config.value}
				invaild={!form.config.valid}
				touch={form.config.touch}
				changed={(event) => this.onChnageHandler(event, form.id)}
				disabled={!this.state.formIsvaild}
			/>
		));

		return (
			<div className={classes.Auth}>
				<form>{form}</form>
				<Button btnType="Success">Submit</Button>
			</div>
		);
	}
}

export default Auth;
