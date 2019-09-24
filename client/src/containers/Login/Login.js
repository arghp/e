import React, { Component } from 'react';
import axios from 'axios';

import Styles from './Login.module.css'

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			errors: {},
			success: ""
		};
	}

	validateForm() {
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		let loginErrors = {}

		// check for errors
		if (!this.state.email) {
			loginErrors.email = 'Email required';
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.state.email)
		) {
			loginErrors.email = 'Invalid email address';
		}
		if (!this.state.password) {
			loginErrors.password = 'Password required';
		} else if (
			this.state.password.length < 6
		) {
			loginErrors.password = 'Password must be at least 6 characters long';
		}

		this.setState({errors: loginErrors});

		// if there are no errors
		if (Object.keys(loginErrors).length === 0) {
			try {
				const response = await axios.post(
					'http://localhost:5000/users/authorize',
					{
						email: this.state.email,
						password: this.state.password
					}
				);
				this.props.onLogin(response);
			} catch (error) {
				console.log(error);
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					this.setState({success: error.response.data.errors[0].msg})
				}
			}
		}

	}

	render () {
		return (
			<div className={Styles.Login}>
				<form onSubmit={this.handleSubmit}>
					{this.state.success ?
						<div className={Styles.Error}>{this.state.success}</div> :
						null
					}
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email address"
						onChange={this.handleChange}
						value={this.state.email}
					/>
					{this.state.errors.hasOwnProperty('email') ? 
					<div className={Styles.Error}>{this.state.errors.email}</div> :
					null}
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						onChange={this.handleChange}
						value={this.state.password}
					/>
					{this.state.errors.hasOwnProperty('password') ? 
					<div className={Styles.Error}>{this.state.errors.password}</div> :
					null}
					<button type="submit">
						Login
					</button>
				</form>
			</div>
		);
	}
}

export default Login;