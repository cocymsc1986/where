import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { App } from "./App";

describe("app routes", () => {
  it("should render home page", () => {
    const history = createMemoryHistory();
    history.push("/");
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    expect(screen.getByText(/where/i)).toBeInTheDocument();
  });

  it("should render upload page", () => {
    const history = createMemoryHistory();
    history.push("/upload");
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    expect(screen.getByText(/upload images/i)).toBeInTheDocument();
  });
});
