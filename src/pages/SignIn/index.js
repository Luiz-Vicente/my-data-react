import React, { Component } from "react";
import firebase from "../../firebase/index";

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errorMessage: "",
		};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const { name, value } = event.target;
    this.setState({ [name]: value });
	};

	async handleSubmit(event) {
		event.preventDefault();
		const { email, password } = this.state;

		try {
			await firebase.auth().signInWithEmailAndPassword(email, password);
			window.location.href = "/";
		} catch (signError) {
      const { error } = JSON.parse(signError.message);
      this.setState({ errorMessage: error.message });
		}
	};

	render() {
		const { email, password, errorMessage } = this.state;

		return (
			<div className="page">
				<h1>Acessar minha conta</h1>
				<form
					className="form-group"
					onSubmit={this.handleSubmit}
				>
					<div className="input-group">
						<label for="email">Email:</label>
						<input
							id="email"
							type="email"
							name="email"
							value={email}
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="input-group">
						<label for="password">Senha:</label>
						<input
							id="password"
							type="password"
							name="password"
							value={password}
							onChange={this.handleInputChange}
						/>
					</div>
          {errorMessage && 
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          }
					<button className="btn-login" type="submit">Acessar</button>
          <a href="/signup" className="btn-link">Cadastre-se</a>
				</form>
			</div>
		);
	}
}

export default Signin;
