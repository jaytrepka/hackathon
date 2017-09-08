import React, { Component } from "react";
import "./Tip.css";

class Tip extends Component {
  static tips = [
    'Use "Space" key to pick a letter',
    'Use "Arrow Down/Up" key to change speed',
    'Use "Arrow Left/Right" key to change',
    'Use "Letter" keys to change sentence',
    "Inputs are filled from right to left"
  ];

  state = {
    open: false
  };

  render() {
    const { open } = this.state;

    return (
      <div className="tip-wrap">
        <div
          className={`tip-icon close ${open ? "open" : ""}`}
          onClick={() => this.setState({ open: true })}
        />
        <div
          className={`tip-modal-overlay ${open ? "open" : ""}`}
          onClick={() => this.setState({ open: false })}
        />
        <div className={`tip-modal-wrap ${open ? "open" : ""}`}>
          <div className="tip-modal">
            <div className="tip-icon modal" />
            <div className="tips">
              <div className="tip-header">Tips</div>
              {Tip.tips.map((tip, i) =>
                <div className="tip">
                  <span>
                    Tip no. {i + 1}:
                  </span>
                  {tip}
                </div>
              )}
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
