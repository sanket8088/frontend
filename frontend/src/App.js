import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from "./Container/LoginPage/LoginPage"
import HomePage from "./Container/HomePage/HomePage"
import StatusPage from "./Container/StatusPage/StatusPage"
import AnalyticsPage from "./Container/AnalyticsPage/AnalyticsPage"
import ResendPage from "./Container/ResendPage/ResendPage"

class App extends React.Component {
  state = {
    isUserLoggedIn: false,
    userId: "",
    active: 2
  }

  onUserLogin = (userId) => {
    this.setState({ isUserLoggedIn: true, userId: userId });
  }

  switchActiveTab = (activeTab) => {
    if (activeTab === 6) {
      this.setState({ active: 2, isUserLoggedIn: false, userId: "" })

    }
    this.setState({ active: activeTab });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <LoginPage onUserLogin={this.onUserLogin} {...props} />} />
          <Route path="/dashboard/" render={(props) => !(this.state.isUserLoggedIn) ? <Redirect to="/" /> :
            this.state.active === 2 ? <HomePage userId={this.state.userId} active={this.state.active} switchActiveTab={this.switchActiveTab} {...props} /> :
              this.state.active === 1 ? <StatusPage userId={this.state.userId} active={this.state.active} switchActiveTab={this.switchActiveTab} {...props} />
                : this.state.active === 4 ? <AnalyticsPage userId={this.state.userId} active={this.state.active} switchActiveTab={this.switchActiveTab} {...props} />
                  : this.state.active === 5 ? <ResendPage userId={this.state.userId} active={this.state.active} switchActiveTab={this.switchActiveTab} {...props} />
                    : null} />
          <Route path="/forgotpassword/:id" render={(props) => <LoginPage />} />
          {/* <Route path="/status/" render={(props) => !(this.state.isUserLoggedIn) ? <Redirect to="/" /> : <StatusPage userId={this.state.userId} active={this.state.active} switchActiveTab={this.switchActiveTab} {...props} />} /> */}
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
