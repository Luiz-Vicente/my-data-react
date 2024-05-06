import React, { Component } from "react";
import firebase from "../../firebase/index";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			dateOfBirth: "",
			errorMessage: "",
		};
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleSubmit = async event => {
		event.preventDefault();
		const { email, password, firstName, lastName, dateOfBirth } = this.state;

		try {
			const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

			const userRef = firebase.firestore().collection("users").doc(user.uid);
			await userRef.set({
				email,
				firstName,
				lastName,
				dateOfBirth,
				uid: user.uid,
			});

			this.setState({
				email: "",
				password: "",
				firstName: "",
				lastName: "",
				dateOfBirth: "",
			});

      window.location.href = "/";
		} catch (error) {
      this.setState({ errorMessage: error.message });
		}
	};

	render() {
		const { email, password, firstName, lastName, dateOfBirth, errorMessage } = this.state;

		return (
			<div className="page">
				<h1>Cadastrar</h1>
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
							required
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
							required
              onChange={this.handleInputChange}
						/>
					</div>
					<div className="input-group">
						<label for="first-name">Primeiro nome:</label>
						<input
							id="first-name"
							type="text"
							name="firstName"
							value={firstName}
							required
              onChange={this.handleInputChange}
						/>
					</div>
					<div className="input-group">
						<label for="last-name">Último nome:</label>
						<input
							id="last-name"
							type="text"
							name="lastName"
							value={lastName}
							required
              onChange={this.handleInputChange}
						/>
					</div>
					<div className="input-group">
						<label for="birth">Data de nascimento:</label>
						<input
							id="birth"
							type="date"
							name="dateOfBirth"
							value={dateOfBirth}
							required
              onChange={this.handleInputChange}
						/>
					</div>
          {errorMessage && 
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          }
					<button type="submit">Cadastrar-me</button>
          <a href="/signin" className="btn-link">Acessar minha conta</a>
				</form>
			</div>
		);
	}
}

export default Signup;
