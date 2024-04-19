// App.js
import React, { Component } from 'react';
import AddUserForm from './AddUserForm';
import UserList from './UserList';
import './assets/styles.css';

const URL = 'https://gorest.co.in/public/v2/users';
const ACCESS_TOKEN = 'e11b2efee656b103337747c81455800450a703de8b3b719c586cd3ce3c271dc4';

class App extends Component {
  state = {
    users: [],
    newUser: {
      name: '',
      gender: '',
      email: '',
      status: 'active'
    },
    isLoading: true,
    operationCount: 0
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data, isLoading: false });
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser,
        [name]: value
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    fetch(`${URL}?access-token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.newUser)
    })
      .then(res => res.json())
      .then(data => {
        this.fetchUsers();
        this.setState(prevState => ({
          newUser: {
            ...prevState.newUser,
            name: '',
            gender: '',
            email: '',
            status: 'active'
          },
          operationCount: prevState.operationCount + 1
        }));
      })
      .catch(error => console.error('Error adding user:', error));
  };

  deleteUser = id => {
    fetch(`${URL}/${id}?access-token=${ACCESS_TOKEN}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.fetchUsers();
        this.setState(prevState => ({
          operationCount: prevState.operationCount + 1
        }));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  render() {
    const { users, newUser, isLoading, operationCount } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>User Management</h1>
          <AddUserForm newUser={newUser} onChange={this.onChange} onSubmit={this.onSubmit} />
          <p>Operations Count: {operationCount}</p>
        </header>
        <main>
          {isLoading ? <p>Loading...</p> : <UserList users={users} deleteUser={this.deleteUser} />}
        </main>
      </div>
    );
  }
}

export default App;
