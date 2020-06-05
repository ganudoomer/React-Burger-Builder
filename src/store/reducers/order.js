import * as actionTypes from '../actions/actionTypes';
import reducer from './burgerBuilder';
const initalState = {
	orders: [],
	loading: false,
	purchased: false
};
const reduser = (state = initalState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_INIT:
			return {
				...state,
				purchased: false
			};
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.PURCHASE_BURGER_SUCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId
			};
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true
			};
		case actionTypes.PURCHASE_BURGER_FAILED:
			return {
				...state,
				loading: false
			};
		case actionTypes.FAILED_FETCH_DATA:
			return {
				...state,
				loading: false
			};
		case actionTypes.FETCH_ORDER_DATA_SUCCESS:
			return {
				...state,
				orders: action.orders,
				loading: false
			};
		case actionTypes.FETCH_ORDER_DATA_START:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};

export default reduser;
