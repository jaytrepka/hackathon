import React, { Component } from "react";
import "./Tip.css";

class Tip extends Component {
  state = {
    open: false
  };

  render() {
    const { open } = this.state;

    return (
      <div className="tip-wrap">
        <div
          className="tip-icon close"
          onClick={() => this.setState({ open: true })}
        />
        <div className={`tip-modal-wrap ${open ? "open" : ""}`}>
          <div className="tip-modal">
            <div className="tip-icon open" />
            <div className="tips">
              <div className="tip-header">Tips</div>
              <div className="tip">
                <span>Tip no. 1:</span>Use "Space" key to pick a letter
              </div>
              <div className="tip">
                <span>Tip no. 2:</span>Use "Arrow Down/Up" key to change speed
                of cursor
              </div>
              <div className="tip">
                <span>Tip no. 3:</span>Use "Arrow Left/Right" key to change
                cursor direction
              </div>
              <div className="tip">
                <span>Tip no. 4:</span>Use "Letter" keys to change sentence
              </div>
              <div className="tip">
                <span>Tip no. 5:</span>Inputs are filled from right to left
              </div>
            </div>
            <div
              className="close"
              onClick={() => this.setState({ open: false })}
            >
              X
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tip;
