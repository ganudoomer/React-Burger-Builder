import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import * as actions from './store/actions/index';
import LogOut from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponents/asyncComponents';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/CheckOut');
});
const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
});
class App extends Component {
	componentDidMount() {
		this.props.tryLoginChecker();
	}
	render() {
		let route = (
			<Switch>
				<Route path="/authenticate" component={asyncAuth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
		if (this.props.isAuthenticated) {
			route = (
				<Switch>
					<Route path="/checkout" component={asyncCheckout} />
					<Route path="/authenticate" component={asyncAuth} />
					<Route path="/orders" component={asyncOrders} />
					<Route path="/logout" component={LogOut} />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			);
		}

		return (
			<div>
				<Layout>{route}</Layout>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		tryLoginChecker: () => dispatch(actions.authStateChecker())
	};
};
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
