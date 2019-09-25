import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navigation from '../../components/Navigation/Navigation';
import Products from './Products/Products';

class Shop extends Component {

	render () {
		return (
			<div className="Shop">
				<Route path="/" component={Navigation} />
				<Switch>
					{/*<Route path="/cart" component={Cart} />*/}
					<Route path="/products" component={Products} />
					<Redirect from="/" to="/products" />
					{/* <Route path="/" component={Posts} /> */}
				</Switch>
			</div>
		);
	}
}

export default Shop;