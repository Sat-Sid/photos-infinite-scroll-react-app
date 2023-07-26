import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { createRoot } from 'react-dom/client';


//Old way to render 
//ReactDOM.render(<App />, document.getElementById("root"));


//New way to render
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<StrictMode><App /></StrictMode>);

