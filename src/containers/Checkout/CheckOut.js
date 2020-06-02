import React, { Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary';
import ConatctDetails from '../Checkout/ContactDetails/ContactDetails';
import { Route } from 'react-router';
import { connect } from 'react-redux';
class checkout extends Component {
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
					ingredients={this.props.ings}
				/>
				<Route path={this.props.match.path + '/contact-details'} component={ConatctDetails} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients
	};
};

export default connect(mapStateToProps)(checkout);
