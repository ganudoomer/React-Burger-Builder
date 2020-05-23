import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OderSummary/OderSummary';
const INGRIDENT_PRICE = {
	meat: 70.5,
	salad: 20.5,
	bacon: 60.5,
	cheese: 20.5
};
class BurgerBuilder extends Component {
	state = {
		ingredients: {
			meat: 0,
			salad: 0,
			bacon: 0,
			cheese: 0
		},
		totalprice: 40,
		purchasable: false,
		purchaseOrder: false
	};

	updatePurcahse(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	}

	addIngredientsHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;
		const updatedIngrients = {
			...this.state.ingredients
		};
		updatedIngrients[type] = newCount;
		const oldPrice = this.state.totalprice;
		const priceAdd = INGRIDENT_PRICE[type];
		const newPrice = oldPrice + priceAdd;

		this.setState({ totalprice: newPrice, ingredients: updatedIngrients });
		this.updatePurcahse(updatedIngrients);
	};

	removeIngredientsHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			//Prevant Code from breaking
			return;
		}
		const newCount = oldCount - 1;
		const updatedIngrients = {
			...this.state.ingredients
		};
		updatedIngrients[type] = newCount;
		const oldPrice = this.state.totalprice;
		const priceSub = INGRIDENT_PRICE[type];
		const newPrice = oldPrice - priceSub;

		this.setState({ totalprice: newPrice, ingredients: updatedIngrients });
		this.updatePurcahse(updatedIngrients);
	};
	purchaseModelHandler = () => {
		this.setState({ purchaseOrder: true });
	};
	purchaseCloselHandler = () => {
		this.setState({ purchaseOrder: false });
	};
	purchaseContinueHandler = () => {
		alert('You choose to continue');
	};
	render() {
		//Disable Less Btn
		const disableInfo = {
			...this.state.ingredients
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}
		//====================

		return (
			<Aux>
				<Modal show={this.state.purchaseOrder} clicked={this.purchaseCloselHandler}>
					<OderSummary
						cancel={this.purchaseCloselHandler}
						continue={this.purchaseContinueHandler}
						ingredients={this.state.ingredients}
						price={this.state.totalprice}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					addHandeler={this.addIngredientsHandler}
					removeHandler={this.removeIngredientsHandler}
					disabled={disableInfo}
					price={this.state.totalprice}
					purchasable={this.state.purchasable}
					purchaseOrder={this.purchaseModelHandler}
				/>
			</Aux>
		);
	}
}
export default BurgerBuilder;
