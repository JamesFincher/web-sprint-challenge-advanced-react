import React, { useState, useEffect } from "react";
import axios from "axios";

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

export default function AppFunctional(props) {
  const { className } = props;
  //set state
  const [x, setX] = useState(initialState.x);
  const [y, setY] = useState(initialState.y);
  const [steps, setSteps] = useState(initialState.steps);
  const [email, setEmail] = useState(initialState.email);
  const [grid, setGrid] = useState(initialState.grid);
  const [message, setMessage] = useState(initialState.message);

  //helpers for the form
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  //submit handler... Posts to axios, and then updates the state posting
  //the response to messages in the dom
  const onSubmit = (e) => {
    e.preventDefault();
    //using state to create a payload for axios
    const payload = { x, y, email, steps };
    axios
      .post("http://localhost:9000/api/result", payload)
      .then((res) => {
        const { message } = res.data;
        // console.log(message);
        // setSteps(initialState.steps);
        setEmail(initialState.email);
        setMessage(message);
        setGrid(initialState.grid);
        // setSteps(initialState.steps);
      })
      .catch((err) => {
        const { message } = err.response.data;
        console.log(message);
        setMessage(message);
      });
  };
  //controller logic grid navagation

  //function to handle the move left event
  const moveLeft = () => {
    if (x > 1) {
      setX(x - 1);
      setSteps(steps + 1);
    } else {
      setMessage("You can't go left");
    }
  };

  //function to handle the move right event
  const moveRight = () => {
    if (x < 3) {
      setX(x + 1);
      setSteps(steps + 1);
    } else {
      setMessage("You can't go right");
    }
  };

  //function to handle the move up event
  const moveUp = () => {
    if (y > 1) {
      setY(y - 1);
      setSteps(steps + 1);
    } else {
      setMessage("You can't go up");
    }
  };

  //function to handle the move down event
  const moveDown = () => {
    if (y >= 1 && y < 3) {
      setY(y + 1);
      setSteps(steps + 1);
    } else {
      setMessage("You can't go down");
    }
  };

  // function to handle the reset click event
  const reset = () => {
    setX(initialState.x);
    setY(initialState.y);
    setSteps(initialState.steps);
    setEmail(initialState.email);
    setMessage(initialState.message);
    setGrid(initialState.grid);
  };

  //function to set location on grid
  const setLocation = () => {
    grid.map((square) => {
      if (square[0] === x && square[1] === y) {
        square[2] = true;
        square[3] = "B";
      } else {
        square[2] = false;
        square[3] = null;
      }
    });
  };

  setLocation();
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x}, {y})
        </h3>
        <h3 id="steps">
          <h3 id="steps">You moved {steps} times</h3>
        </h3>
      </div>
      <div id="grid">
        {grid.map((square, index) => {
          if (square[2] === true) {
            return (
              <div className="square active" key={index}>
                {square[3]}
              </div>
            );
          } else {
            return <div className="square" key={index}></div>;
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
          value={email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
