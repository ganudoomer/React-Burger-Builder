import * as actionTypes from '../actions/actionTypes';
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
const reducer = (state = intialState, actions) => {
	switch (actions.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[actions.ingredientName]: state.ingredients[actions.ingredientName] + 1
				},
				totalprice: state.totalprice + INGRIDENT_PRICE[actions.ingredientName]
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[actions.ingredientName]: state.ingredients[actions.ingredientName] - 1
				},
				totalprice: state.totalprice - INGRIDENT_PRICE[actions.ingredientName]
			};
		case actionTypes.SET_INGREDIENT:
			return {
				...state,
				ingredients: {
					salad: actions.ingredients.salad,
					bacon: actions.ingredients.bacon,
					cheese: actions.ingredients.cheese,
					meat: actions.ingredients.meat
				},
				error: false,
				totalprice: 40
			};
		case actionTypes.FAILED_FETCH_DATA:
			return {
				...state,
				error: true
			};
		default:
			return state;
	}
};

export default reducer;
