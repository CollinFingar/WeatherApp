import styled, { keyframes, css } from "styled-components";
import { BREAKPOINTS, COLORS, SPACING } from "../constants";

export const HumidityWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: ${SPACING.sm};
  width: 150px;

  h3 {
    margin-top: 0px;
    color: ${COLORS.humidity};
  }
`;

export const TempWrapper = styled(HumidityWrapper)`
  margin-right: ${SPACING.sm};

  h3 {
    color: ${COLORS.temp};
  }
`;

export const ChartWrapper = styled.div`
  form {
    display: flex;
    input {
      width: 100%;
    }
  }

  input,
  select {
    display: block;
    background-color: ${COLORS.form};
    color: ${COLORS.text1};
    padding: ${SPACING.xs};
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    margin-top: 4px;
  }

  input {
    cursor: text;
  }
`;

export const InputWrapper = styled.div`
  > div:first-child {
    margin-bottom: ${SPACING.xs};
  }
`;

export const IdealClusterWrapper = styled.div`
  width: 325px;
`;

interface IdealHourWrapperProps {
  even: Boolean;
  highlight: Boolean;
}

const fadeInAnimation = keyframes`
0% {
    color: ${COLORS.highlight};
}
100% {
    color: ${COLORS.text1};
}
`;

export const IdealHourWrapper = styled.div<IdealHourWrapperProps>`
  display: flex;
  width: 100%;
  padding: ${SPACING.sm} ${SPACING.xs};

  ${({ even, highlight }) => {
    const alternatingColor = even
      ? "background-color: rgba(0, 0, 0, 0.1);"
      : "";
    if (highlight) {
      return css`
            color: ${COLORS.text1};
            animation-name: ${fadeInAnimation};
            animation-iteration-count: 1;
            animation-timing-function: ease-in;
            animation-duration: 1s;
            ${alternatingColor}
            }`;
    }
    return alternatingColor;
  }}
`;

export const IdealDateWrapper = styled.div`
  font-size: ${SPACING.sm};
  font-weight: bold;
  width: 17%;
`;

export const IdealTimesWrapper = styled.div`
  width: 43%;
`;

export const IdealTempWrapper = styled.div`
  width: 40%;
  display: flex;

  > div {
    flex-grow: 1;
    flex-basis: 0;
  }
`;

export const DataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${SPACING.sm};

  @media only screen and (max-width: ${BREAKPOINTS.lg}) {
    display: block;
  }
`;
