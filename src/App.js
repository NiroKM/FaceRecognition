import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import ImageLinkedForm from './components/ImageLinkedForm/ImageLinkedForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
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


const app = new Clarifai.App({
  apiKey: '5d7adf2b2682472c8feb0dfa9b1b41ee'
 }); 
 

class App extends Component {

  constructor(){
    super();

    this.state={
      input:'',
      imageUrl:''
    }

  }

  onInputChange = (event)=>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit= ()=>{

    this.setState({imageUrl:this.state.input});

    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b",
       this.state.input)
    .then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) { 
      // there was an error
    }
  );

  }

  render(){
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions}/>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkedForm  
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/> 
      </div>
    );
  }
}

export default App;
