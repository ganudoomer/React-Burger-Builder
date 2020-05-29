import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
	state = {
		order: [],
		loading: true
	};
	componentDidMount() {
		axios
			.get('/order.json')
			.then((res) => {
				const fetchedOrder = [];
				for (let key in res.data) {
					fetchedOrder.push({
						...res.data[key],
						id: key
					});
				}
				this.setState({ loading: false, order: fetchedOrder });
				console.log(this.state.order);
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	}
	render() {
		let order = this.state.order.map((order) => (
			<Order key={order.id} price={order.price} ingredients={order.ingredients} />
		));
		if (this.state.loading) {
			order = <Spinner />;
		}
		return <div>{order}</div>;
	}
}
export default Orders;
