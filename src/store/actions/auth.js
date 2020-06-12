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

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('expDate');

	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const authTimeOut = (expTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expTime * 1000);
	};
};

export const authRedirect = (path) => {
	return {
		type: actionTypes.AUTH_REDIRECT,
		path: path
	};
};

export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API-KEY]';
		if (!isSignUp) {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API-KEY]';
		}
		axios
			.post(url, authData)
			.then((response) => {
				const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('expDate', expDate);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('userId', response.data.localId);

				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(authTimeOut(response.data.expiresIn));
			})
			.catch((err) => {
				dispatch(authFail(err.response.data.error.message));
			});
	};
};
export const returnConsole = () => {
	console.log('working');
};
export const authStateChecker = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expDate = new Date(localStorage.getItem('expDate'));
			if (expDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(authTimeOut((expDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};
