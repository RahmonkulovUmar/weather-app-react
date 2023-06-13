import React, { useState } from 'react';
import Forecast from './components/forecast'
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState({});

   const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=1ed026911aee26c31a2dbe785f5cbc3c`
   const fcUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=1ed026911aee26c31a2dbe785f5cbc3c`
   
   const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const responsePromises = [
          axios.get(url),
          axios.get(fcUrl)
        ];
        const [responseData, forecastResponse] = await Promise.all(responsePromises);
        setData(responseData.data);
        setForecast(forecastResponse.data );
      }
      catch {
        handleAxiosError();
      }
      setLocation('');
    }
  }

  let isAlertShown = false;
  function handleAxiosError() {
    if (!isAlertShown) {
      alert("You entered invalid input, please try again !");
      isAlertShown = true;
    }
  }

  return (
    <div className="App">
      <div className='search'>
      <input 
      value={location}
      onChange={event => {setLocation(event.target.value)}}
      onKeyDown={searchLocation}
      placeholder='Enter Location'
      type='text'
      />
      </div>
      {!data.name && 
      <h1>Please choose location.</h1>}
      <div className='large_container'>
      {data.name && <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>Location:  <span className='bold'>{data.name}</span></p>
          </div>
          <div className='temp'>
          <h1>{data.main.temp.toFixed()} °C <img alt="weather" className='weather-icon' src="icons/03d.png"/></h1>
          </div>
          <div className='description'>
          <p>Description:  <span className='bold'>{data.weather[0].description}</span></p>
          </div>
        </div>


        <div className='bottom'>
          <div className='feels'>
          <p>Feels Like: </p>
            {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
          </div>
          <div className='humidity'>
          <p>Humidity: </p>
          {data.main ? <p>{data.main.humidity} %</p> : null}
          </div>
          <div className='wind'>
          <p>Wind: </p>
          {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
          </div>
        </div>

        

      </div>}

      <div>
          <Forecast data={forecast}/>
        </div>
      </div>
    </div>
  );
}

export default App;
