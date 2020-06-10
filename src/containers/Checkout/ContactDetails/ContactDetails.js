import React, { Component } from 'react';
import classes from './ContactDetails.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withError from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../../store/actions/index';
import { updateObject, checkVaild } from '../../../shared/utility';
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
					required: true,
					isEmail: true
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
				value: 'fastest',
				validation: {},
				valid: true,
				touch: false
			}
		},
		loading: false,
		formIsvaild: false
	};

	onClickHandle = (event) => {
		event.preventDefault(); //PREVENT FROM FROM LOADING
		const formData = {};
		for (let formElement in this.state.orderform) {
			formData[formElement] = this.state.orderform[formElement].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.tpr,
			orderForm: formData,
			userId: this.props.userId
		};
		this.props.onOrderBurger(order, this.props.auth);
	};
	onChnageHandler = (event, formId) => {
		const updateElement = updateObject(this.state.orderform[formId], {
			value: event.target.value,
			valid: checkVaild(event.target.value, this.state.orderform[formId].validation),
			touch: true
		});
		const updateForm = updateObject(this.state.orderform, {
			[formId]: updateElement
		});

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
		if (this.props.loading) {
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
		ings: state.burgerBuilder.ingredients,
		tpr: state.burgerBuilder.totalprice,
		loading: state.order.loading,
		auth: state.auth.token,
		userId: state.auth.userId
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, auth) => dispatch(actionCreator.purchaseBurger(orderData, auth))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withError(Contact, axios));
