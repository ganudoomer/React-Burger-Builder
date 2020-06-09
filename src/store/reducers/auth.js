import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initalState = {
	userId: null,
	token: null,
	loading: false,
	error: null
};
const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
	return updateObject(state, { userId: action.userId, token: action.token, loading: false });
};
const authFail = (state, action) => {
	return updateObject(state, { loading: false, error: action.error });
};
const reducer = (state = initalState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		default:
			return state;
	}
};

export default reducer;
