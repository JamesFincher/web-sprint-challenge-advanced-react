import React from "react";

const initialState = {
  x: 2,
  y: 2,
  steps: 0,
  email: "",
  grid: [
    [1, 1, false, null],
    [2, 1, false, null],
    [3, 1, false, null],
    [1, 2, false, null],
    [2, 2, true, "B"],
    [3, 2, false, null],
    [1, 3, false, null],
    [2, 3, false, null],
    [3, 3, false, null],
  ],
};
export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
