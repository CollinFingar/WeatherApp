import React from "react";
import { BrowserRouter } from "react-router-dom";

import Form from "../form/Form";
import Chart from "../chart/Chart";
import About from "../about/About";

import { AppWrapper } from "./App.style";

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <h1>When To Spray Calculator</h1>
        <Form />
        <Chart />
        <About />
      </AppWrapper>
    </BrowserRouter>
  );
};
export default App;
