import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Login from '../Login/Login';

class Shop extends Component {
	constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      authToken: ''
    };
  }

  handleLogin = (data) => {
  	console.log(data);
  }

	render () {
		return (
			<div className="Shop">
				<header>
					<nav>
						<ul>
							<li>Hi</li>
						</ul>
					</nav>
				</header>
				<Route path="/" render={(props) => <Login {...props} onLogin={this.handleLogin} />} />
			</div>
		);
	}
}

export default Shop;