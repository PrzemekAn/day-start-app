import React from 'react';

const Task = (props) => {

    return ( 
        
        <div className="task">
            <p className="task-name">{props.name}</p>
            <p className="task-date"> {props.active? 'To do: ' + props.date: 'Completed: ' + props.executionDate}</p>
            {props.active?<button className="btn completeTaskBtn" onClick = {() => props.completeTask(props.id)}><i className="fas fa-check"></i></button>:null}
            <button className="btn deleteTaskBtn" onClick = {() => props.deleteTask(props.id)}><i className="fas fa-trash-alt"></i></button>
        </div>
     );
}
 
export default Task;