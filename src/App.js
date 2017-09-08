import React, { Component } from "react";
import "./App.css";
import LetterPicker from "./LetterPicker";
import Tip from "./Tip";
import EyeIcon from "./EyeIcon";

class App extends Component {
  state = {
    errorEmail: false,
    errorPassword: false,
    isPasswordVisible: false,
    normalTyping: false,
    password: "",
    email: "",
    letter: "",
    goLeft: false,
    speed: 500,
    selectedSentence: 0,
    success: false,
    numberOfTries: 0
  };

  handleLetterChange = letter => {
    this.setState({ letter });
  };

  handleKeyDown = event => {
    const { key, target: { name } } = event;
    this.setState({ errorPassword: false, errorEmail: false });
    if (key === ";") {
      this.setState({ normalTyping: !this.state.normalTyping });
      event.preventDefault();
      return;
    }
    if (this.state.normalTyping) {
      return;
    }
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
    this.passwordRef.focus();
  }

  isEmailValid(email) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  isPasswordValid(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password);
  }

  handleSubmit(e) {
    const { password, email, numberOfTries } = this.state;
    e.preventDefault();

    const isPasswordValid = this.isPasswordValid(password);
    const isEmailValid = this.isEmailValid(email);
    if (isPasswordValid && isEmailValid) {
      this.setState({ success: true });
    } else {
      this.setState({
        errorPassword: !isPasswordValid,
        errorEmail: !isEmailValid,
        numberOfTries: numberOfTries + 1
      });
    }
  }

  handleShowPassword() {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible
    }));
  }
  render() {
    const {
      errorPassword,
      errorEmail,
      isPasswordVisible,
      normalTyping,
      password,
      email,
      goLeft,
      selectedSentence,
      speed,
      success,
      numberOfTries
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
                onChange={e => {
                  if (normalTyping) {
                    this.setState({ password: e.target.value });
                  }
                }}
              />
              {errorPassword &&
                <div className="error-message">
                  Passwords must be at least 6 characters in length and must
                  contain:
                  <br />- a minimum of 1 lower case letter [a-z]
                  <br />- a minimum of 1 upper case letter [A-Z]
                  <br />- a minimum of 1 numeric character [0-9]
                </div>}
              <div className="App-email">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={email}
                  name="email"
                  ref={input => (this.emailRef = input)}
                  onKeyDown={this.handleKeyDown}
                  placeholder="Email"
                  tabIndex={1}
                  className={errorEmail ? "error" : ""}
                  onChange={e => {
                    if (normalTyping) {
                      this.setState({ email: e.target.value });
                    }
                  }}
                />
                <div className="eye" onClick={() => this.handleShowPassword()}>
                  <EyeIcon closed={isPasswordVisible} />
                </div>
              </div>
              {errorEmail &&
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
              You've successfully passed challenge
            </div>
            <button
              className="again"
              onClick={() => {
                this.setState({
                  email: "",
                  password: "",
                  errorPassword: false,
                  errorEmail: false,
                  success: false
                });
              }}
            >
              Try again
            </button>
          </div>}
        <div className="footer">
          Designed and coded by Happybaras
          <div className="head" />
        </div>
      </div>
    );
  }
}

export default App;
