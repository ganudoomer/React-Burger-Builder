import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { setIngredients } from '../actions/burgerBuilder';
const intialState = {
	ingredients: null,
	totalprice: 40,
	error: false
};
const INGRIDENT_PRICE = {
	meat: 70.5,
	salad: 20.5,
	bacon: 60.5,
	cheese: 20.5
};
const addIngredient = (state, actions) => {
	const updateIngredient = {
		[actions.ingredientName]: state.ingredients[actions.ingredientName] + 1
	};
	const updatedIngredients = updateObject(state.ingredients, updateIngredient);
	const updateState = {
		ingredients: updatedIngredients,
		totalprice: state.totalprice + INGRIDENT_PRICE[actions.ingredientName]
	};
	return updateObject(state, updateState);
};
const removeIngredient = (state, actions) => {
	const updateIng = {
		[actions.ingredientName]: state.ingredients[actions.ingredientName] - 1
	};
	const updatedIng = updateObject(state.ingredients, updateIng);
	const updateSt = {
		ingredients: updatedIng,
		totalprice: state.totalprice - INGRIDENT_PRICE[actions.ingredientName]
	};
	return updateObject(state, updateSt);
};
const setIngredient = (state, actions) => {
	return updateObject(state, {
		ingredients: {
			salad: actions.ingredients.salad,
			bacon: actions.ingredients.bacon,
			cheese: actions.ingredients.cheese,
			meat: actions.ingredients.meat
		},
		error: false,
		totalprice: 40
	});
};
const failedDataFetch = (state, actions) => {
	return updateObject(state, { error: true });
};
const reducer = (state = intialState, actions) => {
	switch (actions.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, actions);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, actions);
		case actionTypes.SET_INGREDIENT:
			return setIngredient(state, actions);
		case actionTypes.FAILED_FETCH_DATA:
			return failedDataFetch(state, actions);
		default:
			return state;
	}
};

export default reducer;
