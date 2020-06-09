import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseSucess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCESS,
		orderId: id,
		orderData: orderData
	};
};
export const purchaseFailed = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/order.json', orderData)
			.then((response) => {
				console.log(response.data);
				dispatch(purchaseSucess(response.data.name, orderData));
			})
			.catch((error) => {
				dispatch(purchaseFailed(error));
			});
	};
};
export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_INIT
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDER_DATA_START
	};
};

export const fetchOrderSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDER_DATA_SUCCESS,
		orders: orders
	};
};

export const fetchOrderFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDER_DATA_FAILED
	};
};

export const fetchOrder = () => {
	return (dispatch) => {
		dispatch(fetchOrderStart());
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
				dispatch(fetchOrderSuccess(fetchedOrder));
			})
			.catch((err) => {
				dispatch(fetchOrderFail(err));
			});
	};
};
