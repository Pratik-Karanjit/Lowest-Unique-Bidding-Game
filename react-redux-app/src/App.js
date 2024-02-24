import React from "react";
import "./App.css";
import Game from "./Game";
import Navbar from "./Navbar";
import Content from "./Content";

function App() {
  return (
    <div className="bg-off-white h-screen">
      <Navbar></Navbar>
      <Content></Content>
      {/* <Game></Game> */}
    </div>
  );
}

export default App;
