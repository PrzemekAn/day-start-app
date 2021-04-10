import React from 'react';


const ConnectionDetails = (props) => {
    return ( 
        <div className = 'connection-details'>
            <p className = 'from'>cokolwiek</p>
            <p className="to">cokolwiek2</p>
            <p className="transport-date">cokolwiek3</p>
            <button className="getTransport" onClick = {props.getTransport} >Pobierz</button>
        </div>
     );
}
 
export default ConnectionDetails;