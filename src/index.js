import React from "react";
import ReactDOM from "react-dom";
import Slider from "./Slider";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Slider dir={"rtl"} h={300} w={300} margin={5} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
