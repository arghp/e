import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Shop from './containers/Shop/Shop';
import Login from './containers/Login/Login';

class App extends Component {
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

	render() {
		let screen = <Route path="/" render={(props) => <Login {...props} onLogin={this.handleLogin} />} />;

		if (this.state.isAuthenticated) {
			screen = <Shop />;
		}

		return (
			<BrowserRouter>
				<div className="App">
					{screen}
				</div>
			</BrowserRouter>
		);

	} 
}

export default App;
