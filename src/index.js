import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
const rerenderEntireTree = (store) => {
  root.render(
    <React.StrictMode>
      <App state={store.getState()} addPost={store.addPost.bind(store)} setNewPostText={store.setNewPostText.bind(store)} /> 
    </React.StrictMode>
  );
}

rerenderEntireTree(store)

store.subscribe(rerenderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
