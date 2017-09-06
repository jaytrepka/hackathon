import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "xxx",
      username: "test"
    };
  }

  render() {
    const { password, username } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Super Hackaton App</h2>
        </div>
        <div className="form">
          <input
            type="text"
            value={username}
            onChange={() => this.changeUsername()}
            placeholder="Type your username"
          />
          <input
            type="text"
            value={password}
            onChange={() => this.changePassword()}
            placeholder="Type your password"
          />
          <button onClick="">LogIn</button>
        </div>
        <div className="select-wrap">A X S</div>
        <div className="hints" />
      </div>
    );
  }
}

export default App;
