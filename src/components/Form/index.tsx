import React, { FormEvent, KeyboardEvent, useState } from "react";

import { StyledField, StyledInput, StyledLabel } from "./styles";

export type FormProps = {
  activeIndex: number;
  correctGuessIndex?: number;
  onSubmit: (value: string) => void;
};

const Form: React.FC<FormProps> = ({
  activeIndex,
  correctGuessIndex,
  onSubmit,
}) => {
  const [value, setValue] = useState<string>("");
  const [guesses, setGuesses] = useState<Record<number, string>>({});

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "13") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!value) {
      return;
    }

    setGuesses((prevGuesses) => ({
      ...prevGuesses,
      [activeIndex]: value,
    }));

    setValue("");

    onSubmit(value);
  };

  const isFormDisabled = () => !!correctGuessIndex || activeIndex > 4;

  const renderInputs = () => {
    return Array.from(Array(5)).map((_, index) => (
      <StyledField key={index}>
        <StyledLabel
          htmlFor={`guess-${index + 1}`}
          isActive={index === activeIndex}
          isCorrect={index === correctGuessIndex}
          isIncorrect={index < activeIndex}
        >
          {index + 1}.
        </StyledLabel>
        <StyledInput
          id={`guess-${index + 1}`}
          type="text"
          data-testid={`guess-input-${index}`}
          isActive={index === activeIndex}
          isCorrect={index === correctGuessIndex}
          isIncorrect={index < activeIndex}
          disabled={index !== activeIndex || index === correctGuessIndex}
          value={
            index === activeIndex && !correctGuessIndex ? value : guesses[index]
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
        {index < activeIndex && (
          <span data-testid={"incorrect-indicator"}>x</span>
        )}
        {index === correctGuessIndex && (
          <span data-testid={"correct-indicator"}>yes!</span>
        )}
      </StyledField>
    ));
  };

  return (
    <form onSubmit={handleSubmit} data-testid={"guess-form"}>
      {renderInputs()}
      <button type="submit" disabled={isFormDisabled()}>
        Guess!
      </button>
    </form>
  );
};

export { Form };
