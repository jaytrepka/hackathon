import React, { Component } from "react";
import "./App.css";
import LetterPicker from "./LetterPicker";
import Tip from "./Tip";

class App extends Component {
  state = {
    password: "",
    username: "",
    letter: "",
    goLeft: false,
    speed: 500,
    selectedSentence: 0
  };

  handleLetterChange = letter => {
    this.setState({ letter });
  };

  handleKeyDown = event => {
    const { key, target: { name } } = event;
    console.log(key);

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

  render() {
    const { password, username, goLeft, selectedSentence, speed } = this.state;

    return (
      <div className="App">
        <LetterPicker
          onChange={this.handleLetterChange}
          goLeft={goLeft}
          speed={speed}
          selectedSentence={selectedSentence}
        />

        <div className="App-form panel">
          <h1>Log in if you dare...</h1>
          <form autoComplete="off">
            <input
              type="text"
              value={password}
              name="password"
              ref={input => (this.passwordRef = input)}
              onKeyDown={this.handleKeyDown}
              placeholder="Password"
              tabIndex={0}
            />
            <input
              type="password"
              value={username}
              name="username"
              ref={input => (this.usernameRef = input)}
              onKeyDown={this.handleKeyDown}
              placeholder="Username"
              tabIndex={1}
            />
            <button onClick="">Log in</button>
          </form>
          <Tip />
        </div>
      </div>
    );
  }
}

export default App;
