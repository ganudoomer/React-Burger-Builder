import React, { Component } from 'react';
import classes from './ContactDetails.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
class Contact extends Component {
	state = {
		orderform: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touch: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touch: false
			},
			pin: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Pincode'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touch: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touch: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touch: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					option: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: '',
				validation: {},
				valid: true,
				touch: false
			}
		},
		loading: false,
		formIsvaild: false
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
		return isVaild;
	}
	onClickHandle = (event) => {
		event.preventDefault(); //PREVENT FROM FROM LOADING
		this.setState({ loading: true });
		const formData = {};
		for (let formElement in this.state.orderform) {
			formData[formElement] = this.state.orderform[formElement].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.tpr,
			orderForm: formData
		};
		axios
			.post('/order.json', order)
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((error) => {
				this.setState({ loading: false });
			});
	};
	onChnageHandler = (event, formId) => {
		const updateForm = {
			...this.state.orderform
		};
		const updateElement = { ...updateForm[formId] };
		updateElement.value = event.target.value;
		updateElement.valid = this.checkVaild(updateElement.value, updateElement.validation);
		updateElement.touch = true;
		updateForm[formId] = updateElement;
		let formIsvaild = true;
		for (let identifer in updateForm) {
			formIsvaild = updateForm[identifer].valid && formIsvaild;
		}
		this.setState({ orderform: updateForm, formIsvaild: formIsvaild });
	};

	render() {
		let fromInformationArray = [];
		for (let key in this.state.orderform) {
			fromInformationArray.push({
				id: key,
				config: this.state.orderform[key]
			});
		}

		let form = (
			<form onSubmit={this.onClickHandle}>
				{fromInformationArray.map((form) => (
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
				))}

				<Button disabled={!this.state.formIsvaild} btnType="Success">
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactDetails}>
				<h4>Enter Your Details Here</h4>
				{form}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		tpr: state.totalprice
	};
};

export default connect(mapStateToProps)(Contact);
