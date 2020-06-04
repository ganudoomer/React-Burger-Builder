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
