import React from "react";
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
  const [x, setX] = React.useState(initialState.x);
  const [y, setY] = React.useState(initialState.y);
  const [steps, setSteps] = React.useState(initialState.steps);
  const [email, setEmail] = React.useState(initialState.email);
  const [grid, setGrid] = React.useState(initialState.grid);
  const [message, setMessage] = React.useState(initialState.message);

  //helpers for the form
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { x, y, email, steps };
    axios
      .post("http://localhost:9000/api/result", payload)
      .then((res) => {
        const { message } = res.data;
        console.log(message);
        setX(initialState.x);
        setY(initialState.y);
        setSteps(initialState.steps);
        setEmail(initialState.email);
        setMessage(message);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      });
  };

  return (
    <div id="wrapper" className={props.className}>
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
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
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
