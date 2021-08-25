import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { StockValue, months } from './interfaces';

import TrackedStockPosition from './trackedStockPosition';

/*
let sampleStockValues: StockValue[] = [
    { symbol: 't', value: 55 },
    { symbol: 'mo', value: 20 }
];
*/


ReactDOM.render(
  <React.StrictMode>
        <Main />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
