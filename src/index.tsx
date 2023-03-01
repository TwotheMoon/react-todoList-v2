import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider as SCTheme } from 'styled-components';
import { ThemeProvider as MuiTheme, createTheme } from '@mui/material/styles';
import App from './App';
import { theme } from './theme';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    allVariants: {
      textTransform: "none"
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <MuiTheme theme={darkTheme}>
        <SCTheme theme={theme}>
          <App />
        </SCTheme>
      </MuiTheme>
    </RecoilRoot>
  </React.StrictMode>,

  document.getElementById('root')
);

