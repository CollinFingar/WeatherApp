import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";

import App from "./app/App";
import store from "./store/store";
import { COLORS } from "./constants";

const GlobalStyle = createGlobalStyle` 
  body {
    font-family: 'Sora', sans-serif;
    
    color: ${COLORS.text1};
    background-color: ${COLORS.background};

    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
