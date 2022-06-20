import { render, screen } from "@testing-library/react";

import { Image } from "./";
import mockdata from "../../mockData.json";

describe("Image component", () => {
  it("should render the image", () => {
    render(<Image images={mockdata.images} activeIndex={0} />);

    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
  });

  it("should render the correct image depending on the guess index", () => {
    render(<Image images={mockdata.images} activeIndex={2} />);

    expect(screen.getByAltText("Image 3")).toBeInTheDocument();
  });

  it("should render the final image when out of guesses or index is greater than 4", () => {
    render(<Image images={mockdata.images} activeIndex={5} />);

    expect(screen.getByAltText("Image 5")).toBeInTheDocument();
  });

  it("should render the correct guess image when guessed correctly", () => {
    render(
      <Image images={mockdata.images} activeIndex={3} correctGuessIndex={2} />
    );

    expect(screen.getByAltText("Image 3")).toBeInTheDocument();
  });
});
