import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/redux-store";
import StoreContext from "./StoreContext";
import Provider from "./StoreContext";

// Без Provider
const root = ReactDOM.createRoot(document.getElementById('root'));
const rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <StoreContext.Provider value={store}>
        <App state={state} />
      </StoreContext.Provider>
    </React.StrictMode>
  );
}

// С Provider
// const root = ReactDOM.createRoot(document.getElementById("root"));
// const rerenderEntireTree = (state) => {
//     root.render(
//         <React.StrictMode>
//             <Provider store={store}>
//                 <App state={state} />
//             </Provider>
//         </React.StrictMode>
//     );
// };

rerenderEntireTree(store.getState());

store.subscribe(() => {
    const state = store.getState();
    rerenderEntireTree(state);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
