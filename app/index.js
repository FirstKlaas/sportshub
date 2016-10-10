import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Mode: {process.env.NODE_ENV}</h1>,
  document.getElementById('app')
);
