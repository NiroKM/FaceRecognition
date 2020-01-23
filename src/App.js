import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import ImageLinkedForm from './components/ImageLinkedForm/ImageLinkedForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
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

 
const initialState={
    input:'',
    imageUrl:'',
    box:[],
    route:'signin',
    isSignedIn: false,
    user:{
      id:'',
      name:'',
      email:'',
      entries:0,
      joined:''
    }
}

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }


  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }


  onInputChange = (event)=>{
    this.setState({input:event.target.value});
  }

  calculateFaceLocation = (data) =>{
      const array=data.outputs[0].data.regions;
      for(let i=0;i<array.length;i++){
        const clarifaiFace=data.outputs[0].data.regions[i].region_info.bounding_box
        const image=document.getElementById('inputImage');
        let width=image.width;
        let height=image.height;

        const obj={ leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
        }
        
        this.state.box.push(obj);
      }   
  }

  onButtonSubmit= ()=>{
    this.setState({imageUrl:this.state.input});
    fetch('https://safe-everglades-74165.herokuapp.com/imageurl',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
            input:this.state.input
            })
    })
    .then(response=>response.json())
    .then(response=> {
      if(response==="Unable to response to API"){
        console.log("No content");
      }else{
        fetch('https://safe-everglades-74165.herokuapp.com/image',{
                method:'put',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                  id:this.state.user.id
            })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
      }
      this.setState({box:[]})
      this.calculateFaceLocation(response)
      console.log(this.state.box);
    })
    .catch(err=>console.log(err));
  }

  onRouteChange=(route)=>{
    if(route==='signin'){
      this.setState(initialState)
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render(){
    const {isSignedIn, imageUrl, box, route} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route==='home' 
          ?<div>
            <Logo/>
            <Rank length={this.state.box.length} name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkedForm  
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl}/> 
            </div>
          :(route==='signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            ) 
        }
      </div>
    );
  }
}

export default App;
