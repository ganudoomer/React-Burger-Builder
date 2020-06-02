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
const reducer = (state = intialState, actions) => {
	switch (actions.type) {
		case actionTypes.ADD_INGREDENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[actions.ingredientName]: state.ingredients[actions.ingredientName] + 1
				}
			};
		case actionTypes.REMOVE_INGREDENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[actions.ingredientName]: state.ingredients[actions.ingredientName] - 1
				}
			};
		default:
			return state;
	}
};

export default reducer;
