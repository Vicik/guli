import React from 'react';
import ReactDOM from 'react-dom';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
import App from './App.jsx';
// storageUtils.saveUser({
//   _id: 123,
//   username: 'admin'
// })
memoryUtils.user = storageUtils.getUser();

ReactDOM.render(
  <App />,
  document.getElementById('root')
)