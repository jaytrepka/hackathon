import React, { Component } from 'react';
import logo from './capy_angry.png';
import './App.css';
import LetterPicker from './LetterPicker';

class App extends Component {
  state = {
    password: '',
    username: '',
    letter: '',
    goLeft: false,
    speed: 500,
  };

  handleLetterChange = letter => {
    this.setState({ letter });
  };

  handleKeyDown = event => {
    const { key, target: { name } } = event;
    console.log(key);

    if (key !== 'Tab' && key !== 'Enter') {
      event.preventDefault();
    }

    if (key === 'ArrowLeft') {
      this.setState({ goLeft: true });
      return;
    }

    if (key === 'ArrowRight') {
      this.setState({ goLeft: false });
      return;
    }

    if (key === 'ArrowUp') {
      const newSpeed = Math.max(100, this.state.speed - 100);
      this.setState({ speed: newSpeed });
      return;
    }

    if (key === 'ArrowDown') {
      const newSpeed = Math.min(800, this.state.speed + 100);
      this.setState({ speed: newSpeed });
      return;
    }

    if (key !== ' ') {
      return;
    }

    let newValue;
    if (this.state.letter === '\u25C0') {
      newValue = this.state[name].substring(1);
    } else {
      newValue = this.state.letter + this.state[name];
    }

    this.setState({ [name]: newValue }, () =>
      this[`${name}Ref`].setSelectionRange(0, 0),
    );
  };

  componentDidMount() {
    this.usernameRef.focus();
  }

  render() {
    const { password, username, goLeft, speed } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Super Hackaton App</h2>
        </div>

        <div className="App-form">
          <form autoComplete="off">
            <input
              type="text"
              value={username}
              name="username"
              ref={input => (this.usernameRef = input)}
              onKeyDown={this.handleKeyDown}
              placeholder="Type your username"
            />
            <input
              type="password"
              value={password}
              name="password"
              ref={input => (this.passwordRef = input)}
              onKeyDown={this.handleKeyDown}
              placeholder="Type your password"
            />
            <button onClick="">LogIn</button>
          </form>
        </div>

        <LetterPicker
          onChange={this.handleLetterChange}
          goLeft={goLeft}
          speed={speed}
        />

        <div className="hints" />
      </div>
    );
  }
}

export default App;
