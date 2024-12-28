import styled from "styled-components";
import { SPACING } from "../constants";

export const AppWrapper = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  min-height: calc(100vh - ${SPACING.lg});
  padding: ${SPACING.md};
`;
