import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import ImageLinkedForm from './components/ImageLinkedForm/ImageLinkedForm.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';

const particleOptions={
  particles:{
    number:{
      value:100,
      density:{
        enable:true,
        value_area:500
      }
    }
  }
}

function App() {
  return (
    <div className="App">
      <Particles className="particles" params={particleOptions}/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkedForm/>
      
      {/*
      <FaceRecognition/> */}
    </div>
  );
}

export default App;
