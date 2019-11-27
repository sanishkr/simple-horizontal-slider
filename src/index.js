import React from "react";
import ReactDOM from "react-dom";
import Slider from "./Slider";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Slider dir={"rtl"} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
