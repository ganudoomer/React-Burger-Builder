import React, { Component } from 'react';
import classes from './ContactDetails.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
class Contact extends Component {
	state = {
		name: '',
		email: '',

		address: {
			street: '',
			pincode: ''
		},
		loading: false
	};

	onClickHandle = (event) => {
		event.preventDefault(); //PREVENT FROM FROM LOADING
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			address: {
				country: 'India',
				pin: '2342323',
				street: 'TestMoney'
			},
			email: 'janu@gmail.com',
			deliveryMoethod: 'Hyperfast'
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

	render() {
		let form = (
			<form>
				<input className={classes.input} type="text" name="name" placeholder="Your name" />
				<input className={classes.input} type="text" name="email" placeholder="Your email" />
				<input className={classes.input} type="text" name="street" placeholder="Street" />
				<input className={classes.input} type="text" name="pincode" placeholder="Pincode" />
				<Button clicked={this.onClickHandle} btnType="Success">
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

export default Contact;
