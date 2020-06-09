import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};
export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId
	};
};
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const auth = (email, password, isSignUp) => {
	console.log('auth');
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZX3NQyzgblEHnJPs07iH5omaOdDIrhzY';
		if (!isSignUp) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZX3NQyzgblEHnJPs07iH5omaOdDIrhzY';
		}
		axios
			.post(url, authData)
			.then((response) => {
				console.log(response.data.idToken, response.data.localId);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFail(err));
			});
	};
};
