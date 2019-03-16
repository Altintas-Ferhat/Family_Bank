import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './Store/Reducers/Reducer';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';

import 'antd/dist/antd.css';
import './index.css';

const store = createStore(reducer, applyMiddleware(thunk));

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

