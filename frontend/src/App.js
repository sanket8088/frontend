import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from "./Container/LoginPage/LoginPage"
import HomePage from "./Container/HomePage/HomePage"

class App extends React.Component {
  state = {
    isUserLoggedIn: true,
    userId: 2,
    active: 2
  }

  onUserLogin = (userId) => {
    this.setState({ isUserLoggedIn: true, userId: userId });
  }

  switchActiveTab = (activeTab) => {
    this.setState({ active: activeTab });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <LoginPage onUserLogin={this.onUserLogin} {...props} />} />
          <Route path="/dashboard" render={(props) => !(this.state.isUserLoggedIn) ? <Redirect to="/" /> : <HomePage userId={this.state.userId} active={this.state.active} switchActiveTab={this.switchActiveTab} {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
