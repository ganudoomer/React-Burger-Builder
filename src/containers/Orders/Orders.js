import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCretors from '../../store/actions/index';

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrder();
	}
	render() {
		let order = this.props.orders.map((order) => (
			<Order price={order.price} ingredients={order.ingredients} key={order.id} />
		));
		if (this.props.loading) {
			order = <Spinner />;
		}
		return <div>{order}</div>;
	}
}
const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrder: () => dispatch(actionCretors.fetchOrder())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders, axios));
