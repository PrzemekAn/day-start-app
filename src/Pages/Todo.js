import React from 'react';
import './ToDo.css';
import Task from '../Components/Task'

const Todo = (props) => {

    const tasks = props.tasks.map(item => <Task key = {item.id} id = {item.id} name = {item.name} active = {item.active} date = {item.date} completeTask = {props.completeTask} deleteTask = {props.deleteTask} executionDate = {item.executionDate}/>)

    return ( 
        <div className = 'todoComp'>
            <div className="add-task-container">
                <input id='addTask' type="text" placeholder = 'Add task' onChange = {props.taskNameInputChangeHandler} value = {props.newTaskName}/>
                <input type="date" id = 'taskDate' onChange = {props.taskDateInputChangeHandler} value = {props.newTaskDate}/>
                <button className = 'add-task-button' onClick = {props.addTaskButton}>Submit</button>
            </div>
            <div className="tasks">
                <div className="todo">
                    {tasks.filter(task => task.props.active)}
                </div>
                <div className="completed">
                    {tasks.filter(task=> !task.props.active)}
                </div>
            </div>
        </div>
    );
}
 
export default Todo;