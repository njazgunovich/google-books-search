import React, { Component } from "react";
import Search from "./pages/Search"
import "./App.css";
import {BrowserRouter as Router,Route} from "react-router-dom"
import Header from "./components /Header"
class App extends Component {
  render() {
    return (
      <div className="App">
       <Header/>
    <Router>
      <Route exact path =  "/" component = {Search}></Route>
    </Router>
      </div>
    );
  }
}

export default App;
