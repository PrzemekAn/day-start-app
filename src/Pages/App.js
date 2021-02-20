import React, {Component} from 'react';
import './App.css';
import WeatherPage from './WeatherPage';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Navigation from './Navigation';
import Todo from './Todo';
import Home from './Home';
import NewsPage from './NewsPage';


const api = {
  // dane dla weaher api
  key:'3df22446f8b0ba135cf066f0ba035bf2',
  base:'https://api.openweathermap.org/data/2.5/'
}
// const newsApi = {
//   topics: ['tech','science','finance','business','politics','economics','ecology','engineering']

// }

class App extends Component {
    state = {
      temperature: '',
      city: 'Poznań',
      background: '',
      date: '',
      humidity: '',
      wasClicked: false,
      tasks: [
          {name:'Zrobić pranie', date: '2021-03-01',active:true,priority:'low', id: 1, executionDate:null},
          {name:'Pozmywać', date:'2021-03-05',active:false,priority:'high', id:2, executionDate:'2020-06-17'},
          {name:'Zadanie3', date:'2021-03-15',active:false,priority:'high', id:3, executionDate:'2020-09-01'},
          {name:'Zadanie4', date:'2021-03-25',active:true,priority:'high', id:4, executionDate:null},
      ],
      newTaskName:'',
      newTaskDate:'',
      newsSearchInputValue: '',
    }
  
// weather page
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
    // pobieranie pogody
    this.getDate();
    fetch(`${api.base}weather?q=${this.state.city}&appid=${api.key}`)
    .then(res => res.json())
    .then(result => {
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
    // this.getNews();
  }

  changeHandler(e) {
    this.setState({
      city: e.target.value,
    })
  }

  searchSubmit = (e) => {
    // wyszukiwanie miasta wartością z inputa
    if(e.keyCode === 13){
      this.getWeather();
    }
  }
  
  // nawigacja
  menuActive = () => {
    // rozwijanie/zwijanie menu bocznego
    this.setState({
      wasClicked: !this.state.wasClicked,
    })
  }

  // todo page

  getTaskExecutionDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
      return(`${year} - ${month<10? '0'+month: month} - ${day<10? '0'+day:day}`)
  
  } 
  completeTaskHandler = (id) => {
    //oznaczanie taska jako wykonane
    const executionDate = this.getTaskExecutionDate();
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    
    tasks[index].active = false;
    tasks[index].executionDate = executionDate;
    
    this.setState({
      tasks: tasks,
    })
    
  }
  deleteTaskHandler = (id) => {
    // usuwanie taska
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index,1)
    this.setState({
      tasks: tasks,
    })
  }

  taskNameInputChangeHandler = (e) => {
    // ustawianie nazwy taska 
    this.setState({
      newTaskName: e.target.value,
    })
  }
  taskDateInputChangeHandler = (e) => {
    // ustawianie daty taska
    this.setState({
      newTaskDate: e.target.value,
    })
  }

  addTaskButton = () => {
    const tasks = [...this.state.tasks];
    const newTask = {
      name: this.state.newTaskName,
      date: this.state.newTaskDate,
      active: true,
    }
    tasks.push(newTask);
    if(this.state.newTaskName !== '' && this.state.newTaskDate !== ''){
    this.setState({
      tasks: tasks,
      newTaskName: '',
      newTaskDate: '',
    })}
    
  } 

  // news paage

  getNews = () => {
    fetch(`https://newscatcher.p.rapidapi.com/v1/search_free?q=${this.state.newsSearchInputValue}&lang=en&media=True`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "67deda34e6msh310e15eab43f0c1p15427ejsnda9181585dee",
        "x-rapidapi-host": "newscatcher.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(res => console.log(res))
    
  }

  render(){
  return (
    <Router>
    <div className="App">
      <Navigation clickEv = {this.menuActive} isClicked = {this.state.wasClicked}/>

      <Route path = '/' exact>
      <Home/>
      </Route>

      <Route path = '/weather'>
      <WeatherPage {...this.state} click = {this.searchSubmit} change = {this.changeHandler.bind(this)} />
      </Route>

      <Route path = '/todo'>
        <Todo tasks = {this.state.tasks} deleteTask = {this.deleteTaskHandler} completeTask = {this.completeTaskHandler} taskNameInputChangeHandler = {this.taskNameInputChangeHandler} taskDateInputChangeHandler = {this.taskDateInputChangeHandler} addTaskButton = {this.addTaskButton} newTaskName = {this.state.newTaskName} newTaskDate = {this.state.newTaskDate}/>
      </Route>

      <Route path = '/news'>
        <NewsPage newsSearchTopic = {this.state.newsSearchInputValue}/>
      </Route>
    </div>
    </Router>
  );
  }
}

export default App;
