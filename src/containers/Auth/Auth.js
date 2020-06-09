import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
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
		},
		isSignUp: true
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
	};
	onSubmitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
	};
	authModHandler = () => {
		this.setState((prevState) => {
			return {
				isSignUp: !prevState.isSignUp
			};
		});
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
				<form onSubmit={this.onSubmitHandler}>
					{form}

					<Button btnType="Success">Submit</Button>
				</form>
				<Button clicked={this.authModHandler} btnType="Danger">
					{this.state.isSignUp ? 'SWITCH TO LOGIN' : 'SWITCH TO SIGNUP'}
				</Button>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignUp) => dispatch(action.auth(email, password, isSignUp))
	};
};

export default connect(null, mapDispatchToProps)(Auth);
