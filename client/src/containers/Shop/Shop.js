import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../Login/Login';
import Navigation from '../../components/Navigation/Navigation';
import Products from './Products/Products';

class Shop extends Component {
	constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      authToken: ''
    };
  }

  handleLogin = (data) => {
  	this.setState({
  		isAuthenticated: true,
  		authToken: data.token
  	});
  }

	render () {
		let screen = <Route path="/" render={(props) => <Login {...props} onLogin={this.handleLogin} />} />;
		if (this.state.isAuthenticated) {
			screen = (
				<div>
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
		return (
			<div className="Shop">
				{screen}
			</div>
		);
	}
}

export default Shop;