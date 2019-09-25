import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Navigation from '../../components/Navigation/Navigation';
import Products from './Products/Products';
import Modal from '../../components/UI/Modal/Modal';

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

	render () {
		return (
			<div className="Shop">
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<p>{this.state.currentlySelected.name}</p>
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