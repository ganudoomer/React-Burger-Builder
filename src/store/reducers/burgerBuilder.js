import * as actionTypes from './actions';
const intialState = {
	ingredients: {
		salad: 0,
		meat: 0,
		bacon: 0,
		cheese: 0
	},
	totalprice: 40
};
const INGRIDENT_PRICE = {
	meat: 70.5,
	salad: 20.5,
	bacon: 60.5,
	cheese: 20.5
};
const reducer = (state = intialState, actions) => {
	switch (actions.type) {
		case actionTypes.ADD_INGREDENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[actions.ingredientName]: state.ingredients[actions.ingredientName] + 1
				},
				totalprice: state.totalprice + INGRIDENT_PRICE[actions.ingredientName]
			};
		case actionTypes.REMOVE_INGREDENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[actions.ingredientName]: state.ingredients[actions.ingredientName] - 1
				},
				totalprice: state.totalprice - INGRIDENT_PRICE[actions.ingredientName]
			};
		default:
			return state;
	}
};

export default reducer;
