import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './client/App';

ReactDOM.render(
  <React.StrictMode>
    <App
      api="https://raw.githubusercontent.com/manjula91/wealth-management/master/src/server/data.json?token=AB33QIPRGITSSLJARZTLW6S62UV4I"
      headerTxt="Wealth Management Platform"
    />
  </React.StrictMode>,
  document.getElementById('root')
);
