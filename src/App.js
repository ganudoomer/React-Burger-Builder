import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/CheckOut';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';
import LogOut from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';

class App extends Component {
	componentDidMount() {
		this.props.tryLoginChecker();
	}
	render() {
		let route = (
			<Switch>
				<Route path="/authenticate" component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
		if (this.props.isAuthenticated) {
			route = (
				<Switch>
					<Route path="/checkout" component={CheckOut} />
					<Route path="/orders" component={Orders} />
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
