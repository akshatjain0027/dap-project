import React from 'react';
import './sign-in.styles.css';
import FormInput from '../form-input/form-input.component';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

class SignIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			redirect: null
		};
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { email, password } = this.state;
		try {
			let res = await axios({
				method: 'post',
				url:
					'https://backend-json-dap.herokuapp.com/users/login',
				data: {
					email: email,
					password: password
				},
				crossDomain: true
			});
			console.log(res);

			const token = res.data.token;
			localStorage.setItem('token', token);
			localStorage.setItem('username', res.data.user.name);
			this.setState({ redirect: '/' });
		} catch (e) {
			console.log('not authenticate');
		}
	};

	handleChange = event => {
		const { value, name } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}
		return (
			<div className="sign-in">
				<h1>I already have an account</h1>
				<span>Sign in with your email</span>

				<form action="" onSubmit={this.handleSubmit}>
					<FormInput
						label="Email"
						type="email"
						name="email"
						value={this.state.email}
						required
						handleChange={this.handleChange}
					/>
					<FormInput
						label="Password"
						type="password"
						name="password"
						value={this.state.password}
						required
						handleChange={this.handleChange}
					/>
					<button
						className="signinbutton btn btn-primary"
						type="submit"
					>
						SignIn
					</button>
					<button class="g-signin2" data-onsuccess="onSignIn">SignIn</button>

				</form>
			</div>
		);
	}
}

export default SignIn;
