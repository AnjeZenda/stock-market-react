import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ModalState} from "./components/ModalContext";
import {Provider} from "react-redux";
import {createStore} from '@reduxjs/toolkit'

const defaultState = {tradingList: []}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SAVE':
            return {...state, tradingList: action.tradingList}
        default:
            return state
    }
}

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ModalState>
                    <App/>
                </ModalState>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
