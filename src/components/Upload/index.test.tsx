import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Upload } from "./";

const mockOnUpload = jest.fn();

const defaultProps = {
  onUpload: () => mockOnUpload(),
};

describe("upload form", () => {
  it("should render location field", () => {
    render(<Upload {...defaultProps} />);

    expect(screen.getByLabelText("Location")).toBeInTheDocument();
  });

  it("should render image upload fields", () => {
    render(<Upload {...defaultProps} />);

    expect(screen.getAllByLabelText(/Image/)).toHaveLength(5);
  });

  it("should call onUpload when clicking upload button", async () => {
    render(<Upload {...defaultProps} />);

    const file = new File(["hello"], "hello.png", { type: "image/png" });

    const input1 = screen.getByLabelText(/Image 1/);
    const input2 = screen.getByLabelText(/Image 2/);
    const input3 = screen.getByLabelText(/Image 3/);
    const input4 = screen.getByLabelText(/Image 4/);
    const input5 = screen.getByLabelText(/Image 5/);

    await userEvent.type(screen.getByLabelText("Location"), "Leeds");
    await userEvent.upload(input1, file);
    await userEvent.upload(input2, file);
    await userEvent.upload(input3, file);
    await userEvent.upload(input4, file);
    await userEvent.upload(input5, file);

    const uploadButton = screen.getByRole("button", { name: "Upload" });

    await userEvent.click(uploadButton);

    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalled();
    });
  });

  it("should disable upload button until all fields are filled", () => {
    render(<Upload {...defaultProps} />);

    const uploadButton = screen.getByRole("button", { name: "Upload" });
    expect(uploadButton).toHaveAttribute("disabled");
  });

  it("should not call onUpload when clicked with empty fields", async () => {
    render(<Upload {...defaultProps} />);

    const uploadButton = screen.getByRole("button", { name: "Upload" });
    userEvent.click(uploadButton);

    await waitFor(() => {
      expect(mockOnUpload).not.toHaveBeenCalled();
    });
  });
});
