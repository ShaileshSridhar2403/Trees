import React from "react";
import ReactDOM from "react-dom";

import Notifications from "react-notify-toast";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

window.onload = () => {
  ReactDOM.render(
    <div>
      <Notifications />
      <App />
    </div>,
    document.getElementById("app")
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
