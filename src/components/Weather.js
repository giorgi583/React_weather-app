import React, { useState } from "react";
import axios from "axios";


const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
const [showndetails, setShowndetails] = useState(false);
  async function getWeatherInfo() {
    setloading(true);
    setError("");
    try {
      const result = await axios.get(
        `https://goweather.herokuapp.com/weather/${city}`,
      );
      setWeather(result.data);
      console.log(result.data);
      if (result.status == "404") throw new Error("error");
    } catch (error) {
      setError("404 error... try again");
      setWeather({});
    } finally {
      setloading(false);
    }
  }

  return (
    <div>
    <h1>Weather App</h1>
      <div className="card">
        <div className="search">
          {loading == true ? <p className="loading"></p> : null}
          {error && <p className="error-msg">{error}</p>}
          <input 
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              getWeatherInfo();
            }
          }}
            type="search"
            id="search-inp"
            value={city}
            placeholder="Enter city name"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
         {city && <button onClick={()=> setCity('')} className="search-btn" id="location-btn"><i class="fa-solid fa-xmark"></i></button> }
          <button className="search-btn" id="search-btn" onClick={getWeatherInfo}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button >
        </div>
        {weather.temperature && <div className="content">
        <div className="info">
          <h1 className="temp">{weather.temperature}</h1>
          <h2 className="descr">{weather.description === 'Cloudy' ? <i class="fa-regular fa-cloud"></i> : weather.description === 'Rain' ? <i class="fa-solid fa-cloud-rain"></i> : weather.description.includes('snow') || weather.description.includes('Snow') ? <i class="fa-regular fa-snowflake"></i> : weather.description === 'Sunny' || weather.description === 'Clear' ? <i class="fa-regular fa-sun"></i> : weather.description === 'Partly cloudy' ? <i class="fa-solid fa-cloud-sun"></i> : weather.description == 'Light rain, mist' ? <i class="fa-solid fa-smog"></i> : weather.description.includes('rain') ? <i class="fa-solid fa-cloud-rain"></i> : weather.description}</h2>
          <p className="wind"><i class="fa-solid fa-wind"></i> {weather.wind}</p>
        </div>
        <div className="forecast">
         {showndetails ? <h3>Hide details <i onClick={() => setShowndetails(false)} className="fa-solid fa-angle-up"></i> </h3> : <h3>Show details <i onClick={() => setShowndetails(true)} className="fa-solid fa-angle-down"></i></h3>}
          {showndetails &&  <div> <h3>3 days forecast</h3><div className="days">
          <div className="day">
            <p>day {weather.forecast?.[0]?.day}</p>
            <p>{weather.forecast?.[0]?.temperature}</p>
            <p><i class="fa-solid fa-wind"></i>{weather.forecast?.[0]?.wind}</p>
            </div>
          <div className="day">
            <p>day {weather.forecast?.[1]?.day}</p>
            <p>{weather.forecast?.[1]?.temperature}</p>
            <p><i class="fa-solid fa-wind"></i>{weather.forecast?.[1]?.wind}</p>
          </div>
          <div className="day">
            <p>day {weather.forecast?.[2]?.day}</p>
            <p>{weather.forecast?.[2]?.temperature}</p>
            <p><i class="fa-solid fa-wind"></i>{weather.forecast?.[2]?.wind}</p>
            </div> </div> </div>}
        </div>
        </div> }
      </div>
    </div>
  );
};

export default Weather;
