import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Login from '../Login/Login';
import Navigation from '../../components/Navigation/Navigation';

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
			screen = <Route path="/" component={Navigation} />;
		}
		return (
			<div className="Shop">
				{screen}
			</div>
		);
	}
}

export default Shop;