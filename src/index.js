import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './screens/login/Login'
import Header from "./common/Header";

ReactDOM.render(
    <React.StrictMode>
        <Login />
    </React.StrictMode>,
    document.getElementById('root')
);
