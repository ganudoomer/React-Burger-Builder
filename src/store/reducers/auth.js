import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initalState = {
	userId: null,
	token: null,
	loading: false,
	error: null,
	authRedirectPath: '/'
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
const authLogout = (state, action) => {
	return updateObject(state, { userId: null, token: null });
};
const authRedirect = (state, action) => {
	return updateObject(state, { authRedirectPath: action.path });
};
const reducer = (state = initalState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.AUTH_REDIRECT:
			return authRedirect(state, action);
		default:
			return state;
	}
};

export default reducer;
