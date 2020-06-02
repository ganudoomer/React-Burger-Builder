import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OderSummary/OderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchaseOrder: false,
		loading: false,
		error: false
	};
	componentDidMount() {
		// axios
		// 	.get('https://my-burger-app-2c901.firebaseio.com/ingredients.json')
		// 	.then((response) => {
		// 		this.setState({ ingredients: response.data });
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ error: true });
		// 	});
	}

	updatePurcahse(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	purchaseModelHandler = () => {
		this.setState({ purchaseOrder: true });
	};
	purchaseCloselHandler = () => {
		this.setState({ purchaseOrder: false });
	};
	purchaseContinueHandler = () => {
		this.props.history.push('/checkout');
	};

	render() {
		//Disable Less Btn
		const disableInfo = {
			...this.props.ings
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}
		//====================
		let oderSummary = null;
		let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						addHandeler={this.props.onIngredientsAdd}
						removeHandler={this.props.onIngredientsRemove}
						disabled={disableInfo}
						price={this.props.tpr}
						purchasable={this.updatePurcahse(this.props.ings)}
						purchaseOrder={this.purchaseModelHandler}
					/>
				</Aux>
			);

			oderSummary = (
				<OderSummary
					cancel={this.purchaseCloselHandler}
					continue={this.purchaseContinueHandler}
					ingredients={this.props.ings}
					price={this.props.tpr}
				/>
			);
		}
		if (this.state.loading) {
			oderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal show={this.state.purchaseOrder} clicked={this.purchaseCloselHandler}>
					{oderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		tpr: state.totalprice
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientsAdd: (ingredient) => dispatch({ type: actionTypes.ADD_INGREDENT, ingredientName: ingredient }),
		onIngredientsRemove: (ingredient) =>
			dispatch({ type: actionTypes.REMOVE_INGREDENT, ingredientName: ingredient })
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
