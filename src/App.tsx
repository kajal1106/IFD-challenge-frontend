import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the Client Ticket Task!</p>
        <p>
          <b>Good Luck!</b>
        </p>
        <span className="App-span">
          Make sure you read and understand the requirements in the README file
        </span>
      </header>
    </div>
  );
}

export default App;
