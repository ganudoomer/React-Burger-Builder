import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OderSummary/OderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGRIDENT_PRICE = {
	meat: 70.5,
	salad: 20.5,
	bacon: 60.5,
	cheese: 20.5
};
class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalprice: 40,
		purchasable: false,
		purchaseOrder: false,
		loading: false,
		error: false
	};
	componentDidMount() {
		axios
			.get('https://my-burger-app-2c901.firebaseio.com/ingredients.json')
			.then((response) => {
				this.setState({ ingredients: response.data });
			})
			.catch((error) => {
				this.setState({ error: true });
			});
	}

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
		//alert('You choose to cont');
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalprice);
		const quertString = queryParams.join('&');
		this.setState({ loading: true });
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + quertString
		});
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price:this.state.totalprice,
		//      address: {
		// 			country: 'India',
		// 			pin: '2342323',
		// 			street: 'TestMoney'
		// 		},
		// 		email: 'janu@gmail.com'
		// 	},
		// 	deliveryMoethod: 'Hyperfast'
		// };
		// axios
		// 	.post('/order.json', order)
		// 	.then((response) => {
		// 		this.setState({ loading: false, purchaseOrder: false });
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ loading: false, purchaseOrder: false });
		// 	});
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
		let oderSummary = null;
		let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
		if (this.state.ingredients) {
			burger = (
				<Aux>
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

			oderSummary = (
				<OderSummary
					cancel={this.purchaseCloselHandler}
					continue={this.purchaseContinueHandler}
					ingredients={this.state.ingredients}
					price={this.state.totalprice}
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
export default withErrorHandler(BurgerBuilder, axios);
