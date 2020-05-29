import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { ConfigProvider, message, Button } from 'antd'

message.config({
  maxCount: 1,
})
ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider componentSize='large' locale={zh_CN}>
      <App />
    </ConfigProvider >
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
