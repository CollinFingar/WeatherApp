import React from "react";

import { AboutWrapper } from "./About.style";

const App = () => {
  return (
    <AboutWrapper>
      <h3>About this page:</h3>
      <p>
        This was created as a project by Collin Fingar using React, TypeScript,
        D3.js, and styled-components.
      </p>
      <p>
        The original intention of this page is to provide a list of compatible
        times for miniature painters to prime their models with spray paint.
      </p>
      <h4>Upcoming Enhancements:</h4>
      <ul>
        <li>Accessibility upgrades</li>
        <li>UK + Metric support</li>
        <li>Styling improvements</li>
        <li>Query parameter support</li>
        <li>Wind + precipitation notices</li>
      </ul>
    </AboutWrapper>
  );
};
export default App;
