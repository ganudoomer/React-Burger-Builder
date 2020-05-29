import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/CheckOut';
import Orders from './containers/Orders/Orders';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Route path="/" exact component={BurgerBuilder} />
					<Route path="/checkout" component={CheckOut} />
					<Route path="/orders" component={Orders} />
				</Layout>
			</div>
		);
	}
}

export default App;
