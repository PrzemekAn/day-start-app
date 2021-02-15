import React, {Component} from 'react';
import './App.css';
import WeatherComponent from './WeatherComponent';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Navigation from './Navigation';
import Todo from './Todo'
import Home from './Home'

const api = {
  key:'3df22446f8b0ba135cf066f0ba035bf2',
  base:'https://api.openweathermap.org/data/2.5/'
}
class App extends Component {
    state = {
      temperature: '',
      city: 'Poznań',
      background: '',
      date: '',
      humidity: '',
      wasClicked: false,
    }
  

  getDate() {
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const currentDate = new Date();
    const day = currentDate.getDay();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    this.setState({
      date:`${days[day-1]}, ${date}-${months[month]}-${year}`,
    })

  }
    
  getWeather(){
    this.getDate();
    fetch(`${api.base}weather?q=${this.state.city}&appid=${api.key}`)
    .then(res => {
      // console.log(res)
      return (res.json())})

    .then(result => {
      // console.log(result)
      if(result.cod !== 200){
        return(alert('There\'s no such city'))
      }
      if(Math.round(result.main.temp-273.15)>10){
        this.setState({
           background: ' warm'
        })
      }else{
        this.setState({
          background: ' cold'
        })
      }
      this.setState({
        temperature: Math.round(result.main.temp - 273.15),
        humidity: result.main.humidity
      })
    })
  }


  componentDidMount(){
    this.getWeather();
  }

  changeHandler(e) {
    this.setState({
      city: e.target.value,
    })
  }

  searchSubmit = (e) => {

    if(e.keyCode === 13){
      this.getWeather();
    }

  }


  menuActive = () => {
    this.setState({
      wasClicked: !this.state.wasClicked,
    })
  }

  render(){
  return (
    <Router>
    <div className="App">
      <Navigation clickEv = {this.menuActive} isClicked = {this.state.wasClicked}/>



      {/* todo - home page with basic informations about app and tips how to use */}

      <Route path = '/' exact>
      <Home/>
      </Route>

      <Route path = '/weather'>
      <WeatherComponent {...this.state} click = {this.searchSubmit} change = {this.changeHandler.bind(this)} />
      </Route>

      <Route path = '/todo'>
        <Todo/>
      </Route>
    </div>
    </Router>
  );
  }
}

export default App;
