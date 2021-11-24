import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {AppContextProvider} from './AppContext.js';

import './bootstrap/css/bootstrap.min.css';
import './css/base.css';
import './css/linkbutton.css';

ReactDOM.render(
    <AppContextProvider>
        <App />
        <script src="bootstrap/js/bootstrap.bundle.min.js" />
    </AppContextProvider>
    ,
    document.getElementById('root')
);