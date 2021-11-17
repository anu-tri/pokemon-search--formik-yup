import './App.css';
import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

  constructor(){
    super();
    this.state={
      test:"This is a test",
      pokemon:''
    }
  }
  
  // setUser = (user) =>{
  //   this.setState({user},()=>console.log("User is", this.state.user))
  // }

  setPokemon = (pokemon) =>{
      this.setState({pokemon});
    }

  render() {
    return (
      <div>
        <NavBar/>
        <Routes>
          <Route path = '/' element={<Home />}/>
        </Routes>
      </div>
    )
  }
}
