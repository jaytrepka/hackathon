import React, { Component } from "react";
import "./App.css";
import LetterPicker from "./LetterPicker";
import Tip from "./Tip";

class App extends Component {
  state = {
    errorUsername: false,
    errorPassword: false,
    password: "",
    username: "",
    letter: "",
    goLeft: false,
    speed: 500,
    selectedSentence: 0,
    success: false
  };

  handleLetterChange = letter => {
    this.setState({ letter });
  };

  handleKeyDown = event => {
    const { key, target: { name } } = event;
    console.log(key);
    this.setState({ errorPassword: false, errorUsername: false });
    if (key !== "Tab" && key !== "Enter") {
      event.preventDefault();
    }

    if (key === "ArrowLeft") {
      this.setState({ goLeft: true });
      return;
    }

    if (key === "ArrowRight") {
      this.setState({ goLeft: false });
      return;
    }

    if (key === "ArrowUp") {
      const newSpeed = Math.max(100, this.state.speed - 100);
      this.setState({ speed: newSpeed });
      return;
    }

    if (key === "ArrowDown") {
      const newSpeed = Math.min(800, this.state.speed + 100);
      this.setState({ speed: newSpeed });
      return;
    }

    if ([..."qwert"].indexOf(key) > -1) {
      this.setState({ selectedSentence: 0 });
      return;
    }

    if ([..."yuiop"].indexOf(key) > -1) {
      this.setState({ selectedSentence: 1 });
      return;
    }

    if ([..."asdfg"].indexOf(key) > -1) {
      this.setState({ selectedSentence: 2 });
      return;
    }

    if ([..."hjklnm"].indexOf(key) > -1) {
      this.setState({ selectedSentence: 3 });
      return;
    }

    if ([..."zxcvb"].indexOf(key) > -1) {
      this.setState({ selectedSentence: 4 });
      return;
    }

    if (key !== " " && key !== "Backspace" && key !== "Delete") {
      return;
    }

    let newValue;
    if (this.state.letter === "\u25C0") {
      newValue = this.state[name].substring(1);
    } else {
      newValue = this.state.letter + this.state[name];
    }

    this.setState({ [name]: newValue }, () =>
      this[`${name}Ref`].setSelectionRange(0, 0)
    );
  };

  componentDidMount() {
    this.usernameRef.focus();
  }

  isEmailValid(email) {
    return !!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  }

  isPasswordValid(password) {
    return !!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{6,}$/);
  }

  handleSubmit(e) {
    const { errorPassword, errorUsername, password, username } = this.state;
    e.preventDefault();

    const isPasswordValid = this.isPasswordValid(password);
    const isEmailValid = this.isEmailValid(username);
    if (isPasswordValid && isEmailValid) {
      this.setState({ success: true });
    } else {
      this.setState({
        errorPassword: !isPasswordValid,
        errorUsername: !isEmailValid
      });
    }
  }

  render() {
    const {
      errorPassword,
      errorUsername,
      password,
      username,
      goLeft,
      selectedSentence,
      speed,
      success
    } = this.state;

    return (
      <div className="App">
        {!success &&
          <LetterPicker
            onChange={this.handleLetterChange}
            goLeft={goLeft}
            speed={speed}
            selectedSentence={selectedSentence}
          />}

        {!success &&
          <div className="App-form panel">
            <h1>Log in if you dare...</h1>
            <form autoComplete="off" onSubmit={e => this.handleSubmit(e)}>
              <input
                type="text"
                value={password}
                name="password"
                ref={input => (this.passwordRef = input)}
                onKeyDown={this.handleKeyDown}
                placeholder="Password"
                tabIndex={0}
                className={errorPassword ? "error" : ""}
              />
              {errorPassword &&
                <div className="error-message">
                  Passwords must be at least 6 characters in length and must
                  contain:
                  <br />- a minimum of 1 lower case letter [a-z]
                  <br />- a minimum of 1 upper case letter [A-Z]
                  <br />- a minimum of 1 numeric character [0-9]
                </div>}
              <input
                type="password"
                value={username}
                name="username"
                ref={input => (this.usernameRef = input)}
                onKeyDown={this.handleKeyDown}
                placeholder="Username"
                tabIndex={1}
                className={errorUsername ? "error" : ""}
              />
              {errorUsername &&
                <div className="error-message">
                  Please insert a valid email address
                </div>}
              <button type="submit">Log in</button>
            </form>
            <Tip />
          </div>}
        {success &&
          <div className="success-screen">
            <div className="hand-icon" />
            <div className="congrats-header">Congratulations!</div>
            <div className="congrats-text">
              {" "}You’ve successfully passed challenge
            </div>
          </div>}
      </div>
    );
  }
}

export default App;
