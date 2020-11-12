import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import reducer from './reducers.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(reducer);


ReactDOM.render (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    
    , document.getElementById('root')
);