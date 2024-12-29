import styled from "styled-components";
import { SPACING, COLORS } from "../constants";

export const FormWrapper = styled.div`
  input,
  select {
    display: block;
    margin: ${SPACING.xs} ${SPACING.md} ${SPACING.sm} 0px;
    background-color: ${COLORS.form};
    border: 2px solid ${COLORS.form};
    color: ${COLORS.text1};
    padding: ${SPACING.xs};
    width: 100px;
    box-sizing: content-box;
    cursor: pointer;
  }

  input {
    cursor: text;
  }

  button {
    margin-top: 22px;
    padding: ${SPACING.sm};
    border: none;
    background-color: ${COLORS.form};
    color: ${COLORS.text1};
    cursor: pointer;
    transition-duration: 0.25s;

    &:hover {
      background-color: ${COLORS.highlight};
    }
  }

  form {
    display: flex;
  }
`;

export const ErrorText = styled.div`
  color: red;
  margin-bottom: ${SPACING.sm};
`;
