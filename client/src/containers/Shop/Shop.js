import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Navigation from '../../components/Navigation/Navigation';
import Products from './Products/Products';
import Modal from '../../components/UI/Modal/Modal';
import ProductExpanded from '../../components/Product/ProductExpanded/ProductExpanded';

class Shop extends Component {
	state = {
		purchasing: false,
		cart: [],
		currentlySelected: {}
	}

	purchaseHandler = async (id) => {
		try {
			const response = await axios.get('http://localhost:5000/products/' + id);
			this.setState({currentlySelected: response.data});
			this.setState({purchasing: true});
		} catch (error) {
			console.log(error);
		}
		
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	addToCartHandler = (quantity) => {
		let newCart = [...this.state.cart];
		let exists = false;

		// check if the product is already in the cart
		// in which case we just update the quantity
		newCart.forEach((element) => {
			if (element.id === this.state.currentlySelected._id) {
				exists = true;
				element.quantity = quantity;
			}
		});

		if (!exists) {
			newCart.push({
				id: this.state.currentlySelected._id,
				name: this.state.currentlySelected.name,
				quantity: quantity
			});
		}

		this.setState({
			cart: newCart
		}, () => {
			console.log(this.state);
		});
		this.setState({purchasing: false});
	}

	render () {
		return (
			<div className="Shop">
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<ProductExpanded product={this.state.currentlySelected} add={this.addToCartHandler}/>
				</Modal>
				<Route path="/" component={Navigation} />
				<Switch>
					{/*<Route path="/cart" component={Cart} />*/}
					<Route 
						path="/products" 
						render=
							{
								(props) => <Products {...props}
									purchase={this.purchaseHandler} 
									purchaseCancel={this.purchaseCancelHandler}/> 
							} 
					/>
					<Redirect from="/" to="/products" />
				</Switch>
			</div>
		);
	}
}

export default Shop;