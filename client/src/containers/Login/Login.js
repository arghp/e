import React, { Component } from 'react';
import axios from 'axios';

import Styles from './Login.module.css'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  validateForm() {
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('yeah');
    console.log(this.state);

    let loginErrors = {}
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

    if (Object.keys(loginErrors).length > 0) {
      this.setState({errors: loginErrors});
    }

    if (Object.keys(loginErrors).length === 0) {
      axios.post('http://localhost:5000/users/authorize', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data.errors[0].msg);

      });
    }
  }

  render () {
    return (
      <div className={Styles.Login}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            onChange={this.handleChange}
            value={this.state.email}
          />
          {}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          {}
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;