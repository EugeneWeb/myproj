import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


// root надо вынести, так как он должен быть создан один раз
const root = ReactDOM.createRoot(document.getElementById('root'));
const rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App state={state} /> 
    </React.StrictMode>
  );
}

export default rerenderEntireTree