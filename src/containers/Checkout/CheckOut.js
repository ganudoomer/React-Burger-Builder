import React, { Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary';
import ConatctDetails from '../Checkout/ContactDetails/ContactDetails';
import { Route } from 'react-router';
class checkout extends Component {
	state = {
		ingredients: null,
		totalPrice: 0
	};
	//EXTRACTING FROM PARAMS
	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = null;
		for (let params of query.entries()) {
			if (params[0] === 'price') {
				price = params[1];
			} else {
				ingredients[params[0]] = +[ params[1] ];
			}
		}
		this.setState({
			ingredients: ingredients,
			totalPrice: price
		});
	}
	cancelButtonHandler = () => {
		this.props.history.goBack();
	};
	continueButtonHandler = () => {
		this.props.history.replace('/checkout/contact-details');
	};
	render() {
		return (
			<div>
				<CheckOutSummary
					continueButtonHandler={this.continueButtonHandler}
					cancelButtonHandler={this.cancelButtonHandler}
					ingredients={this.state.ingredients}
				/>
				<Route
					path={this.props.match.path + '/contact-details'}
					render={(props) => (
						<ConatctDetails ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />
					)}
				/>
			</div>
		);
	}
}

export default checkout;
