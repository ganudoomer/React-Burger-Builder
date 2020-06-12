import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OderSummary/OderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderAction from '../../store/actions/index';
import { connect } from 'react-redux';

export class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchaseOrder: false
	};
	componentDidMount() {
		this.props.onInitIngredients();
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
		if (this.props.isAuthenticated) {
			this.setState({ purchaseOrder: true });
		} else {
			this.props.onRedirect('/checkout');
			this.props.history.push('/authenticate');
		}
	};
	purchaseCloselHandler = () => {
		this.setState({ purchaseOrder: false });
	};
	purchaseContinueHandler = () => {
		this.props.onInitOrder();
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
		let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						addHandeler={this.props.onIngredientsAdd}
						removeHandler={this.props.onIngredientsRemove}
						disabled={disableInfo}
						price={this.props.tpr}
						isAuth={this.props.isAuthenticated}
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
		ings: state.burgerBuilder.ingredients,
		tpr: state.burgerBuilder.totalprice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientsAdd: (ingredient) => dispatch(burgerBuilderAction.addIngredient(ingredient)),
		onIngredientsRemove: (ingredient) => dispatch(burgerBuilderAction.removeIngredient(ingredient)),
		onInitIngredients: () => dispatch(burgerBuilderAction.initIngredients()),
		onInitOrder: () => dispatch(burgerBuilderAction.purchaseInit()),
		onRedirect: (path) => dispatch(burgerBuilderAction.authRedirect(path))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
