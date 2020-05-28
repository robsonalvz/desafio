import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./router";
import "antd/dist/antd.css";
import "./styles/index.css";


function App() {
  return (
    <Provider store={store}>
        <Routes/>
    </Provider>
  );
}

export default App;
