import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, FormProps } from ".";

const mockOnSubmitForm = jest.fn();

const defaultProps: FormProps = {
  activeIndex: 0,
  correctGuessIndex: undefined,
  onSubmit: mockOnSubmitForm,
};

const renderComponent = (overrides: Partial<FormProps> = {}) =>
  render(<Form {...defaultProps} {...overrides} />);

describe("form", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be able to type a guess", async () => {
    renderComponent();

    const input = screen.getByLabelText<HTMLInputElement>("1.");
    await userEvent.type(input, "guess");

    expect(input.value).toBe("guess");
  });

  it("should highlight the active guess index", () => {
    renderComponent();

    const input1 = screen.getByLabelText<HTMLInputElement>("1.");

    expect(input1).toHaveStyle("border: blue");
  });

  it("should indicate incorrect guess", () => {
    renderComponent({ activeIndex: 1 });

    const input1 = screen.getByLabelText<HTMLInputElement>("1.");
    userEvent.type(input1, "incorrect guess");

    expect(input1).toHaveStyle("border: red");
    expect(screen.getAllByTestId("incorrect-indicator")).toHaveLength(1);
  });

  it("should indicate correct guess", async () => {
    renderComponent({ correctGuessIndex: 0 });

    const input1 = screen.getByLabelText<HTMLInputElement>("1.");

    expect(input1).toHaveStyle("border: green");
    expect(screen.getAllByTestId("correct-indicator")).toHaveLength(1);
  });

  it("should not call submit when submitting with no value in the input", async () => {
    renderComponent();

    const submit = screen.getByRole("button", { name: /Guess!/ });
    userEvent.click(submit);

    await waitFor(() => {
      expect(mockOnSubmitForm).not.toHaveBeenCalled();
    });
  });

  it("should call submit when clicking submit button with a value in the input", async () => {
    renderComponent();

    const input1 = screen.getByLabelText<HTMLInputElement>("1.");
    userEvent.type(input1, "correct guess");
    const submit = screen.getByRole("button", { name: /Guess!/ });
    userEvent.click(submit);

    await waitFor(() => {
      expect(mockOnSubmitForm).toHaveBeenCalled();
    });
  });

  it("should call submit when pressing enter with a value in the input", async () => {
    renderComponent();

    const input1 = screen.getByLabelText<HTMLInputElement>("1.");
    userEvent.type(input1, "correct guess{enter}");

    await waitFor(() => {
      expect(mockOnSubmitForm).toHaveBeenCalled();
    });
  });

  it("should disable submit button if correct answer given", async () => {
    renderComponent({ correctGuessIndex: 1 });

    const submit = screen.getByRole("button", { name: /Guess!/ });

    expect(submit).toBeDisabled();
  });

  it("should disable submit button if out of guesses", async () => {
    renderComponent({ activeIndex: 5 });

    const submit = screen.getByRole("button", { name: /Guess!/ });

    expect(submit).toBeDisabled();
  });

  it("should not call submit when pressing enter when already guessed correctly", async () => {
    renderComponent({ correctGuessIndex: 1 });

    const input1 = screen.getByLabelText<HTMLInputElement>("1.");
    userEvent.type(input1, "correct guess{enter}");

    await waitFor(() => {
      expect(mockOnSubmitForm).not.toHaveBeenCalled();
    });
  });

  it("should not call submit when pressing enter when out of guesses", async () => {
    renderComponent({ activeIndex: 5 });

    const input1 = screen.getByLabelText<HTMLInputElement>("1.");
    userEvent.type(input1, "correct guess{enter}");

    await waitFor(() => {
      expect(mockOnSubmitForm).not.toHaveBeenCalled();
    });
  });
});
