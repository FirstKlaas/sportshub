import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page';
import io from 'socket.io-client';

const socket = io('http://localhost:9090/');
socket.on('message', msg => console.log(msg));

ReactDOM.render(
  <Page msg="Huhu"/>,
  document.getElementById('app')
);
