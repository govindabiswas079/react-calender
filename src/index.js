import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './themes';

import "@fontsource/poppins";
import "@fontsource/poppins/100-italic.css";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200-italic.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300-italic.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500-italic.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600-italic.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700-italic.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800-italic.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900-italic.css";
import "@fontsource/poppins/900.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
