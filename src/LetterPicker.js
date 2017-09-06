import React, { Component } from 'react';
import './LetterPicker.css';
import Letter from './Letter';

class LetterPicker extends Component {
  static sentences = [
    'Welcome to the crazy login form. Have "fun" logging in.',
    'This is a long sentence containing other characters.',
  ];
  static specialCharacters = ['\u25C0', '@', '.', '_', '-', '/'];

  state = {
    currentLetter: 0,
    goLeft: false,
    timeoutRunning: true,
  };

  componentWillMount() {
    const letterArray = [
      ...LetterPicker.sentences[
        Math.floor(Math.random() * LetterPicker.sentences.length)
      ],
      ...LetterPicker.specialCharacters,
    ];
    setTimeout(this.moveLetter, this.props.speed);

    this.setState({ letterArray, goLeft: this.props.goLeft });
  }

  componentWillUnmount() {
    this.setState({ timeoutRunning: false });
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};

    if (nextProps.goLeft !== this.state.goLeft) {
      newState.goLeft = nextProps.goLeft;
    }

    if (nextProps.speed !== this.props.speed) {
      newState.speed = nextProps.speed;
    }

    this.setState(newState);
  }

  moveLetter = () => {
    if (!this.state.timeoutRunning) {
      return;
    }

    const { letterArray, currentLetter } = this.state;

    if (!letterArray) {
      return;
    }

    let { goLeft } = this.state;

    // change direction randomly with a low probability
    if (Math.random() > 0.95) {
      goLeft = !goLeft;
    }

    let newLetter = goLeft ? currentLetter - 1 : currentLetter + 1;
    newLetter = (newLetter + letterArray.length) % letterArray.length;

    this.props.onChange(letterArray[newLetter]);
    this.setState({ currentLetter: newLetter, goLeft });

    setTimeout(this.moveLetter, this.props.speed);
  };

  render() {
    return (
      <div className="LetterPicker">
        {this.state.letterArray.map((letter, index) =>
          <Letter
            key={`${index}-${letter}`}
            letter={letter}
            selected={index === this.state.currentLetter}
          />,
        )}
      </div>
    );
  }
}

export default LetterPicker;
