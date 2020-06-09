import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initalState = {
	orders: [],
	loading: false,
	purchased: false
};

const purchaseBurgerInit = (state, action) => {
	return updateObject(state, { purchased: false });
};
const purchaseBurgerStart = (state, action) => {
	return updateObject(state, { loading: true });
};
const purchaseBurgerSuccess = (state, action) => {
	const newOrder = updateObject(action.orderData, { id: action.orderId });
	return updateObject(state, {
		loading: false,
		orders: state.orders.concat(newOrder),
		purchased: true
	});
};
const purchaseBurgerFailed = (state, action) => {
	return updateObject(state, { loading: false });
};
const failedFetchData = (state, action) => {
	return updateObject(state, { loading: false });
};
const fetchOrderDataSuccess = (state, action) => {
	return updateObject(state, {
		orders: action.orders,
		loading: false
	});
};
const fetchOrderStart = (state, action) => {
	return updateObject(state, { loading: true });
};
const reduser = (state = initalState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_INIT:
			return purchaseBurgerInit(state, action);
		case actionTypes.PURCHASE_BURGER_START:
			return purchaseBurgerStart(state, action);
		case actionTypes.PURCHASE_BURGER_SUCESS:
			return purchaseBurgerSuccess(state, action);
		case actionTypes.PURCHASE_BURGER_FAILED:
			return purchaseBurgerFailed(state, action);
		case actionTypes.FAILED_FETCH_DATA:
			return failedFetchData(state, action);
		case actionTypes.FETCH_ORDER_DATA_SUCCESS:
			return fetchOrderDataSuccess(state, action);
		case actionTypes.FETCH_ORDER_DATA_START:
			return fetchOrderStart(state, action);
		default:
			return state;
	}
};

export default reduser;
