import React from 'react';
import './Letter.css';

const Letter = ({ letter, selected }) => {
  const classes = ['Letter'];
  if (selected) {
    classes.push('Letter-selected');
  }

  return (
    <div className={classes.join(' ')}>
      {letter.replace(' ', '\u00a0')}
    </div>
  );
};

export default Letter;
