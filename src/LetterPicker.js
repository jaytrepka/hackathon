import React, { Component } from 'react';
import './LetterPicker.css';
import Letter from './Letter';

class LetterPicker extends Component {
  static sentences = [
    'Welcome to the crazy login form. Have "fun" logging in.',
    'This is a long sentence containing other characters.',
    'Hello, I am a happybara and I will make your life hell.',
    'Still have not logged in? Maybe you should try a bit harder.',
    'Logging in is easy, logging in is fun.',
  ];
  static specialCharacters = ['\u25C0', '@', '.', '_', '-', '/'];

  state = {
    currentLetter: 0,
    goLeft: false,
    timeoutRunning: true,
  };

  componentWillMount() {
    const wordArray = this.composeWordArray(this.props);
    setTimeout(this.moveLetter, this.props.speed);

    this.setState({ wordArray, goLeft: this.props.goLeft });
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

    if (nextProps.selectedSentence !== this.props.selectedSentence) {
      newState.wordArray = this.composeWordArray(nextProps);
      newState.currentLetter = 0;
    }

    this.setState(newState);
  }

  composeWordArray = (props = this.props) => {
    const words = LetterPicker.sentences[props.selectedSentence].split(' ');

    return [
      ...words.map(word => [...word, ' ']),
      LetterPicker.specialCharacters,
    ];
  };

  composeLetterArray = words =>
    words.reduce((flattened, word) => flattened.concat(word), []);

  moveLetter = () => {
    if (!this.state.timeoutRunning) {
      return;
    }

    const { wordArray, currentLetter } = this.state;

    if (!wordArray) {
      return;
    }

    let { goLeft } = this.state;

    // change direction randomly with a low probability
    if (Math.random() > 0.99) {
      goLeft = !goLeft;
    }

    const letterArray = this.composeLetterArray(wordArray);

    let newLetter = goLeft ? currentLetter - 1 : currentLetter + 1;
    newLetter = (newLetter + letterArray.length) % letterArray.length;

    this.props.onChange(letterArray[newLetter]);
    this.setState({ currentLetter: newLetter, goLeft });

    setTimeout(this.moveLetter, this.props.speed);
  };

  render() {
    let currIndex = 0;

    return (
      <div className="LetterPicker panel">
        <div className="LetterPicker-inside">
          {this.state.wordArray.map((word, wordIndex) =>
            <div className="LetterPicker-word" key={`${wordIndex}-${word}`}>
              {word.map((letter, letterIndex) =>
                <Letter
                  key={`${letterIndex}-${letter}`}
                  letter={letter}
                  selected={currIndex++ === this.state.currentLetter}
                />,
              )}
            </div>,
          )}
        </div>
      </div>
    );
  }
}

export default LetterPicker;
