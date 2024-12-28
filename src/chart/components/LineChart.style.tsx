import styled from "styled-components";
import { COLORS } from "../../constants";

export const LineChartWrapper = styled.div`
  .idealBar {
    fill: ${COLORS.highlight};
    opacity: 0.3;

    cursor: pointer;
    transition-duration: 0.15s;

    &:hover {
      opacity: 0.5;
    }
  }

  .x-axis {
    font-size: 12px;
    text {
      fill: ${COLORS.chart.label};
      &.date-text {
        fill: ${COLORS.text1};
      }
    }
  }

  .y-temp-axis,
  .y-humidity-axis {
    text {
      fill: ${COLORS.chart.label};
    }
  }
`;
