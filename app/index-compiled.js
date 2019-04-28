'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Page = require('./components/Page');

var _Page2 = _interopRequireDefault(_Page);

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = (0, _socket2.default)('http://localhost:9090/');
socket.on('message', function (msg) {
  return console.log(msg);
});

_reactDom2.default.render(_react2.default.createElement(_Page2.default, { msg: 'Huhu' }), document.getElementById('app'));

//# sourceMappingURL=index-compiled.js.map