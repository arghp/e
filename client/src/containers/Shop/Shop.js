import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Login from '../Login/Login';

class Shop extends Component {
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
				<Route path="/" component={Login} />
			</div>
		);
	}
}

export default Shop;