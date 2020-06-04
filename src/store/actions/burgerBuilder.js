import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
export const addIngredient = (igName) => {
	return {
		ingredientName: igName,
		type: actionTypes.ADD_INGREDIENT
	};
};
export const removeIngredient = (igName) => {
	return {
		ingredientName: igName,
		type: actionTypes.REMOVE_INGREDIENT
	};
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENT,
		ingredients: ingredients
	};
};
export const failedFetchData = () => {
	return {
		type: actionTypes.FAILED_FETCH_DATA
	};
};
export const initIngredients = () => {
	return (dispatch) => {
		axios
			.get('https://my-burger-app-2c901.firebaseio.com/ingredients.json')
			.then((response) => {
				dispatch(setIngredients(response.data));
			})
			.catch((error) => {
				dispatch(failedFetchData());
			});
	};
};
