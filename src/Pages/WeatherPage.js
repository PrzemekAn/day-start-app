import React from 'react';



const WeatherPage = (props) => {

    const {background,temperature,humidity,date,city} = props;
    return ( 
        <main className = {'wrapper' + background}>
          <input type="text" placeholder = 'Search...' className = 'location-search' onChange = {props.change} onKeyUp = {props.click}/>
          <div className="location-info">{city}</div>
          <div className="date">{date}</div>
          <div className="weather-data temperature">
            {temperature}<sup>o</sup>C 
            <div className = 'weather-data-label temp'>Temperature</div>
          </div>
          <div className="weather-data humidity">
            {humidity}%
            <div className = 'weather-data-label hum'>Humidity</div>
          </div>
      </main>


     );
}
 
export default WeatherPage;