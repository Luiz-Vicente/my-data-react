import React, { Component } from 'react';
import firebase from '../../firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userData: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.fetchUserData(user.uid);
      } else {
        this.setState({ user: null });
        window.location.href = '/signin';
      }
    });
  }

  async fetchUserData(userId) {
    await firebase.firestore().collection('users').doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ userData: doc.data() });
        } else {
          alert('Os dados do usuário não foram encontrados.');
        }
      })
      .catch((error) => {
        alert('Erro ao carregar os dados do usuário:', error.message);
      });
  }

  async handleLogout() {
    await firebase.auth().signOut()
      .then(() => {
        window.location.href = '/signin';
      })
      .catch((error) => {
        alert('Erro ao sair da conta:', error.message);
      });
  }

  render() {
    const { userData } = this.state;

    return (
      <>
        {userData && (
          <div className='page'>
            <h1>Meus dados</h1>
            <div className='form-group'>
            <div className="input-group">
						<label for="email">Email:</label>
						<input
							id="email"
							type="email"
							name="email"
							value={userData.email}
              disabled
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="input-group">
						<label for="first-name">Primeiro nome:</label>
						<input
							id="first-name"
							type="text"
							name="firstName"
							value={userData.firstName}
              disabled
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="input-group">
						<label for="last-name">Último nome:</label>
						<input
							id="last-name"
							type="text"
							name="lastName"
							value={userData.lastName}
              disabled
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="input-group">
						<label for="birth">Data de nascimento:</label>
						<input
							id="birth"
							type="date"
							name="dateOfBirth"
							value={userData.dateOfBirth}
              disabled
							onChange={this.handleInputChange}
						/>
					</div>
              <button onClick={this.handleLogout}>Sair da conta</button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Home;