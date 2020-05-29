import React from 'react';
import './App.less';
import Header from './component/header';

import { Router } from './router/router';
//引入http请求
import './http';


declare global
{
  interface Window
  {
    $http: any,
    account: string,
    base_url: string,
    arg:string,
    company_id:string
  }
}
function App()
{

  return (
    <div className="App">
      <Header name='SDK 登陆 开发'></Header>
      <div className="main-wrapper">
        <Router></Router>
      </div>
    </div>
  );
}

export default App;
