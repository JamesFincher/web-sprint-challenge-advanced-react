import server from "../../backend/mock-server";
import React from "react";
import AppFunctional from "./AppFunctional";
import AppClass from "./AppClass";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.setTimeout(1000); // default 5000 too long for Codegrade
const waitForOptions = { timeout: 100 };
const queryOptions = { exact: false };

let up, down, left, right, reset, submit;
let squares, coordinates, steps, message, email;

const updateStatelessSelectors = (document) => {
  up = document.querySelector("#up");
  down = document.querySelector("#down");
  left = document.querySelector("#left");
  right = document.querySelector("#right");
  reset = document.querySelector("#reset");
  submit = document.querySelector("#submit");
};

test("AppFunctional is a functional component", () => {
  expect(
    AppFunctional.prototype && AppFunctional.prototype.isReactComponent
  ).not.toBeTruthy();
});

test("sainity check for AppFunctional component", async () => {
  true === true;
});
test("AppFunctional renders without crashing", () => {
  render(<AppFunctional />);
});
test("email placeholder is 'type email'", () => {
  render(<AppFunctional />);
  const email = screen.getByPlaceholderText("type email");
  expect(email).toBeInTheDocument();
});
test("email input is empty on page load", () => {
  render(<AppFunctional />);
  const email = screen.getByPlaceholderText("type email");
  expect(email.value).toBe("");
});

test("all elements are present on page load", () => {
  render(<AppFunctional />);
  updateStatelessSelectors(document);
  expect(up).toBeInTheDocument();
  expect(down).toBeInTheDocument();
  expect(left).toBeInTheDocument();
  expect(right).toBeInTheDocument();
  expect(reset).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

test("email form wont submit if email is empty", () => {
  render(<AppFunctional />);
  fireEvent.click(submit);
});
