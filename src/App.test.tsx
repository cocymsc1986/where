import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const Form = screen.getByTestId(/guess-form/i);
  expect(Form).toBeInTheDocument();
});
