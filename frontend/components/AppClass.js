import React from "react";
import axios from "axios";

//setting a init var to simplify state management
//x and y are location on the grid, steps keeps track of steps taken
//email is the email of the user, grid is the grid of the game,
//and message is for the api messages to
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
  message: "",
};

export default class AppClass extends React.Component {
  constructor() {
    super();
    //set init state
    this.state = initialState;
  }
  render() {
    //destructuring
    const { className } = this.props;
    const { x, y, steps, email, message, grid } = this.state;

    //function to handle the left click event
    const moveLeft = () => {
      if (x > 1) {
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          x: this.state.x - 1,
        });
      } else {
        this.setState({
          message: "You can't go left",
        });
      }
    };

    //function to handle the right click event
    const moveRight = () => {
      if (x >= 1 && x < 3) {
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          x: this.state.x + 1,
        });
      } else {
        this.setState({
          message: "You can't go right",
        });
      }
    };

    //function to handle the up click event
    const moveUp = () => {
      if (y > 1) {
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          y: this.state.y - 1,
        });
      } else {
        this.setState({
          message: "You can't go up",
        });
      }
    };

    //function to handle the down click event
    const moveDown = () => {
      if (y >= 1 && y < 3) {
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          y: this.state.y + 1,
        });
      } else {
        this.setState({
          message: "You can't go down",
        });
      }
    };

    //function to handle the reset click event
    const reset = () => {
      this.setState(initialState);
    };

    //function that helps with grid traversal
    const setLocation = () => {
      grid.map((group) => {
        if (group[0] === x && group[1] === y) {
          group[2] = true;
          group[3] = "B";
        } else {
          group[2] = false;
          group[3] = null;
        }
      });
    };
    setLocation();

    //function to handle the submit click event
    //creates payload for api, and replaces message with success or error
    const onSubmit = (event) => {
      event.preventDefault();
      const payload = { x, y, steps, email };
      this.setState({
        ...this.state,
        message: "",
      });
      axios
        .post("http://localhost:9000/api/result", payload)
        .then((res) => {
          console.log(res);
          reset();
          this.setState({
            ...this.state,
            message: res.data.message,
          });
        })
        .catch((err) => {
          this.setState({ ...this.state, message: err.response.data.message });
        });
      this.setState({
        email: "",
      });
    };

    //function to handle the email change event
    //keeps the current value of the email input in state
    const onChange = (event) => {
      const { value } = event.target;
      this.setState({ ...this.state, email: value });
    };

    //ui for the class-based component
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({x}, {y})
          </h3>
          <h3 id="steps">
            You moved {steps} {steps === 1 ? "time" : "times"}
          </h3>
        </div>
        <div id="grid">
          {grid.map((group, idx) => {
            if (group[2] === true) {
              return (
                <div className="square active" key={idx}>
                  {group[3]}
                </div>
              );
            } else {
              return (
                <div className="square" key={idx}>
                  {group[3]}
                </div>
              );
            }
          })}
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={moveLeft}>
            LEFT
          </button>
          <button id="up" onClick={moveUp}>
            UP
          </button>
          <button id="right" onClick={moveRight}>
            RIGHT
          </button>
          <button id="down" onClick={moveDown}>
            DOWN
          </button>
          <button id="reset" onClick={reset}>
            reset
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={onChange}
            value={this.state.email}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
