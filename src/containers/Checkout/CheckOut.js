import React, { Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary';
import ConatctDetails from '../Checkout/ContactDetails/ContactDetails';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
class checkout extends Component {
	cancelButtonHandler = () => {
		this.props.history.goBack();
	};
	continueButtonHandler = () => {
		this.props.history.replace('/checkout/contact-details');
	};
	render() {
		let summary = <Redirect to="/" />;
		if (this.props.ings) {
			const purchasedRe = this.props.purchased ? <Redirect to="/" /> : null;
			summary = (
				<div>
					{purchasedRe}
					<CheckOutSummary
						continueButtonHandler={this.continueButtonHandler}
						cancelButtonHandler={this.cancelButtonHandler}
						ingredients={this.props.ings}
					/>
					<Route path={this.props.match.path + '/contact-details'} component={ConatctDetails} />
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
};

export default connect(mapStateToProps)(checkout);
