import styled from "styled-components";

const getColour = (
  isActive: boolean,
  isIncorrect: boolean,
  isCorrect: boolean
): string => {
  switch (true) {
    case isCorrect:
      return "green";
    case isIncorrect:
      return "red";
    case isActive:
      return "blue";
    default:
      return "black";
  }
};

export const StyledField = styled.div`
  display: flex;
`;

export const StyledLabel = styled.label<{
  isActive: boolean;
  isIncorrect: boolean;
  isCorrect: boolean;
}>`
  color: ${(props) =>
    getColour(props.isActive, props.isIncorrect, props.isCorrect)};
`;

export const StyledInput = styled.input<{
  isActive: boolean;
  isIncorrect: boolean;
  isCorrect: boolean;
}>`
  border: ${(props) =>
    getColour(props.isActive, props.isIncorrect, props.isCorrect)};
`;
